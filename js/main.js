// Модальное окно
const modals = document.querySelectorAll('.modal');
const popup = document.querySelector('.popup');
let modalName;
let scrollPosition;

function disableBodyScroll() {
    if (typeof scrollPosition === 'undefined') {
        // Сохраняем текущую позицию прокрутки только при первом открытии модального окна
        scrollPosition = window.scrollY || window.pageYOffset;

        // Добавляем класс для блокировки прокрутки
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
    }
}

function enableBodyScroll() {
    // Для закрытия модального окна, восстанавливаем прокрутку только если позиция была сохранена
    if (typeof scrollPosition !== 'undefined') {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, scrollPosition);

        // Сбрасываем сохраненную позицию прокрутки
        scrollPosition = undefined;
    }
}
// Клик вне .popup
document.addEventListener('mouseup', function (e) {
    const popups = document.querySelectorAll('.popup');

    popups.forEach(popup => {
        const modal = popup.closest('.modal'); // Получаем ближайший родитель .modal для текущего .popup

        // Проверяем наличие .active у родителя .modal
        if (modal && modal.classList.contains('active')) {
            if (!popup.contains(e.target)) {
                closeModal();
            }
        }
    });
});


// Открыть модальное окно
function openModal(modalName) {
    let modal = document.getElementById(modalName);
    modal.classList.add("active");
    disableBodyScroll();

    
}

// Переключить модальное окно
let modal1, modal2;
function changeModal(modal1, modal2) {
    let openingModal = document.getElementById(modal2);
    let closingModal = document.getElementById(modal1);
    openingModal.classList.add("active");
    closingModal.classList.remove("active");

}

// Закрыть модальное окно
function closeModal() {
    
    modals.forEach(function(item) {
        item.classList.remove("active");
    })
    enableBodyScroll();
}

// Input маски
let phoneInputs = document.querySelectorAll('input[type="tel"]');
if (phoneInputs) {
    Inputmask({"mask": "+7 (999) 999-99-99"}).mask(phoneInputs);
}

let verifyInputs = document.querySelectorAll('.verify-input');
if (verifyInputs) {
    Inputmask("9 9 9 9 9", {placeholder: "-"}).mask(verifyInputs);
}

let seriesInput = document.getElementById('passport-series');
if (seriesInput) {
    Inputmask({"mask": "99 99"}).mask(seriesInput);
}

let numberInput = document.getElementById('passport-number');
if (numberInput) {
    Inputmask({"mask": "99 99 99"}).mask(numberInput);

}

let dateInputs = document.querySelectorAll('.masked-date');
if (dateInputs) {
    Inputmask({"mask": "99.99.9999"}).mask(dateInputs);
}

let codeInput = document.getElementById('passport-code');
if (codeInput) {
    Inputmask({"mask": "999-999"}).mask(codeInput);
}

let incomeInput = document.getElementById('reg-income');
if (incomeInput) {
    Inputmask({
        alias: 'numeric',
        groupSeparator: ' ',
        autoGroup: true,
        rightAlign: false,
        allowPlus: false,
        allowMinus: false,
        suffix: ' ₽',
        digits: 0
    }).mask(incomeInput);
}

let accountPays = document.querySelectorAll('.account-pay');

if (accountPays) {
    Inputmask({
        alias: 'numeric',
        groupSeparator: ' ',
        autoGroup: true,
        rightAlign: false,
        allowPlus: false,
        allowMinus: false,
        suffix: ' ₽',
        digits: 0
    }).mask(accountPays);
}

// Таймер на странице верификации

const smsTimer = document.getElementById('sms-timer');
const timerBlock = document.querySelector('.timer-block');
let timerCount = 59;
let timerInterval;

function updateTimer() {
    if (timerCount >= 0) {
        smsTimer.textContent = timerCount < 10 ? '0' + timerCount : timerCount;
        timerCount--;
    } else {
        timerBlock.style.display = 'none';
        clearInterval(timerInterval);
    }
}

if (smsTimer) {
    timerInterval = setInterval(updateTimer, 1000);

    function sendSms() {
        timerCount = 59;
        timerInterval = setInterval(updateTimer, 1000);
        timerBlock.style.display = 'inline';
    }
}


