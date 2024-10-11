# Реализация слайдера с использованием Swiper.js

Этот проект использует Swiper.js для реализации настраиваемого слайдера на веб-странице. Эта настройка позволяет легко конфигурировать слайдеры, используя data-атрибуты в HTML и JavaScript код для инициализации и управления поведением слайдера.

## Требования

- **Swiper.js**: Убедитесь, что Swiper.js включен в ваш проект. Это руководство использует ES модули, поэтому его следует импортировать соответствующим образом.

## Структура HTML

Ваш HTML должен включать следующую структуру для каждого слайдера, который вы хотите реализовать:

```html
<div class="section__slider">
    <div class="section__slider-body">
        <div class="slider swiper js-slider" data-slider-name="home-slider" data-slider-center="true" data-slider-loop="true">
            <div class="swiper-wrapper">
                <div class="swiper-slide">Слайд 01</div>
                <div class="swiper-slide">Слайд 02</div>
                <div class="swiper-slide">Слайд 03</div>
                <!-- Добавляйте больше слайдов по мере необходимости -->
            </div>
        </div>
    </div>
    <div class="section__slider-footer">
        <div class="slider-controls">
            <div class="slider-arrows">
                <div class="slider-btn prev-home-slider">
                    <button class="button-slider prev">
                        <!-- Иконка стрелки SVG -->
                    </button>
                </div>
                <div class="slider-btn next-home-slider">
                    <button class="button-slider next">
                        <!-- Иконка стрелки SVG -->
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
```

### Атрибуты
- `data-slider-name`: Уникальный идентификатор для слайдера.
- `data-slider-center`: Если атрибут присутствует и установлен в true, слайды центрируются.
- `data-slider-loop`: Если атрибут присутствует и установлен в true, слайдер будет зациклен.
- При необходимости добавьте `data-slider-items` для указания количества видимых элементов.

## Конфигурация JavaScript

JavaScript код инициализирует и настраивает слайдеры на основе data-атрибутов в HTML.

### Импорт Swiper

```javascript
import Swiper from 'swiper';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';

Swiper.use([Pagination, Navigation, FreeMode]);
```

### Инициализация слайдера

Создайте и настройте новый класс `sliderView`, который обрабатывает все слайдеры на странице:

```javascript
export default class sliderView {
    sliders = document.querySelectorAll('.js-slider');
    name = '';
    selector = '';
    options = {
        space_mobile: 10,
        space_pc: 20,
        items: "auto",
        center: false,
        loop: false
    };

    init() {
        if (this.sliders.length === 0) return false;
        return true;
    }

    addSlider(slider) {
        this.name = slider.dataset.sliderName;
        this.selector = `[data-slider-name="${this.name}"]`;
        
        if (slider.dataset.sliderCenter) this.options.center = true;
        if (slider.dataset.sliderLoop) this.options.loop = true;
        if (slider.dataset.sliderItems) this.options.items = Number(slider.dataset.sliderItems);

        new Swiper(this.selector, {
            slidesPerView: this.options.items,
            centeredSlides: this.options.center,
            loop: this.options.loop,
            spaceBetween: this.options.space_mobile,

            navigation: {
                nextEl: `.slider-btn.next-${this.name}`,
                prevEl: `.slider-btn.prev-${this.name}`
            },

            breakpoints: {
                1080: {
                    spaceBetween: this.options.space_pc,
                },
            }
        });
    }
}
```

### Запуск слайдера

Чтобы запустить слайдер, используйте следующую функцию после загрузки страницы:

```javascript
import sliderView from './sliderView';

export function standard() {
    let view = new sliderView();

    if (view.init() === false) {
        console.log('.js-slider не найдены, проверьте правильность разметки...');
        console.log('Либо отключите этот скрипт, если он не используется...');
        return;
    }

    view.sliders.forEach(slider => view.addSlider(slider));
}
```

## Пример использования

Включите и выполните `standard()` на вашей странице для инициализации слайдеров:

```javascript
import { standard } from './path/to/your/code';

document.addEventListener('DOMContentLoaded', function() {
    standard();
});
```

## Настройка

Изменяйте data-атрибуты в HTML, чтобы изменить поведение слайдера:
- Установите `data-slider-center` в true или false для включения/отключения центрирования слайдов.
- Установите `data-slider-loop` для поведения зацикливания.
- При необходимости укажите `data-slider-items` для количества слайдов на экране.

Настройте опции JavaScript для изменения промежутков между слайдами или добавьте больше модулей Swiper по необходимости.