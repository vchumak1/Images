"use strict";

//реализуем функцию отправки данных на сервер
const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        body: data
    });

    return await res.text();
};

//реализуем функцию получения данных с сервера
const getResource = async (url) => {
    let res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export {postData, getResource};