// Звезды рейтнга (оценка сервиса)
const ratingItems = document.querySelectorAll('.rating__item');
const sendRatingBtn = document.getElementById('send-rating');
let rating = 0;
let tipsValue = 0;
let lastActiveIndex = -1;

ratingItems.forEach(function(item, index) {
    item.addEventListener('mouseenter', function() {
        for (let i = 0; i <= index; i++) {
            ratingItems[i].classList.add('active');
        }
        
    });

    item.addEventListener('mouseleave', function() {
        ratingItems.forEach(function(item) {
            item.classList.remove('active');
        });
        if (lastActiveIndex !== -1) {
            for (let i = 0; i <= lastActiveIndex; i++) {
                ratingItems[i].classList.add('active');
            }
        }
    });

    item.addEventListener('click', function() {
        lastActiveIndex = index;
        rating = item.getAttribute("data-rate");
        sendRatingBtn.classList.remove('btn-disabled');
        ratingItems.forEach(function(item) {
            item.classList.remove('active');
        });
        for (let i = 0; i <= index; i++) {
            ratingItems[i].classList.add('active');
        }
    });
});


// Чаевые

const tipsItems = document.querySelectorAll('.tips__item');

if(tipsItems) {
    tipsItems.forEach(function(tip) {
        tip.addEventListener('click', function() {
            tipsItems.forEach(function(tip) {
                tip.classList.remove('active');
            });
            if (!tip.classList.contains("checked")) {
                tip.classList.add('active','checked');
                tipsValue = tip.getAttribute('data-tip');
            } else {
                tip.classList.remove('active','checked');
                tipsValue = 0;
            }
        });
    });
}

// Вывод значения оценки и чаевых (просто в консоль)
if (sendRatingBtn) {
    sendRatingBtn.addEventListener('click', function () {
        console.log('rating: ', rating);
        console.log('tipsValue: ', tipsValue);
    })
}


// Для input type=range

const inputRange = document.querySelector('input[type="range"]');

if (inputRange) {

    for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
        e.style.setProperty('--value', e.value);
        e.style.setProperty('--min', e.min == '' ? '0' : e.min);
        e.style.setProperty('--max', e.max == '' ? '100' : e.max);
        e.addEventListener('input', () => e.style.setProperty('--value', e.value));
    }


    // Калькулятор
    const calculators = document.querySelectorAll('.calculator');

    calculators.forEach(calculator => {
        // Ползунок - выбор суммы
        let sumSliders = calculator.querySelectorAll('.sum-slider');

        sumSliders.forEach(sumSlider => {
            let rangeInput = sumSlider.querySelector('input');
    
            function updateSum() {
                
                let sumResults = calculator.querySelectorAll('.result-sum');
                let formattedValue = parseFloat(rangeInput.value).toLocaleString('ru-RU');

                sumResults.forEach(function (sumResult) {
                    sumResult.textContent = formattedValue + " ₽";
                })
            }
        
            rangeInput.addEventListener('input', updateSum);
            updateSum();
        } )

        // Ползунок - выбор кол-ва дней
        let termSliders = calculator.querySelectorAll('.term-slider');

        termSliders.forEach(termSlider => {
            let rangeInput = termSlider.querySelector('input');

            function updateTerm() {
                let calcDays = calculator.querySelector(".calc-days");
                let dateResults = calculator.querySelectorAll(".result-date");
                let value = rangeInput.value;
                let today = new Date();
                let futureDate = new Date(today.getTime() + value * 24 * 60 * 60 * 1000);

                let day = futureDate.getDate();
                let month = futureDate.getMonth() + 1; 
                let year = futureDate.getFullYear().toString().substr(2,2);
                if (day < 10) {
                    day = '0' + day;
                }
                if (month < 10) {
                    month = '0' + month;
                }
                let formattedDate = day + '.' + month + '.' + year;

                let lastDigit = value % 10;
                let termText;
                if (value > 10 && value < 20) {
                    termText = "дней";
                } else if (lastDigit === 1) {
                    termText = "день";
                } else if (lastDigit >= 2 && lastDigit <= 4) {
                    termText = "дня";
                } else {
                    termText = "дней";
                }

                calcDays.textContent = value + " " + termText;
                dateResults.forEach(function (dateResult) {
                    dateResult.textContent = formattedDate;
                });
            }

            rangeInput.addEventListener('input', updateTerm);
            updateTerm();

        })
    })

}

