"use strict";
// import checkNumInputs from "./checkNumInputs";
const forms = () => {
   //получаем все формы и их поля ввода 
   const form = document.querySelectorAll("form"),
         inputs = document.querySelectorAll("input"),
         designModal = document.querySelector('.popup-design'),
         consultModal = document.querySelector('.popup-consultation'),
         upload = document.querySelectorAll('[name="upload"]');
         

    // checkNumInputs("input[name='user_phone']");

    //задаем объект для реакции сервера на наши ПОСТ запросы в модальном окне
    const message = {
        loading: "Загрузка...",
        success: "Спасибо! Скоро мы с Вами свяжемся",
        failure: "Что то пошло не так",
        spinner: "assets/img/spinner.gif",
        ok: "assets/img/ok.png",
        fail: "assets/img/fail.png"
    };
    //создаем объект путей передачи данных
    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };
    //реализуем функцию отправки данных на сервер
    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };
    //реализуем функцию удаления статусного сообщения
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = "";
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = "Файл не выбран";
        });
    };
    //создаем передачу имени загруженного файла на странице
    upload.forEach(item => {
        item.addEventListener('input', () => {
            let dots;
            const arr = item.files[0].name.split('.');

            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        });
    });

    //реализуем функцию взаимодействия с формами
    form.forEach(item => {
        item.addEventListener("submit", (e) => {
            e.preventDefault();
            //создаем сообщение о статусе отправки данных
            let statusMessage = document.createElement('div');
            statusMessage.classList.add("status");
            //заменяем контент формы
            item.parentNode.appendChild(statusMessage);
            //скрываем саму форму
            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = "none";
            }, 200);
            //создаем новый контент вместо данных формы
            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            //создаем переменную для отправки данных с формы
            const formData = new FormData(item);
            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);

            //передаем данные на сервер
            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        textMessage.remove();
                        statusImg.remove();
                        item.style.display = "block";
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                        api === path.designer ? designModal.style.display = "none" : consultModal.style.display = "none";
                        document.body.style.overflow = "";

                    }, 2000);
                });
        });
    });
};

export default forms;