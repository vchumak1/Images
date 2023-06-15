"use strict";

const burger = () => {
    const btn = document.querySelector('.burger'),
          menu = document.querySelector('.burger-menu');

    btn.addEventListener('click', () => menu.classList.toggle('active'));
}

export default burger;