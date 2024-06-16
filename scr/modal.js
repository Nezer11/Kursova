// Створення каркасу модалки та розміщення його на сторінці
function _createModal(options) {
    const DEFAULT_MODAL_WIDTH = '600px'
    const modal = document.createElement('div')
    modal.classList.add('cmodal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
        <div class="modal-window" style="width: ${options.width || DEFAULT_MODAL_WIDTH}">
            <div class="modal-header">
                <span class="modal-title">${options.title || 'Default modal title'}</span>
                ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
            </div>
            <div class="modal-body">
                ${options.content || ''}
            </div>
        </div>
    </div>

    `)
    document.body.appendChild(modal)
    return modal   
}

// Задання методів модалки
$.modal = function(options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    let closing = false
    let destroyed = false

    const modal = {
        
        open() {
            if (destroyed) {
               return console.log('Ups. Modal window is destroyed') 
            }
            !closing && $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION_SPEED)
        },
    }

    const listener = event => {
        if (event.target.dataset.close) {
            modal.close()
        }
    }
    
    //Обробка кліку на [x] та сірому фоні
    $modal.addEventListener('click', listener)
    
     //Розширення методів модалки
    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener(listener)
            destroyed = true
        }
    })
}