// faq на главной
const questions = document.querySelectorAll('.faq__question');
const answers = document.querySelectorAll('.faq__answer');

if (questions) {
    questions.forEach(function(question) {
        question.addEventListener('click', function() {
          const toggler = this.querySelector('.burger-toggler');
          const answer = this.nextElementSibling;
    
          if (answer.classList.contains('opened')) {
            answer.classList.remove('opened');
            toggler.classList.remove('active');
          } else {
            answers.forEach(function(answer) {
              answer.classList.remove('opened');
            });
    
            answer.classList.add('opened');
    
            document.querySelectorAll('.burger-toggler').forEach(function(toggler) {
              toggler.classList.remove('active');
            });
    
            toggler.classList.add('active');
          }
        });
    });
}


// Бургер меню 

const mobNavToggler = document.querySelector('.mob-nav-toggler');
const headerNav = document.querySelector('.header__nav');

if (mobNavToggler) {
    mobNavToggler.addEventListener('click', function() {
        this.classList.toggle('active');
        headerNav.classList.toggle('opened');
    });
}

// сообщение в нижнем углу

const cornerMessage = document.querySelector('.corner-tip__message');
const closeMessage =  document.querySelector('.close-message');

if(cornerMessage) {
    setTimeout(() => {
        cornerMessage.classList.add('show');
    }, 2000);
    closeMessage.addEventListener('click', function() {
        cornerMessage.classList.remove('show')
    })
}


// переключение вкладок в Личном Кабинете

const promoTogglers = document.querySelectorAll('.promo-settings__item');
const promoTabs = document.querySelectorAll('.promo-tab');


if(promoTabs) {
    promoTogglers.forEach(function(promoToggler) {
    
        promoToggler.addEventListener('click', function () {
            promoTogglers.forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            
            let promoTogglerData = promoToggler.getAttribute('data-tab');
            for(let p = 0; p<=promoTabs.length-1; p++){
                promoTabs[p].classList.remove('active');
                if (promoTabs[p].getAttribute('data-tab') == promoTogglerData) {
                    promoTabs[p].classList.add('active');
                }
            }
        })
    })
}

// Показ всего списка faq на главной

const showAllBtn = document.querySelector('.show-all');
const tabs = document.querySelectorAll('.tab-pane');
let tabsOpened = false;

if(showAllBtn){
    tabs.forEach(function(tab) {
        let tabItems = tab.querySelectorAll('.info-tabs__item');
        for(let t=0; t<=tabItems.length-1; t++) {
            if (t>5) {
                tabItems[t].classList.add('hiding', 'hidden');
            }
        }
    })
        
    showAllBtn.addEventListener('click', function() {
        let hiddenElements = document.querySelectorAll('.hiding');
        if (!tabsOpened) {
            tabsOpened = true;
            hiddenElements.forEach(function(hiddenItem) {
                hiddenItem.classList.remove('hidden')
            })
            showAllBtn.textContent = 'Свернуть';
        } else {
            tabsOpened = false;
            hiddenElements.forEach(function(hiddenItem) {
                hiddenItem.classList.add('hidden');
            })
        }
    })
}

// Показ дополнительных опций в калькуляторе на лендинге

const rulesShow = document.querySelector('.show-rules');
const rulesHide = document.querySelector('.hide-rules');
const hiddenCheckbox = document.querySelector('.hidden-checkbox');

if (rulesShow) {
    rulesShow.addEventListener('click', function () {
        hiddenCheckbox.classList.add('show')
    });
    rulesHide.addEventListener('click', function () {
        hiddenCheckbox.classList.remove('show')
    })
}

// мобильная версия информационного аккордеона на главной

var cards = document.querySelectorAll('.main-info-mobile__card');

if (cards) {
    cards.forEach(function(card) {
        var title = card.querySelector('.main-info-mobile__title');
        
        title.addEventListener('click', function() {
            if (!card.classList.contains('opened')) {
            cards.forEach(function(item) {
                if (item !== card) {
                item.classList.remove('opened');
                }
            });
            card.classList.add('opened');
            } else {
            card.classList.remove('opened');
            }
        });
    });
}

// Одинаковая высота карточек в аккаунте 

