import sliderView from './sliderView' // Импортируем созданный класс sliderView
import sliderModel from './sliderModel'

// Функция `standart` для запуска слайдеров
export function standart() {
    let model = new sliderModel()
    let view = new sliderView()

    if (view.init() === false) {
        console.log('.js-slider не найдены, проверь правильность разметки...')
        console.log('либо отключи данный скрипт, если он не используется...')
        return
    }

    view.sliders.forEach(slider => {
        view.name = slider.dataset.sliderName
        view.selector = `[data-slider-name="${view.name}"]`
        view.slider = document.querySelector(`${view.selector}`)

        if (view.name == undefined) view.nameError(slider.dataset)
        if (view.type == undefined) view.typeError(view.selector)
        if (view.slider == '') return

        view.type = view.slider.dataset.sliderType

        if(view.type == 'default') view.addDefault()
        if(view.type == 'vertical') view.addVertical()
        if(view.type == 'marquee') view.addMarquee()
    })
}