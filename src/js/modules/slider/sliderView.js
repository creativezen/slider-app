import Swiper from 'swiper' // Импортируем библиотеку Swiper
import { FreeMode, Navigation, Pagination, Autoplay } from 'swiper/modules' // Импортируем модули Swiper

// Используем необходимые модули Swiper
Swiper.use([Pagination, Navigation, FreeMode, Autoplay])

// Класс для управления слайдерами
export default class sliderView {
    sliders = document.querySelectorAll('.js-slider') // Находим все слайдеры с классом 'js-slider'
    name = ''
    selector = ''
    slider = ''
    type = ''
    options = {
        default: {
            direction: 'horizontal',
            spaceBetween: 20, // Расстояние между слайдами
            slidesPerView: "auto", // Видимое количество слайдов
            centeredSlides: false, // Центрирование слайдов
            loop: false, // Зацикливание
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
            spaceBetween: 10,
            speed: 5000,
            autoplay: {
                delay: 0, // Немедленная прокрутка
            }
        }
    }

    // Метод инициализации, проверяет наличие слайдеров на странице
    init() {
        if (this.sliders.length === 0) return false 
        return true 
    }

    // Обработка ошибки, если имя слайдера не указано
    nameError(slider) {
        console.log('------------------------------')
        console.log('Ошибка в названии атрибута имени у:')
        console.log(slider)
        console.log('Проверь правильность основного атрибута [data-slider-name="_уникальное_название_"]')
        console.log('------------------------------')
    }

    // Обработка ошибки, если тип слайдера не указан
    typeError(selector) {
        console.log('------------------------------')
        console.log(selector)
        console.log('Отсутствует указание типа слайдера [data-slider-type=" ???? "]')
        console.log('Варианты типа: "default", "vertical", "marquee"')
        console.log('------------------------------')
    }

    // Метод настройки стандартного слайдера
    addDefault() {
        const data = this.slider.dataset;
        this.options.default.centeredSlides = data.sliderCenter !== undefined;
        this.options.default.loop = data.sliderLoop !== undefined;
        this.options.default.autoplay = data.sliderAuto !== undefined ? { delay: 1000 } : false;
        this.options.default.slidesPerView = data.sliderItems !== undefined ? Number(data.sliderItems) : "auto";

        new Swiper(this.selector, {
            ...this.options.default,
            navigation: {
                nextEl: `.slider-btn.next-${this.name}`,
                prevEl: `.slider-btn.prev-${this.name}`
            },
        });

        this.resetOptions();
    }

    // Метод настройки вертикального слайдера
    addVertical() {
        const data = this.slider.dataset;
        this.options.vertical.centeredSlides = data.sliderCenter !== undefined;
        this.options.vertical.loop = data.sliderLoop !== undefined;
        this.options.vertical.autoplay = data.sliderAuto !== undefined ? { delay: 1000 } : false;
        this.options.vertical.slidesPerView = data.sliderItems !== undefined ? Number(data.sliderItems) : 1;

        new Swiper(this.selector, this.options.vertical);

        this.resetOptions();
    }

    // Метод настройки слайдера в стиле бегущей строки
    addMarquee() {
        new Swiper(this.selector, {
            ...this.options.marquee,
            freeMode: true,
            loop: true
        });

        this.resetOptions();
    }

    // Сброс настроек к исходным
    resetOptions() {
        this.options = {
            default: {
                direction: 'horizontal',
                spaceBetween: 20,
                slidesPerView: "auto",
                centeredSlides: false,
                loop: false,
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
                slidesPerView: "auto",
                spaceBetween: 10,
                speed: 5000,
                autoplay: {
                    delay: 0,
                }
            }
        }       
    }
}