const sameWrappers = document.querySelectorAll('.same-cards');
var maxHeight = 0;
let screenWidth = window.screen.width;

if(sameWrappers) {
    sameWrappers.forEach(function (sameWrapper) {
        let sameItems = sameWrapper.querySelectorAll('.same-item');

        function cardsResize() {
            screenWidth = window.screen.width;

            if (screenWidth >= 768) {
                
                    sameItems.forEach(function(card) {
                        var cardHeight = card.getBoundingClientRect().height;
                        
                        if (cardHeight > maxHeight) {
                            maxHeight = cardHeight;
                        }
                    });
                
                    sameItems.forEach(function(card) {
                        card.style.minHeight = maxHeight + 'px';
                    });
            } 
        }
        
        
        window.addEventListener('resize', cardsResize);
        cardsResize();
    })
}


// кастомный селект (выбор карты в лк)

const customSelects = document.querySelectorAll('.custom-select');

if (customSelects) {
    customSelects.forEach(function(customSelect) {
        let customSelectToggler = customSelect.querySelector('.custom-select__head');
        let customSelectResult = customSelect.querySelector('.custom-select__result');
        let customSelectOptions = customSelect.querySelectorAll('.custom-option');
        console.log('customSelectOptions: ', customSelectOptions);
        
        customSelectToggler.addEventListener('click', function() {
            this.parentNode.classList.toggle('active')
        })

        customSelectOptions.forEach(function(customSelectOption) {
            customSelectOption.addEventListener('click', function() {
                let customValue = customSelectOption.querySelector('.custom-select__value').textContent;
                console.log('customValue: ', customValue);
                customSelectOptions.forEach(function(item) {
                    item.removeAttribute('selected');
                })
                this.setAttribute('selected', '');
                customSelectResult.textContent = customValue;
                customSelect.classList.remove('active');
            })
        })
    })
}

const accountSlider = document.querySelector('.account-slider');
const accountSliderMob = document.querySelector('.account-slider-mob');

if (accountSlider) {
    const accountSwiper = new Swiper('.account-slider', {
        spaceBetween: 30,
        // Navigation arrows
        navigation: {
            nextEl: '.slider-next',
            prevEl: '.slider-prev',
        },

        pagination: {
            el: '.slider-counter',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
                return '<div class="current-slide ' + currentClass + '"></div>' +
                    ' <div class="line"></div> ' +
                    '<div class=" total-slide ' + totalClass + '"></div>';
            },
        },
    });
}

if (accountSliderMob) {
    const accountSwiperMob = new Swiper('.account-slider-mob', {
        spaceBetween: 30,
        // Navigation arrows
        navigation: {
            nextEl: '.slider-next-mob',
            prevEl: '.slider-prev-mob',
        },
        pagination: {
            el: '.slider-counter',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
                return '<div class="current-slide ' + currentClass + '"></div>' +
                    ' <div class="line"></div> ' +
                    '<div class=" total-slide ' + totalClass + '"></div>';
            },
        },
    });
}



// переключение вкладок c инфой на главной

const tabsContainers = document.querySelectorAll('.tabs');

var navLinks = document.querySelectorAll('.tabs .nav-tabs .nav-link');

if (tabsContainers) {

    tabsContainers.forEach(function(tabsContainer) {
        var navLinks = tabsContainer.querySelectorAll('.nav-tabs .nav-link');
        navLinks.forEach(function (navLink) {
            navLink.addEventListener('click', function (event) {
                event.preventDefault(); 
                
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
                var targetId = navLink.getAttribute('id');
                var tabPanes = tabsContainer.querySelectorAll('.tab-content .tab-pane');
                tabPanes.forEach(function (tabPane) {
                    tabPane.classList.remove('active');
                    var ariaLabelledBy = tabPane.getAttribute('aria-labelledby');
                    if (ariaLabelledBy === targetId) {
                        tabPane.classList.add('active');
                    }
                });
            });
        });
    })
}


// Открытие графика платежей

const scheduleButton = document.querySelector('.schedule-btn');
const scheduleModal = document.querySelector('.schedule-modal');
const scheduleClose = document.querySelector('.schedule-close');

