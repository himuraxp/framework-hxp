class CarouselTouchPlugin {
    
    /**
     * @param {Carousel} carousel
     */
    constructor(carousel) {
        carousel.container.addEventListener('dragstart', e => e.preventDefault())
        carousel.container.addEventListener('mousedown', this.startDrag.bind(this))
        carousel.container.addEventListener('touchstart', this.startDrag.bind(this))
        window.addEventListener('mousemove', this.drag.bind(this))
        window.addEventListener('touchmove', this.drag.bind(this))
        window.addEventListener('mouseup', this.endDrag.bind(this))
        window.addEventListener('touchend', this.endDrag.bind(this))
        window.addEventListener('touchcancel', this.endDrag.bind(this))
        this.carousel = carousel
    }

    /**
     * Start move on mouse and touch mode
     * @param {MouseEvent|TouchEvent} e
     */
    startDrag(e) {
        if (e.touches) { 
            if (e.touches.length > 1) {
                return
            } else {
                e = e.touches[0]
            }
        }
        this.origin = {x: e.screenX, y: e.screenY}
        this.width = this.carousel.containerWidth
        this.carousel.disableTransition()
    }

    /**
     * Move
     * @param {MouseEvent|TouchEvent} e
     */
    drag(e) {
        if (this.origin) {
            let point = e.touches ? e.touches[0] : e
            let translate = {x: point.screenX - this.origin.x, y: point.screenY - this.origin.y}
            let baseTranslate = this.carousel.currentItem * -100 / this.carousel.items.length
            if (e.touches && Math.abs(translate.x) > Math.abs(translate.y)) {
                e.preventDefault()
                e.stopPropagation()
            }
            this.lastTranslate = translate
            this.carousel.translate(baseTranslate + 100 * translate.x / this.width)
        }
    }

    /**
     * End move on mouse and touch mode
     * @param {MouseEvent|TouchEvent} e
     */
    endDrag(e) {
       if (this.origin && this.lastTranslate) {
           this.carousel.enableTransition()
           if (Math.abs(this.lastTranslate.x / this.carousel.carouselWidth) > 0.2) {
               if (this.lastTranslate.x < 0) {
                   this.carousel.next()
               } else {
                   this.carousel.prev()
               }
           } else {
               this.carousel.goTo(this.carousel.currentItem)
           }
       }
       this.origin = null
    }
}

class Carousel {

    /**
     * @callback moveCallBack
     * @param {number} index
     */

