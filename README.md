# Добавление и настройка слайдеров разных типов в HTML на основе плагина swiper.js

Этот проект предоставляет простой удобный и быстрый способ добавления и управления слайдерами Swiper в размете HTML. 
C помощью данного решения вы можете создавать и инициализировать через разметку три типа слайдеров:
 - стандартный - default,
 - вертикальный - vertical,
 - бегущая строка - marquee.

## 1. Установка и подключение необходимых зависимостей

```bash
    npm install swiper
```

Либо убедитесь, что вы подключили все необходимые файлы в вашем HTML:

```html
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
```

## 2. Добавление слайдера в HTML

### Стандартный слайдер

Чтобы добавить стандартный слайдер, используйте следующую разметку:

```html
    <div class="section__slider-body">
        <div class="slider swiper js-slider" data-slider-name="home-slider-default" data-slider-type="default">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    слайд 01
                </div>
                <div class="swiper-slide">
                    слайд 02
                </div>
                <!-- Добавьте больше слайдов по необходимости -->
            </div>
        </div>
    </div>
    <div class="section__slider-footer">
        <div class="slider-controls">
            <div class="slider-arrows">
                <div class="slider-btn prev-home-slider-default">
                    <button class="button-slider prev">
                        <!-- Здесь может быть ваша иконка или текст -->
                    </button>
                </div>
                <div class="slider-btn next-home-slider-default">
                    <button class="button-slider next">
                        <!-- Здесь может быть ваша иконка или текст -->
                    </button>
                </div>
            </div>
        </div>
    </div>
```

### Вертикальный слайдер

Для вертикального слайдера используйте следующую разметку:

```html
<div class="section__slider">
    <div class="section__slider-body">
        <div class="slider swiper js-slider" data-slider-name="home-slider-vertical" data-slider-type="vertical" data-slider-loop="true" data-slider-auto="true">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    слайд 01
                </div>
                <div class="swiper-slide">
                    слайд 02
                </div>
                <!-- Добавьте больше слайдов по необходимости -->
            </div>
        </div>
    </div>
</div>
```

### Бегущая строка (Marquee)

Для создания бегущей строки используйте следующую разметку:

```html
<div class="section__slider">
    <div class="section__slider-body">
        <div class="slider swiper js-slider" data-slider-name="home-marquee" data-slider-type="marquee">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="card-marquee"><img src="img/img-card-history-01_2x.jpg" alt=""></div>
                </div>
                <div class="swiper-slide">
                    <div class="card-marquee"><img src="img/img-card-history-02_2x.jpg" alt=""></div>
                </div>
                <!-- Добавьте больше слайдов по необходимости -->
            </div>
        </div>
    </div>
</div>
```

## 3. Настройка слайдера

### Обязательные атрибуты

- `data-slider-name`: Уникальное имя слайдера. Используется для идентификации слайдера и связи с кнопками навигации.
- `data-slider-type`: Тип слайдера. Возможные значения: `default`, `vertical`, `marquee`.

### Дополнительные атрибуты

- `data-slider-loop`: Если установлено в `true`, слайдер будет зациклен.
- `data-slider-auto`: Если установлено в `true`, слайдер будет автоматически прокручиваться.
- `data-slider-center`: Если установлено, `true` слайды будут центрированы.
- `data-slider-items`: Количество видимых слайдов, либо `auto`, если атрибут не указан.

## 4. Запуск слайдеров

Скрипт автоматически инициализирует все слайдеры при загрузке страницы. Если слайдеры не найдены, в консоль будет выведено сообщение об ошибке.

## 5. Обработка ошибок

Если в разметке допущена ошибка, например, не указано имя слайдера или тип, в консоль будет выведено соответствующее сообщение:

- **Ошибка в названии атрибута имени**: Проверьте, что указан атрибут `data-slider-name` с уникальным значением.
- **Отсутствует указание типа слайдера**: Проверьте, что указан атрибут `data-slider-type` с одним из допустимых значений (`default`, `vertical`, `marquee`).

## 6. JavaScript

### Файл: `sliderView.js`

Этот файл содержит класс `sliderView`, который отвечает за визуальное управление слайдерами.

#### Импорт библиотеки и модулей Swiper

```javascript
import Swiper from 'swiper';
import { FreeMode, Navigation, Pagination, Autoplay } from 'swiper/modules';
```

- **Swiper**: Основная библиотека для создания слайдеров.
- **FreeMode, Navigation, Pagination, Autoplay**: Модули Swiper для различных функций.

#### Активация модулей Swiper

