export default class feedbacksView {
    feedbacks = {
        type: 'Это не отзыв',
        parent: document.getElementById('feedbacks') || undefined,
        buttons: null,
        modal: {
            video: null,
            image: null,
            text: null,
            close: null
        }
    }

    init() {
        if (this.feedbacks.parent === undefined) return false

        /* сохранили кнопки отзывов */
        this.feedbacks.buttons = this.feedbacks.parent.querySelectorAll('.js-button-feedback')

        /* сохранили контейнеры куда выводим отзыв в модальном окне */
        this.feedbacks.modal.video = document.getElementById('modal-video')
        this.feedbacks.modal.image = document.getElementById('modal-image')
        this.feedbacks.modal.text = document.getElementById('modal-text')

        return true
    }

    showFeedback(type, title, content) {
        /* сохранили тип вызываемой сущности для управления блоком внутри view (текст, видео, или изображение) */
        this.feedbacks.type = type

        /* показываем вызываемый отзыв */
        switch (type) {
            case 'text': this.insertText(title)
            break
            case 'image': this.insertImage(content, title)
            break
            case 'video': this.insertVideo(content, title)
        }
        
    }
 
    /* показываем текстовый отзыв */
    insertText(title) {
        let text = document.querySelector(`[data-text="${title}"]`).innerHTML
        let html = `<h5>${title}</h5>${text}`
        this.feedbacks.modal.text.insertAdjacentHTML('beforeend', html)
    }
    
    /* показываем скриншот */
    insertImage(content, title) {
        let html = `<h5>${title}</h5><img src="${content}">`
        this.feedbacks.modal.image.insertAdjacentHTML('beforeend', html)
    }

    /* показываем видео отзыв */
    insertVideo(content, title) {
        let html = `<iframe width="100%" height="600" src="https://www.youtube.com/embed/${content}" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        this.feedbacks.modal.video.insertAdjacentHTML('beforeend', html)
    }

    /* закрываем отзыв и очищаем разметку */
    cleanModal() {
        /* если это оконо не с отзывом, а с обычным видео */
        if (this.feedbacks.type == 'Это не отзыв') return

        /* иначе очищаем разметку и сбрасываем type на начальное значение */
        this.feedbacks.modal[this.feedbacks.type].innerHTML = ''
        this.feedbacks.type = 'Это не отзыв'
    }
}