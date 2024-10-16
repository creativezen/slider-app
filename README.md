# Готовые решения по использованию слайдеров Swiper разных типов

Данный проект предназначен для интеграции нескольких типов слайдеров на сайт с использованием библиотеки Swiper.js.
Данные решения включают три типа слайдеров: 

 - стандартный горизонтальный - [data-slider-type="default"], 
 - вертикальный - [data-slider-type="vertical"],
 - бегущую строку - [data-slider-type="marquee"].

## Предварительные требования

Перед началом работы убедитесь, что в ваш проект включены необходимые библиотеки:

### Подключение стилей и скриптов

1. **Подключение CSS Swiper**: добавьте Swiper CSS в ваш проект для корректной работы стилей.
   ```html
   <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
   ```

2. **Подключение JavaScript Swiper**: добавьте Swiper JS для функциональности слайдера.
   ```html
   <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
   ```

## Структура проекта

### HTML

#### Стандартный слайдер

Стандартный горизонтальный слайдер с навигационными стрелками.

```html
<div class="section__slider">
    <div class="section__slider-body">
        <!-- Основной контейнер слайдера -->
        <div class="slider swiper js-slider" data-slider-name="home-slider-default" data-slider-type="default">
            <div class="swiper-wrapper">
                <!-- Слайды с контентом -->
                <div class="swiper-slide">слайд 01</div>
                <div class="swiper-slide">слайд 02</div>
                <!-- Добавьте ещё слайды по необходимости -->
            </div>
        </div>
    </div>
    <div class="section__slider-footer">
        <div class="slider-controls">
            <div class="slider-arrows">
                <!-- Стрелки навигации -->
                <div class="slider-btn prev-home-slider-default">
                    <button class="button-slider prev">
                        <!-- SVG для кнопки назад -->
                    </button>
                </div>
                <div class="slider-btn next-home-slider-default">
                    <button class="button-slider next">
                        <!-- SVG для кнопки вперед -->
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
```

#### Вертикальный слайдер

Вертикально прокручиваемый слайдер, который поддерживает автоплей и зацикливание.

```html
<div class="section__slider">
    <div class="section__slider-body">
        <!-- Контейнер для вертикального слайдера -->
        <div class="slider swiper js-slider" data-slider-name="home-slider-vertical" data-slider-type="vertical" data-slider-loop="true" data-slider-auto="true">
            <div class="swiper-wrapper">
                <div class="swiper-slide">слайд 01</div>
                <!-- Добавьте ещё слайды -->
            </div>
        </div>
    </div>
</div>
```

#### Бегущая строка

Слайдер в виде бегущей строки, который подходит для демонстрации изображений в циклическом режиме.

```html
<div class="section__slider">
    <div class="section__slider-body">
        <div class="slider swiper js-slider" data-slider-name="home-marquee" data-slider-type="marquee">
            <div class="swiper-wrapper">
                <!-- Слайды с изображениями -->
                <div class="swiper-slide">
                    <div class="card-marquee"><img src="img/img-card-history-01_2x.jpg" alt=""></div>
                </div>
                <!-- Добавьте ещё слайды с изображениями по необходимости -->
            </div>
        </div>
    </div>
</div>
```

### JavaScript

JavaScript код для управления слайдерами Swiper.

#### sliderView.js

Класс для управления настройками слайдеров.

```javascript
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
```

#### sliderControl.js

Скрипт для инициализации и запуска слайдеров.

```javascript
import sliderView from './sliderView' // Импортируем sliderView

// Функция для запуска слайдеров
export function standart() {
    let view = new sliderView() // Создаем экземпляр sliderView

    // Проверяем наличие слайдеров
    if (!view.init()) {
        console.log('.js-slider не найдены, проверь правильность разметки...')
        console.log('либо отключи данный скрипт, если он не используется...')
        return
    }

    // Инициализируем каждый найденный слайдер
    view.sliders.forEach(slider => {
        view.name = slider.dataset.sliderName;
        view.selector = `[data-slider-name="${view.name}"]`;
        view.slider = document.querySelector(view.selector);

        if (!view.name) view.nameError(slider);
        if (!view.slider) return;

        view.type = view.slider.dataset.sliderType;
        if (!view.type) view.typeError(view.selector);

        // Настраиваем слайдер в зависимости от его типа
        if(view.type === 'default') view.addDefault();
        if(view.type === 'vertical') view.addVertical();
        if(view.type === 'marquee') view.addMarquee();
    });
}
```

### SCSS

Файл SCSS для стилизации слайдеров.

```scss
@use '../mixins/fluid-size' as size;

.slider {
    .swiper-slide {
        height: auto;

        > [class*="card"] {
            height: 100%;
        }
    }

    // Специфическая настройка для стандартного слайдера
    &[data-slider-name="home-slider-default"] {
        .swiper-slide {
            @include size.calculate(max-width, 480px, 1460px, 280px, 360px);
        }
    }

    // Настройки для вертикального слайдера
    &[data-slider-name="home-slider-vertical"] {
        height: 100px;
    }

    // Специальная настройка для бегущей строки
    &[data-slider-type="marquee"] {
        .swiper-wrapper {
            transition-timing-function: linear !important;
        }

        .swiper-slide {
            max-width: 250px;
        }
    }
}

.slider-arrows {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

// Размеры между слайдером и контролами
.slider + .slider-controls {
    @include size.calculate(margin-top, 480px, 1460px, 24px, 40px);
}
```

## Инструкция по внедрению

1. **Убедитесь, что все необходимые библиотеки Swiper подключены вашей разметке.**
2. **Скопируйте и вставьте HTML-код необходимого слайдера в ваш проект.**
3. **Подключите JavaScript файл `sliderControl.js` и вызовите функцию `standart()` после загрузки страницы.**
4. **Измените настройки SCSS под свои нужды, если это необходимо.**