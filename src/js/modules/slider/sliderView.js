import Swiper from 'swiper' // Импортируем библиотеку Swiper для создания слайдеров
import { FreeMode, Navigation, Pagination } from 'swiper/modules' // Импортируем модули, которые будем использовать

// Активируем использование модулей Swiper, которые нам нужны
Swiper.use([Pagination, Navigation, FreeMode])

// Создаем класс sliderView для управления слайдерами на странице
export default class sliderView {
    // Находим все элементы с классом 'js-slider'
    sliders = document.querySelectorAll('.js-slider')
    name = '' // Переменная для хранения имени текущего слайдера
    selector = '' // Селектор для текущего слайдера
    options = { // Настройки по умолчанию для слайдера
        space_mobile: 10, // Расстояние между слайдами на мобильных устройствах
        space_pc: 20, // Расстояние между слайдами на ПК
        items: "auto", // Количество видимых слайдов
        center: false, // Центрирование слайдов отключено по умолчанию
        loop: false // Зацикливание слайдов отключено по умолчанию
    }

    // Метод инициализации, проверяет наличие слайдеров на странице
    init() {
        if (this.sliders.length === 0) return false // Если слайдеров нет, возвращаем false
        return true // Если слайдеры найдены, возвращаем true
    }

    // Метод для добавления и настройки каждого слайдера
    addSlider(slider) {
        // Получаем имя слайдера из data-атрибута
        this.name = slider.dataset.sliderName
        // Формируем селектор для выборки слайдера по имени
        this.selector = `[data-slider-name="${this.name}"]`

        // Проверяем, включено ли центрирование слайдов через data-атрибут и обновляем опции
        if (document.querySelector(`${this.selector}`).dataset.sliderCenter) this.options.center = true
        // Проверяем, включено ли зацикливание слайдов через data-атрибут и обновляем опции
        if (document.querySelector(`${this.selector}`).dataset.sliderLoop) this.options.loop = true
        // Проверяем количество видимых слайдов через data-атрибут и обновляем опции
        if (document.querySelector(`${this.selector}`).dataset.sliderItems) this.options.items = Number(document.querySelector(`${this.selector}`).dataset.sliderItems)

        // Создаем новый слайдер с использованием Swiper с настройками
        new Swiper(this.selector, {
            slidesPerView: this.options.items, // Количество видимых слайдов
            centeredSlides: this.options.center, // Центрирование слайдов
            loop: this.options.loop, // Зацикливание слайдов
            spaceBetween: this.options.space_mobile, // Расстояние между слайдами на мобильных устройствах

            // Настройки навигации слайдера
            navigation: {
                nextEl: `.slider-btn.next-${this.name}`, // Селектор кнопки для следующего слайда
                prevEl: `.slider-btn.prev-${this.name}` // Селектор кнопки для предыдущего слайда
            },

            // Настройки для различных размеров экрана (брейкпоинты)
            breakpoints: {
                1080: {
                    spaceBetween: this.options.space_pc, // Расстояние между слайдами на ПК
                },
            }
        })
    }
}
