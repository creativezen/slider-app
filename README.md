# Разные типы слайдеров на основе Swiper.js

Этот проект использует библиотеку Swiper.js для реализации слайдеров и маркировочных прокруток (marquee) на веб-странице. С помощью данного кода вы можете легко добавлять слайдеры к себе на сайт и настраивать их параметры через HTML и JavaScript.

## Требования

- **Swiper.js**: Убедитесь, что библиотека Swiper.js доступна и подключена в вашем проекте, чтобы избежать ошибок и обеспечить корректную работу.

## Структура HTML

Для каждого слайдера используйте следующую структуру:

### Обычный слайдер

```html
<div class="section__slider">
    <div class="section__slider-body">
        <div class="slider swiper js-slider" data-slider-name="home-slider">
            <div class="swiper-wrapper">
                <!-- Ваши слайды здесь -->
                <div class="swiper-slide">Слайд 1</div>
            </div>
        </div>
    </div>
    <div class="section__slider-footer">
        <div class="slider-controls">
            <div class="slider-arrows">
                <div class="slider-btn prev-home-slider">
                    <button class="button-slider prev"> <!-- SVG для стрелки назад --> </button>
                </div>
                <div class="slider-btn next-home-slider">
                    <button class="button-slider next"> <!-- SVG для стрелки вперед --> </button>
                </div>
            </div>
        </div>
    </div>
</div>
```

### Marquee слайдер (С прокруткой)

```html
<div class="section__slider">
    <div class="section__slider-body">
        <div class="slider swiper js-slider" data-marquee-name="home-marquee">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="card-marquee"><img src="img/image1.jpg" alt="Описание изображения"></div>
                </div>
                <!-- Добавьте больше слайдов -->
            </div>
        </div>
    </div>
</div>
```

---

## Структура SCSS

- **main.scss**

```scss
/* Vendors */
@use './base/swiper';
```

- **_slider.scss**

```scss
.slider {
    .swiper-slide {
        height: auto;

        > [class*="card"] {
            height: 100%;
        }
    }
    /* Специальная надстройка анимации для marquee */
    &[data-marquee-name] {
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

.slider + .slider-controls {
    margin-top: 40px;
}
```

### Использование data-атрибутов

- **data-slider-name**: Уникальный идентификатор для обычного слайдера.
- **data-marquee-name**: Уникальный идентификатор для слайдера marquee.
- **Дополнительные параметры**: Вы можете использовать data-slider-center, data-slider-loop и data-slider-items для настройки слайдеров.

### Инициализация и Настройка

#### Создание класса и функций для управления слайдерами

```javascript
import Swiper from 'swiper' // Импортируем библиотеку Swiper
import { FreeMode, Navigation, Pagination, Autoplay } from 'swiper/modules' // Импортируем модули Swiper

// Активируем использование необходимых модулей Swiper
Swiper.use([Pagination, Navigation, FreeMode, Autoplay])

// Создаем класс sliderView для управления слайдерами
export default class sliderView {
    sliders = document.querySelectorAll('.js-slider') // Находим все элементы с классом 'js-slider'
    selector = ''
    slider = ''
    marquee = ''
    options = {
        slider: {
            space_mobile: 10, // Расстояние между слайдами на мобильных
            space_pc: 20, // Расстояние между слайдами на ПК
            items: "auto", // Видимое количество слайдов
            center: false, // Центрирование слайдов
            loop: false // Зацикливание слайдов
        },
        marquee: {
            space: 10, // Пространство между элементами в marquee
            speed: 6500, // Скорость прокрутки элементов в marquee
            delay: 0, // Задержка перед автопрокруткой в marquee
        }
    }

    // Метод инициализации с проверкой наличия слайдеров
    init() {
        if (this.sliders.length === 0) return false 
        return true 
    }

    // Метод добавления и настройки каждого слайдера
    addSlider(item) {
        this.slider = item.dataset.sliderName
        this.marquee = item.dataset.marqueeName

        if (this.marquee != '') this.addMarquee()

        if (this.slider == '') return

        this.selector = `[data-slider-name="${this.slider}"]`
        const element = document.querySelector(`${this.selector}`)
        if (element?.dataset.sliderCenter) this.options.slider.center = true
        if (element?.dataset.sliderLoop) this.options.slider.loop = true
        if (element?.dataset.sliderItems) this.options.slider.items = Number(element.dataset.sliderItems)

        new Swiper(this.selector, {
            slidesPerView: this.options.slider.items,
            centeredSlides: this.options.slider.center,
            loop: this.options.slider.loop,
            spaceBetween: this.options.slider.space_mobile,

            navigation: {
                nextEl: `.slider-btn.next-${this.slider}`,
                prevEl: `.slider-btn.prev-${this.slider}`
            },

            breakpoints: {
                1080: {
                    spaceBetween: this.options.slider.space_pc,
                },
            }
        })
    }

    // Метод для добавления и настройки marquee слайдера
    addMarquee() {
        console.log('hello from marquee')
        this.selector = `[data-marquee-name="${this.marquee}"]`

        new Swiper(this.selector, {
            freeMode: true,
            slidesPerView: 'auto',
            loop: true,
            spaceBetween: this.options.marquee.space,
            speed: this.options.marquee.speed,
            autoplay: {
                delay: this.options.marquee.delay,
            }
        })
    }
}
```

---

#### Инициализация слайдеров

Используйте следующий код для инициализации всех слайдеров на странице:

```javascript
import sliderView from './sliderView' // Импортируем созданный класс sliderView

// Функция `standart` для запуска слайдеров
export function standart() {
    let view = new sliderView()

    if (view.init() === false) {
        console.log('.js-slider не найдены, проверь правильность разметки...')
        console.log('либо отключи данный скрипт, если он не используется...')
        return
    }

    view.sliders.forEach(slider => view.addSlider(slider))
}
```

---

### JS: slider.bundle.js

- **Назначение:** Выполняется при загрузке страницы и инициирует создание слайдеров.
- **Особенности:**
  - Использует событие `DOMContentLoaded` для вызова функции `standart`.

```javascript
import * as slider from "./modules/slider/sliderControl";

window.addEventListener('DOMContentLoaded', () => {
    slider.standart();
});
```

---

### Webpack Configuration

- **Файл:** `webpack.config.js`
- **Назначение:** Определяет процесс сборки JavaScript для проекта.
- **Основные настройки:**
  - Режим: Production
  - Точки входа: `main.js` и `slider.js`
  - Используется `css-loader` и `style-loader` для обработки CSS файлов.

```javascript
const config = { 
    mode: 'production', 
    entry: { 
        main: './src/js/main.js', 
        slider: './src/js/slider.js', 
    }, 
    output: { 
        filename: '[name].bundle.js', 
    }, 
    module: { 
        rules: [ 
            { 
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'], 
            }, 
        ], 
    }, 
};

module.exports = config;
```

---

## Как использовать

1. Установите Swiper.js и связанные с ним модули в ваш проект.
2. Подключите к проекту стили Swiper.js.
3. Обеспечьте правильную HTML-разметку, включая необходимые data-атрибуты.
4. Импортируйте и вызовите `standart()` функция, чтобы автоматически настроить все слайдеры на вашей странице.