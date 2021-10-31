// slider

document.addEventListener('DOMContentLoaded', function () {

// dropdown question
    let questionList = document.querySelectorAll("[data-question-item]");

    questionList.forEach(i => {
        i.addEventListener('click', ev => {
            ev.target.parentElement.classList.toggle("active");
        });
    });

//dropdown
    let listContainerDropdown = document.querySelectorAll("[data-dropdown-modal]");
    let listDropdownShareItems = document.querySelectorAll("[data-modal-share-item]");
    let listDropdownCategoryItems = document.querySelectorAll("[data-modal-category-item]");
    let listDropdownEmojiItems = document.querySelectorAll("[data-modal-emoji-item]");

    listContainerDropdown.forEach(i => {
        let linkShare = i.querySelector("[data-modal-share]");
        let linkTriplets = i.querySelector("[data-modal-triplets]");
        let linkEmoji = i.querySelector("[data-modal-emoji]");

        if (linkShare) {
            linkShare.addEventListener('click', ev => {
                listDropdownShareItems.forEach(item => {
                    item.classList.remove("active")
                });
                listDropdownCategoryItems.forEach(item => {
                    item.classList.remove("active")
                });
                i.querySelector("[data-modal-share-item]").classList.toggle("active");
            });
        }

        if (linkTriplets) {
            linkTriplets.addEventListener('click', ev => {
                listDropdownShareItems.forEach(item => {
                    item.classList.remove("active")
                });
                listDropdownCategoryItems.forEach(item => {
                    item.classList.remove("active")
                });
                i.querySelector("[data-modal-category-item]").classList.toggle("active");
            });
        }

        if (linkEmoji) {
            linkEmoji.addEventListener('click', ev => {
                i.querySelector("[data-modal-emoji-item]").classList.toggle("active");
            });
        }

        document.addEventListener('click', ev => {
            if (!ev.target.closest('[data-modal-emoji]') && !ev.target.closest('[data-modal-emoji-item]') && !ev.target.closest('[data-modal-share-item]') && !ev.target.closest('[data-modal-category-item]') && !ev.target.closest("[data-modal-share]") && !ev.target.closest("[data-modal-triplets]")) {
                listDropdownShareItems.forEach(item => {
                    item.classList.remove("active")
                });

                listDropdownCategoryItems.forEach(item => {
                    item.classList.remove("active")
                });
                listDropdownEmojiItems.forEach(item => {
                    item.classList.remove("active")
                });

            }
        });
    });


//side menu fixed desktop
    let locationMenu = document.querySelector('.location-menu');

    document.addEventListener('scroll', () => {
        if (pageYOffset > 15) {
            locationMenu.classList.add('box-shadow');
        } else {
            locationMenu.classList.remove('box-shadow');
        }
    });

// search modal open
    document.addEventListener('click', ev => {
        if (ev.target.closest('[data-search-modal-btn]')) {
            let container = ev.target.closest('[data-search-modal-container]');
            let formModal = container.querySelector('[data-search-modal]');

            if (formModal) {
                formModal.classList.toggle('open');
            }
        }
    });

// search modal close
    document.addEventListener('click', ev => {
        if (!ev.target.closest('[data-search-modal]') && !ev.target.closest('[data-search-modal-btn]')) {
            let searchModalItems = document.querySelectorAll('[data-search-modal]');

            searchModalItems.forEach(item => {
                if (item.classList.contains('open')) {
                    item.classList.remove('open');
                }
            });
        }

        if (ev.target.closest('[data-search-modal-close]')) {
            ev.target.closest('[data-search-modal]').classList.remove("open");
        }
    });

    //modal Authorization
    !function (e) {
        "function" != typeof e.matches && (e.matches = e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || function (e) {
            for (var t = this, o = (t.document || t.ownerDocument).querySelectorAll(e), n = 0; o[n] && o[n] !== t;) ++n;
            return Boolean(o[n])
        }), "function" != typeof e.closest && (e.closest = function (e) {
            for (var t = this; t && 1 === t.nodeType;) {
                if (t.matches(e)) return t;
                t = t.parentNode
            }
            return null
        })
    }(window.Element.prototype);

    let modalButtons = document.querySelectorAll('.js-open-modal'),
        overlay = document.querySelector('.js-overlay-modal'),
        closeButtons = document.querySelectorAll('.js-modal-close');

    modalButtons.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            let modalId = this.getAttribute('data-modal'),
                modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

            modalElem.classList.add('active');
            overlay.classList.add('active');
        });
    });

    closeButtons.forEach(function (item) {
        item.addEventListener('click', function (e) {
            let parentModal = this.closest('.modal');

            parentModal.classList.remove('active');
            overlay.classList.remove('active');
        });

    });

    document.body.addEventListener('keyup', function (e) {
        let key = e.keyCode;

        if (key == 27) {
            document.querySelector('.modal.active').classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        }
    }, false);

    overlay.addEventListener('click', function () {
        document.querySelector('.modal.active').classList.remove('active');
        this.classList.remove('active');
    });

    (function () {
        function InitSelect(el) {
            this.input = el.querySelector('.select__input');
            this.head = el.querySelector('.select__head-js');
            this.list = el.querySelector('.select__list-js');
            this.items = el.querySelectorAll('.select__item-js');
            this.handlers = {
                watch: function (ev) {
                    if (!ev.target.closest('.select-js')) {
                        this.close();
                    }
                }
            };

            this.init = function () {
                this.update();

                this.head.addEventListener('click', () => {
                    this.head.classList.contains('open') ? this.close() : this.open();
                });

                this.items.forEach((item) => {
                    item.addEventListener('click', () => { this.click(item) });
                });
            };

            this.click = function (item) {
                this.input.value = item.getAttribute('data-select-id');
                this.close();
                this.update(item);
            };

            this.update = function (item) {
                this.head.children[0].innerHTML = item
                    ? item.innerHTML
                    : this.list.querySelector(`[data-select-id="${this.input.value}"]`).innerHTML
            };

            this.open = function () {
                this.head.classList.add('open');
                this.list.classList.add('active');
                this.attachListener(document, 'click', 'watch');
            };

            this.close = function () {
                this.head.classList.remove('open');
                this.list.classList.remove('active');
                this.removeListener(document, 'click', 'watch');
            };

            this.getEventHandler = function (handlerName) {
                return this.handlers['__' + handlerName] || this.handlers[handlerName];
            };

            this.attachListener = function (element, event, handlerName) {
                element.addEventListener(event, this.registrListener(handlerName));
            };

            this.registrListener = function (handlerName) {
                this.handlers['__' + handlerName] = this.handlers['__' + handlerName] || this.handlers[handlerName].bind(this);
                return this.handlers['__' + handlerName];
            };

            this.removeListener = function (element, event, handlerName) {
                element.removeEventListener(event, this.getEventHandler(handlerName));
            };

            this.init();
        };

        document.querySelectorAll('.select-js').forEach((select) => {
            new InitSelect(select);
        });
    }());
});