if(scheduleButton) {
    scheduleButton.addEventListener('click', function () {
        scheduleModal.classList.add('active');
    });
    scheduleClose.addEventListener('click', function () {
        scheduleModal.classList.remove('active');
    })
}


let timer;

function startEmailTimer() {
    clearInterval(timer); // Остановка предыдущего таймера, если он существует

    let seconds = 59;
    const button = document.querySelector('.popup-email-button');
    button.classList.add('btn-disabled');
    // Функция обновления таймера
    function updateTimer() {
        const timerElement = document.querySelector('.popup-timer');
        

        if (seconds >= 0) {
            const secondsText = getSecondsText(seconds);
            timerElement.textContent = seconds + ' ' + secondsText;
            seconds--;
        } else {
            clearInterval(timer);
            button.classList.remove('btn-disabled');
        }
    }

    updateTimer();

    timer = setInterval(updateTimer, 1000);
}


// Функция определения правильного окончания для слова "секунда"
function getSecondsText(seconds) {
    if (seconds === 1 || (seconds > 20 && seconds % 10 === 1)) {
        return 'секунда';
    } else if ((seconds >= 2 && seconds <= 4) || (seconds > 20 && seconds % 10 >= 2 && seconds % 10 <= 4)) {
        return 'секунды';
    } else {
        return 'секунд';
    }
}

// Обработчик клика по кнопке

const popupEmailButton = document.querySelector('.popup-email-button');

if (popupEmailButton) {
    popupEmailButton.addEventListener('click', function () {
        if (!this.classList.contains('btn-disabled')) {
            this.classList.add('btn-disabled');
            startEmailTimer();
        }
    });
}


const hintedInputs = document.querySelectorAll('.js-hinted-input');

if(hintedInputs) {

    hintedInputs.forEach(function(hintedInput) {
        var input = hintedInput.querySelector('input');
        var inputHint = hintedInput.querySelector('.input-hint');

        input.addEventListener('focus', function() {
            inputHint.classList.add('active');
        });

        input.addEventListener('blur', function() {
            inputHint.classList.remove('active');
        });
    });

}

// Показ/скрытие поля password

let formInputs = document.querySelectorAll('.form-input');

if(formInputs) {
    formInputs.forEach(function(formInput) {
        var showPassword = formInput.querySelector('.show-password'); 
        var input = formInput.querySelector('input[type="password"]');

        showPassword.addEventListener('click', function() {
            if (input.type === 'password') {
                input.type = 'text';
            } else {
                input.type = 'password';
            }
        });
    });
}

// Проверка соответствия паролей и отправка данных


// Находим элементы и блоки на странице
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');
    const popupPasswordButton = document.querySelector('.popup-password-button');
    const inputErrors = document.querySelectorAll('.input-error');

    if(newPassword) {
    // Функция для проверки заполненности полей
        function checkFields() {
            if (newPassword.value && confirmPassword.value) {
                popupPasswordButton.classList.remove('btn-disabled');
            } else {
                popupPasswordButton.classList.add('btn-disabled');
            }
        }

        // Функция для проверки совпадения паролей
        function checkPasswords() {
            if (newPassword.value !== confirmPassword.value) {
                newPassword.classList.add('error');
                confirmPassword.classList.add('error');
                inputErrors.forEach(function(error) {
                    error.classList.add('active');
                });
            } else {
                newPassword.classList.remove('error');
                confirmPassword.classList.remove('error');
                newPassword.value = '';
                confirmPassword.value = '';
                inputErrors.forEach(function(error) {
                    error.classList.remove('active');
                });
                changeModal('set-password-modal', 'password-success-modal')
            }
        }

        // Обработчики событий для полей паролей и кнопки
        newPassword.addEventListener('input', checkFields);
        confirmPassword.addEventListener('input', checkFields);
        popupPasswordButton.addEventListener('click', function(event) {
            event.preventDefault(); // Отменяем стандартное поведение кнопки
            checkPasswords(); // Проверяем совпадение паролей
        });


        // Проверка пароля на наличие латинских букв и цифр

        function checkPasswordOnBlur() {
            var password = newPassword.value;
            
            var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            
            if (regex.test(password)) {
                newPassword.classList.remove('error');
            } else {
                newPassword.classList.add('error');
            }
        }

        newPassword.addEventListener('blur', checkPasswordOnBlur);
    }
    