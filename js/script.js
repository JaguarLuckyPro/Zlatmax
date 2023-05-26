"use strict"

// SPOLLERS
// роблю колекцію всіх об'єктів, що мають data-spollers
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
    // отримую звичайні спойлери
    // переводжу колекцію в масив
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
        return !item.dataset.spollers.split(",")[0];
    });
    // ініціалізую звичайні спойлери
    if (spollersRegular.length > 0) {
        initSpollers(spollersRegular);
    }

    // // отримання спойлерів з медіа запитами
    // const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
    //     return item.dataset.spollers.split(",")[0];
    // });

    // // ініціалізую спойлери з медіа запитами
    // if (spollersMedia.length > 0) {
    //     // константа з пустим масивом
    //     const breakpointsArray = [];
    //     // перебираю масив з медіа запитами
    //     spollersMedia.forEach(item => {
    //         // отримую рядок з параметрами data-spollers, створюю пустий об'єкт і наповнюю
    //         const params = item.dataset.spollers;
    //         const breakpoint = {};
    //         const paramsArray = params.split(",");
    //         breakpoint.value = paramsArray[0];
    //         breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
    //         breakpoint.item = item;
    //         breakpointsArray.push(breakpoint);
    //     });

    //     // отримую унікальні брейкпоінти
    //     // певним чином переробляю breakpointsArray
    //     let mediaQueries = breakpointsArray.map(function (item) {
    //         return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
    //     });
    //     mediaQueries = mediaQueries.filter(function (item, index, self) {
    //         return self.indexOf(item) === index;
    //     });

    //     // робота з кожним брейкпоінтом
    //     mediaQueries.forEach(breakpoint => {
    //         const paramsArray = breakpoint.split(",");
    //         const mediaBreakpoint = paramsArray[1];
    //         const mediaType = paramsArray[2];
    //         // своєрідно слухаю брейкпоінт
    //         const matchMedia = window.matchMedia(paramsArray[0]);

    //         // об'єкти з потрібними умовами
    //         const spollersArray = breakpointsArray.filter(function (item) {
    //             if (item.value === mediaBreakpoint && item.type === mediaType) {
    //                 return true;
    //             }
    //         });
    //         // подія
    //         matchMedia.addEventListener(function () {
    //             initSpollers(spollersArray, matchMedia);
    //         });
    //         initSpollers(spollersArray, matchMedia);
    //     });
    // }
    // ініціалізація
    function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia) {
                spollersBlock.classList.add('_init');
                initSpollerBody(spollersBlock);
                spollersBlock.addEventListener("click", setSpollerAction);
            } else {
                spollersBlock.classList.remove('_init');
                initSpollerBody(spollersBlock, false);
                spollersBlock.removeEventListener("click", setSpollerAction);
            }
        });
    }
    // робота з контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        // колекція заголовків спойлера
        const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
        if (spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitle => {
                if (hideSpollerBody) {
                    spollerTitle.removeAttribute('tabindex');
                    if (!spollerTitle.classList.contains('_active')) {
                        spollerTitle.nextElementSibling.hidden = true;
                    }
                } else {
                    spollerTitle.setAttribute('tabindex', '-1');
                    spollerTitle.nextElementSibling.hidden = false;
                }
            });
        }
    }
    function setSpollerAction(e) {
        // отримую натиснений об'єкт
        const el = e.target;
        if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
            const spollersBlock = spollerTitle.closest('[data-spollers]');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
            if (!spollersBlock.querySelectorAll('._slide').length) {
                if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                    hideSpollerBody(spollersBlock);
                }
                spollerTitle.classList.toggle('_active');
                _slideToggle(spollerTitle.nextElementSibling, 500);
            }
            e.preventDefault();
        }
    }
    // допоміжна функція
    function hideSpollerBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
        if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove('_active');
            _slideUp(spollerActiveTitle.nextElementSibling, 500);
        }
    }
}

// анімую об'єкти, сховані за допомогою display: none або атрибута hidden
// ============================================================================================
// SlideToggle
let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
}
let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide')
        }, duration);
    }
}
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
}
// =========================================================================================================================

// POPUP
const popupLinks = document.querySelectorAll('.popup-link');
// блокую скрол в body
const body = document.querySelector('.body');
const lockPadding = document.querySelectorAll(".lock-padding");

// для усунення подвійних натиснень
let unlock = true;

// властивість transition
const timeout = 800;

// перевірочка на існування посилань на popup-link
if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            // подія: прибираю #
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            // забороняю функції перезавантажувати сторінку
            e.preventDefault();
        });
    }
}
// закриття попапа
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}
// відкриття попапа
function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    // вираховую ширину між viewport і областю попапа (щоб не було зсуву контенту)
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    // присвоюю вирахувану ширину самому body
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    // на якийсь час лочу перемінну unlock
    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
// закриття попапа по esc
document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

// дві функції-поліфіли
(function () {
    // перевіряю підтримку старіших браузерів
    if (!Element.prototype.closest) {
        // реалізую
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();
(function () {
    // перевіряю підтримку
    if (!Element.prototype.matches) {
        // визначаю властивість
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.mozMatchesSelector;
    }
})();

// випадашка sub-menu-header
document.addEventListener("click", documentActions);

// проставлення класів відкривання підменю автоматом
const menuBlocks = document.querySelectorAll('.sub-menu-catalog__block');
if (menuBlocks.length) {
    menuBlocks.forEach(menuBlock => {
        const menuBlockItems = menuBlock.querySelectorAll('.sub-menu-catalog__category').length;
        menuBlock.classList.add('sub-menu-catalog__block_${menuBlockItems}');
    });
}

function documentActions(e) {
    const targetElement = e.target;
    if (targetElement.closest('[data-parent]')) {
        const subMenuId = targetElement.dataset.parent ? targetElement.dataset.parent : null;
        const subMenu = document.querySelector('[data-submenu="${subMenuId}"]');
        const catalogMenu = document.querySelector('.catalog-header');
        if (subMenu) {
            const activeLink = document.querySelector('._sub-menu-active');
            const activeBlock = document.querySelector('._sub-menu-open');

            if (activeLink && activeLink !== targetElement) {
                activeLink.classList.remove('._sub-menu-active');
                subMenu.classList.remove('._sub-menu-open');
            }
            targetElement.classList.toggle('_sub-menu-active');
            subMenu.classList.toggle('_sub-menu-open');
        } else {
            console.log('Йой! Йой! Упс - шото тут не то!!! О_о');
        }
        e.preventDefault();
    }
}