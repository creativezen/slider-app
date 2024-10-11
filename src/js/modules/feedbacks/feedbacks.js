import feedbacksView from "./feedbacksView"

export function standart() {
    const view = new feedbacksView()

    if (view.init() === false) {
        console.log('id="feedbacks" не найден, проверь правильность разметки...')
        console.log('либо отключи данный скрипт, если он не используется...')
        return
    }

    view.feedbacks.buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            /* получили все данные вызываемого окна */
            let thisButton = e.target.closest('.js-button-feedback')
            /* получили тип отзыва */
            let type = thisButton.dataset.type || 'Это не отзыв'
            /* получили заголовок отзыва */
            let title = thisButton.dataset.title
            /* получили содержимое отзыва */
            let content = thisButton.dataset.content || 'Это текстовый отзыв'

            /* вызвали генерацию разметки и ее вывод в окне */
            view.showFeedback(type, title, content)
        })
    })

    document.addEventListener('click', function(e) {
        /* если окно закрываем */
        if (e.target.classList.contains('js-close') || e.target.classList.contains('js-modal')) {
            /* очищаем контейнер окна, чтобы следующей вызов не дублировал содержимое */
            view.cleanModal()
        }
    })
}