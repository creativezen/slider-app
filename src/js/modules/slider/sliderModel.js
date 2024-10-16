export default class sliderModel {
    options = {
        default: {
            direction: 'horizontal',
            spaceBetween: 20, // Расстояние между слайдами на ПК
            slidesPerView: "auto", // Видимое количество слайдов
            centeredSlides: false, // Центрирование слайдов
            loop: false, // Зацикливание слайдов
            autoplay: false,
            speed: 1000,
        },
        vertical: {
            direction: 'vertical',
            centeredSlides: false,
            loop: false,
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 2000,
            autoplay: false,
        },
        marquee: {
            direction: 'horizontal',
            slidesPerView: "auto", // Видимое количество слайдов
            spaceBetween: 10, // Пространство между элементами в marquee
            speed: 5000, // Скорость прокрутки элементов в marquee
            autoplay: {
                delay: 0, // Задержка перед автопрокруткой в marquee
            }
        }
    }
}