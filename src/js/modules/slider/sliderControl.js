import sliderView from './sliderView'

export function standart() {
    let view = new sliderView()

    if (view.init() === false) {
        console.log('.js-slider не найдены, проверь правильность разметки...')
        console.log('либо отключи данный скрипт, если он не используется...')
        return
    }

	view.sliders.forEach(slider => view.addSlider(slider))
}
