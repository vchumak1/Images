"use strict";
//простая реализация показа элементов на странице
const showMoreStyles = (trigger, styles) => {
    const cards = document.querySelectorAll(styles),
          btn = document.querySelector(trigger);
    
    cards.forEach(item => item.classList.add('animated', 'fadeInUp'));

    btn.addEventListener('click', (e) => {
        cards.forEach(item => {
            item.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs', 'styles-2');
            item.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
    });
        e.target.classList.add('animated', 'fadeOut');
    })
};

export default showMoreStyles;