```javascript
Swiper.use([Pagination, Navigation, FreeMode, Autoplay]);
```

- **Swiper.use**: Активирует необходимые модули для работы слайдеров.

```javascript
export default class sliderView {
    sliders = document.querySelectorAll('.js-slider');
    name = '';
    selector = '';
    slider = '';
    type = '';
    marquee = '';
    options = {
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
```

- **sliders**: Находит все элементы с классом `js-slider`.
- **options**: Объект с настройками для разных типов слайдеров.

#### Метод `init`

```javascript
init() {
    if (this.sliders.length === 0) return false;
    return true;
}
```

- **init**: Проверяет наличие слайдеров. Если слайдеры не найдены, возвращает `false`.

#### Методы обработки ошибок

```javascript
nameError(slider) {
    console.log('------------------------------');
    console.log('Ошибка в названии атрибута имени у:');
    console.log(slider);
    console.log('Проверь правильность основного атрибута [data-slider-name="уникальное_название"]');
    console.log('------------------------------');
}

typeError(selector) {
    console.log('------------------------------');
    console.log(selector);
    console.log('Отсутствует указание типа слайдера [data-slider-type=" ???? "]');
    console.log('Варианты типа: "default", "vertical", "marquee"');
    console.log('------------------------------');
}
```

- **nameError**: Выводит сообщение об ошибке, если не указано имя слайдера.
- **typeError**: Выводит сообщение об ошибке, если не указан тип слайдера.

#### Методы добавления слайдеров

```javascript
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
```

- **addDefault**: Добавляет и настраивает стандартный слайдер.
- **addVertical**: Добавляет и настраивает вертикальный слайдер.
- **addMarquee**: Добавляет и настраивает бегущую строку.

#### Метод `unsetOptions`

```javascript
unsetOptions() {
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
    };
}
```

- **unsetOptions**: Сбрасывает настройки слайдера к значениям по умолчанию после инициализации.

### Файл: `sliderControl.js`

Этот файл содержит функцию `standart`, которая инициализирует все слайдеры на странице.

#### Импорт класса `sliderView`

```javascript
import sliderView from './sliderView';
import sliderModel from './sliderModel';
```

- **sliderView**: Класс для управления слайдерами.
- **sliderModel**: Модель данных для слайдеров (если используется).

#### Функция `standart`

```javascript
export function standart() {
    let model = new sliderModel();
    let view = new sliderView();

    if (view.init() === false) {
        console.log('.js-slider не найдены, проверь правильность разметки...');
        console.log('либо отключи данный скрипт, если он не используется...');
        return;
    }

    view.sliders.forEach(slider => {
        view.name = slider.dataset.sliderName;
        view.selector = `[data-slider-name="${view.name}"]`;
        view.slider = document.querySelector(`${view.selector}`);

        if (view.name == undefined) view.nameError(slider.dataset);
        if (view.type == undefined) view.typeError(view.selector);
        if (view.slider == '') return;

        view.type = view.slider.dataset.sliderType;

        if (view.type == 'default') view.addDefault();
        if (view.type == 'vertical') view.addVertical();
        if (view.type == 'marquee') view.addMarquee();
    });
}
```

- **standart**: Инициализирует все слайдеры на странице.
  - **view.init()**: Проверяет наличие слайдеров.
  - **view.sliders.forEach**: Перебирает все найденные слайдеры.
  - **view.name**: Получает имя слайдера из атрибута `data-slider-name`.
  - **view.selector**: Создает селектор для поиска слайдера по имени.
  - **view.slider**: Находит слайдер по селектору.
  - **view.type**: Получает тип слайдера из атрибута `data-slider-type`.
  - **view.addDefault, view.addVertical, view.addMarquee**: Добавляет и настраивает слайдер в зависимости от типа.

### Файл: `slider.js`

Этот файл запускает функцию `standart` при загрузке страницы.

```javascript
import * as slider from "./modules/slider/sliderControl";

window.addEventListener('DOMContentLoaded', (e) => {
    slider.standart();
});
```

## 7. Необходимые надстройки в css

Для корректной работы анимации у слайдера с типом marquee, в стилях swiper необходимо переназначить свойство отвечающие за анимацию

```scss
.slider {

    /* Специальная надстройка анимации для marquee */
    &[data-slider-type="marquee"] {
        .swiper-wrapper {
            transition-timing-function: linear !important;
        }
    }

    /* Специальная надстройка для правильного поведения свойства высоты у элементов типа .card */
    .swiper-slide {
        height: auto;

        > [class*="card"] {
            height: 100%;
        }
    }
}
```