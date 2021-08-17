// slider
const swiper = new Swiper('.swiper-container', {
    loop: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-arrow-next',
        prevEl: '.swiper-arrow-prev',
    },
});

swiper.on('slideChange', slide => {
    let listSlide = slide.$wrapperEl[0];
    let activeSlide = listSlide.querySelector(".swiper-slide.swiper-slide-active");
    let activeSourceText = activeSlide.getAttribute('data-source-text');
    let sourceTarget = document.querySelector('[data-source-targer]');

    sourceTarget.textContent = activeSourceText;
});

// dropdown question
let questionList = document.querySelectorAll("[data-question-item]");

questionList.forEach(i => {
    i.addEventListener('click', ev => {
        ev.target.parentElement.classList.toggle("active");
    });
});

// search modal open
let searchModalItem = document.querySelector("[data-search-modal]");

document.addEventListener('click', ev => {
    if (ev.target.closest('[data-search-modal-btn]')) {
        searchModalItem.classList.toggle("open");
    }
});

// search modal close
document.addEventListener('click', ev => {
    if (!ev.target.closest('[data-search-modal]') && !ev.target.closest('[data-search-modal-btn]')) {
        searchModalItem.classList.remove("open");
    }

    if (ev.target.closest('[data-search-modal-close]')) {
        searchModalItem.classList.remove("open");
    }
});

//dropdown
let listContainerDropdown = document.querySelectorAll("[data-dropdown-modal]");
let listDropdownShareItem = document.querySelectorAll("[data-modal-share-item]");
let listDropdownCategoryItem = document.querySelectorAll("[data-modal-category-item]");

listContainerDropdown.forEach(i => {
    let linkShare = i.querySelector("[data-modal-share]");
    let linkTriplets = i.querySelector("[data-modal-triplets]");

    linkShare.addEventListener('click', ev => {
        i.querySelector("[data-modal-share-item]").classList.toggle("active");
    });

    linkTriplets.addEventListener('click', ev => {
        i.querySelector("[data-modal-category-item]").classList.toggle("active");
    });

    document.addEventListener('click', ev => {
        if (!ev.target.closest('[data-modal-share-item]') && !ev.target.closest('[data-modal-category-item]') && !ev.target.closest("[data-modal-share]") && !ev.target.closest("[data-modal-triplets]")) {
            listDropdownShareItem.forEach(item => {
                item.classList.remove("active")
            });

            listDropdownCategoryItem.forEach(item => {
                item.classList.remove("active")
            });
        }
    });
});

//side menu fixed
let sideMenu = document.querySelector('.side-menu');

window.addEventListener('scroll', () => {
    if (pageYOffset > 149) {
        sideMenu.classList.add('fixed');
    } else {
        sideMenu.classList.remove('fixed');
    }
});
//side menu fixed
let locationMenu = document.querySelector('.location-menu');

window.addEventListener('scroll', () => {
    console.log(pageYOffset)
    if (pageYOffset > 15) {
        locationMenu.classList.add('box-shadow');
    } else {
        locationMenu.classList.remove('box-shadow');
    }
});