    /**
     * Constructor of Carousel
     * @param {HTMLElement} element
     * @param {Object} options
     * @param {Object} [options.slidesToScroll=1]
     * @param {Object} [options.slidesVisible=1]
     * @param {boolean} [options.loop=false]
     * @param {boolean} [options.pagination=false]
     * @param {boolean} [options.navigation=true]
     * @param {boolean} [options.keyboard=false]
     * @param {boolean} [options.infinite=false]
     */
    constructor(element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false,
            pagination: false,
            navigation: true,
            keyboard: false,
            infinite: false
        }, options)
        if (this.options.loop && this.options.infinite) {
            throw new Error("Carousel could not be loop and infinite both")
        }
        let children = [].slice.call(element.children)
        this.isMobile = false
        this.currentItem = 0
        this.moveCallBacks = []
        this.offset = 0

        // DOM modify
        this.root = this.createDivWithClass('carousel-root')
        this.container = this.createDivWithClass('carousel-container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel-item')
            item.appendChild(child)
            return item
        })
        if (this.options.infinite) {
            this.offset = this.options.slidesVisible + this.options.slidesToScroll
            if (this.offset > children.length) {
                console.error("You need more items for active the infinite mode on the Carousel", element)
            }
            this.items = [
                ...this.items.slice(this.items.length - this.offset).map(item => item.cloneNode(true)),
                ...this.items,
                ...this.items.slice(0, this.offset).map(item => item.cloneNode(true)),
            ]
            this.goTo(this.offset, false)
        }
        this.items.forEach(item => this.container.appendChild(item))
        this.setStyle()
        if (this.options.navigation) {
            this.createNavigation()
        }
        if (this.options.pagination) {
            this.createPagination()
        }

        // Events
        this.moveCallBacks.forEach(cb => cb(this.currentItem))
        this.onWindowResize()
        window.addEventListener('resize', this.onWindowResize.bind(this))
        if (this.options.keyboard) {
            this.root.setAttribute('tabindex', '0')
            this.root.addEventListener('keyup', (e) => {
                if (e.key === 'ArrowRight' || e.key === 'Right') {
                    this.next()
                } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
                    this.prev()
                }
            })
        }
        if (this.options.infinite) {
            this.container.addEventListener('transitionend', this.resetInfinite.bind(this))
        }
        new CarouselTouchPlugin(this)
    }

    /**
     * Generator of pagination on carousel
     */
    createPagination() {
        let pagination = this.createDivWithClass('carousel-pagination')
        let buttons = []
        this.root.appendChild(pagination)
        for (let i = 0; i < this.items.length - 2 * this.offset; i = i + this.options.slidesToScroll) {
            let button = this.createDivWithClass('carousel-pagination-button z-depth-3')
            button.addEventListener('click', () => this.goTo(i + this.offset))
            pagination.appendChild(button)
            buttons.push(button)
        }
        this.onMove(index => {
            let count = this.items.length - 2 * this.offset
            let activeButton = buttons[Math.floor(((index - this.offset) % count) / this.options.slidesToScroll)]
            if (activeButton) {
                buttons.forEach(button => button.classList.remove('carousel-pagination-button-active'))
                activeButton.classList.add('carousel-pagination-button-active')
            }
        })
    }

    /**
     * Generator of navigation on carousel
     */
    createNavigation() {
        let nextButton = this.createDivWithClass('carousel-next z-depth-3')
        let prevButton = this.createDivWithClass('carousel-prev z-depth-3')
        let nextIcon = this.createDivWithClass('fa fa-chevron-circle-right')
        let prevIcon = this.createDivWithClass('fa fa-chevron-circle-left')
        nextButton.appendChild(nextIcon)
        prevButton.appendChild(prevIcon)
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
        if (this.options.loop === true) {
            return
        }
        this.onMove(index => {
            if (index === 0) {
                prevButton.classList.add('carousel-prev-hidden')
            } else {
                prevButton.classList.remove('carousel-prev-hidden')
            }
            if (this.items[this.currentItem + this.slidesVisible] === undefined) {
                nextButton.classList.add('carousel-next-hidden')
            } else {
                nextButton.classList.remove('carousel-next-hidden')
            }
        })
    }
    next() {
        this.goTo(this.currentItem + this.slidesToScroll)
    }
    prev() {
        this.goTo(this.currentItem - this.slidesToScroll)
    }

    /**
     * Move to target item
     * @param {number} index
     * @param {boolean} [animation = true]
     */
    goTo(index, animation = true) {
        if (index < 0) {
            if (this.options.loop) {
                index = this.items.length - this.slidesVisible
            } else {
                return
            }

        } else if (index > this.items.length || (this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem)) {
            if (this.options.loop) {
                index = 0
            } else {
                return
            }
        }
        let translateX = index * -100 / this.items.length
        if (animation === false) {
            this.disableTransition()
        }
        this.translate(translateX)
        this.container.offsetHeight
        if (animation === false) {
            this.enableTransition()
        }
        this.currentItem = index
        this.moveCallBacks.forEach(cb => cb(index))
    }

    /**
     * Move container for infinity effect
     */
    resetInfinite() {
        if (this.currentItem <= this.options.slidesToScroll) {
            this.goTo(this.currentItem + (this.items.length - 2 * this.offset), false)
        } else if (this.currentItem >= this.items.length - this.offset) {
            this.goTo(this.currentItem - (this.items.length - 2 * this.offset), false)
        }
    }

    /**
     * @param {moveCallBack} cb
     */
    onMove(cb) {
        this.moveCallBacks.push(cb)
    }

    onWindowResize() {
        let mobile = window.innerWidth < 800
        if (mobile !== this.isMobile) {
            this.isMobile = mobile
            this.setStyle()
            this.moveCallBacks.forEach(cb => cb(this.currentItem))        
        }
    }

    /**
     * Define new size for all items 
     */
    setStyle() {
        let ratio = this.items.length / this.slidesVisible
        this.container.style.width = (ratio * 100) + '%'
        this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio) + "%")    
    }

    /**
     * Create a new DIV element with a class name
     * @param {string} className
     * @returns {HTMLElement}
     */
    createDivWithClass(className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }

    disableTransition() {
        this.container.style.transition = 'none'
    }
    enableTransition() {
        this.container.style.transition = ''
    }
    translate(translateX) {
        this.container.style.transform = 'translate3d('+ translateX +'%, 0, 0)'
    }

    /**
     * @returns {number}
     */
    get slidesToScroll() {
        return this.isMobile ? 1 : this.options.slidesToScroll
    }
    /**
     * @returns {number}
     */
    get slidesVisible() {
        return this.isMobile ? 1 : this.options.slidesVisible
    }
    /**
     * @returns {number}
     */
    get containerWidth() {
        return this.container.offsetWidth
    }
    /**
     * @returns {number}
     */
    get carouselWidth() {
        return this.root.offsetWidth
    }
}

let onReady = function() {
    new Carousel(document.querySelector('#carousel'), {
        slidesToScroll: 2,
        slidesVisible: 2,
        loop: false,
        pagination: false,
        keyboard: false,
        infinite: true
    })
}

if (document.readyState !== 'loading') {
    onReady()
}


export function carousel() {
    document.addEventListener('DOMContentLoaded', onReady)
}

export default carousel