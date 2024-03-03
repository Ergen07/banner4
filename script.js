
let activeInteraction = false; // Флаг, указывающий на активное пользовательское взаимодействие

const slide = (condition) => {
    if (!activeInteraction) { // Проверка флага активного взаимодействия
        clearInterval(start);
        condition === "increase" ? initiateINC() : initiateDEC();
        move(value, trailValue);
        animate();
        start = setInterval(() => slide("increase"), interval);
    }
};

// Добавляем проверку в функцию clickCheck
const clickCheck = (e) => {
    if (!activeInteraction) { // Проверка флага активного взаимодействия
        clearInterval(start);
        trail.forEach((cur) => cur.classList.remove("active"));
        const check = e.target;
        check.classList.add("active");

        if (check.classList.contains("box1")) {
            value = 0;
        } else if (check.classList.contains("box2")) {
            value = 20;
        } else if (check.classList.contains("box3")) {
            value = 40;
        } else if (check.classList.contains("box4")) {
            value = 60;
        } else {
            value = 80;
        }
        trailUpdate();
        move(value, trailValue);
        animate();
        start = setInterval(() => slide("increase"), interval);
    }
};

// Обновляем touchSlide с проверкой на активное взаимодействие
const touchSlide = (() => {
    let start, move, change, sliderWidth;

    slider.addEventListener("touchstart", (e) => {
        activeInteraction = true; // Устанавливаем флаг активного взаимодействия
        start = e.touches[0].clientX;
        sliderWidth = slider.clientWidth / trail.length;
    });

    slider.addEventListener("touchmove", (e) => {
        e.preventDefault();
        move = e.touches[0].clientX;
        change = start - move;
    });

    const mobile = (e) => {
        change > sliderWidth / 4 ? slide("increase") : null;
        change * -1 > sliderWidth / 4 ? slide("decrease") : null;
        [start, move, change, sliderWidth] = [0, 0, 0, 0];
        activeInteraction = false; // Сбрасываем флаг активного взаимодействия после завершения касания
    };
    // Вызываем mobile при завершении касания
    slider.addEventListener("touchend", mobile);
})();
