/*--------------BURGER MENU-----------------------*/

const hamb = document.querySelector("#hamb");
const popup = document.querySelector("#popup");
const close_popup = document.querySelector("#close_popup");
const sec = document.getElementsByTagName("section");

const body = document.body;
let listitembtn = document.getElementsByClassName('header_content-wrap-navmenu-list-item');



if (document.querySelector('#hamb')) {
  hamb.addEventListener("click", hambHandler);
  close_popup.addEventListener("click", hambHandler);


  function hambHandler(e) {
    e.preventDefault();
    // Переключаем стили элементов при клике
    popup.classList.toggle("open");
    hamb.classList.toggle("active");
    body.classList.toggle("noscroll");
  }

  for (let n = 0; n < listitembtn.length; n++) {
    listitembtn[n].addEventListener('click', function() {
       popup.classList.toggle("open");
       body.classList.toggle("noscroll");
    });
  }

}





if (document.documentElement.clientWidth > 1200) {
  document.querySelectorAll('.list_item_wrap').forEach(item => {
  const menu = item.querySelector('.dropdown_menu');

  item.addEventListener('mouseenter', () => {
    menu.style.display = 'flex';
  });

  item.addEventListener('mouseleave', (e) => {
    // Ждём, чтобы не скрыть меню, если курсор уходит в сам dropdown
    setTimeout(() => {
      if (!item.matches(':hover') && !menu.matches(':hover')) {
        menu.style.display = 'none';
      }
    }, 200);
  });
/*
  menu.addEventListener('mouseleave', () => {
    setTimeout(() => {
      if (!item.matches(':hover') && !menu.matches(':hover')) {
        menu.style.display = 'none';
      }
    }, 100);
  });*/
});
}







$('.firstsec_mainpage_content_slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: false,
  dots: false,
  infinite: false,
  autoplay: false
});

const header = document.querySelector('.header');
/*
window.addEventListener('scroll', () => {
  if (window.scrollY > 0 && !header.classList.contains('header_secondarypage')) {
    header.classList.add('header_scrollbackground');
  } else {
    header.classList.remove('header_scrollbackground');
  }
});*/

$('.realizedsolutionssec_mainpage_content_slider').slick({
  slidesToShow: 1.5,
  slidesToScroll: 1,
  arrows: true,
  fade: false,
  dots: false,
  infinite: false,
  variableWidth: true,
  prevArrow: $('.realizedsolutionssec_mainpage_content_slider_buttons_left'),
  nextArrow: $('.realizedsolutionssec_mainpage_content_slider_buttons_right')
});

$('.conversationssec_mainpage_content_slider').slick({
  slidesToShow: 5.5,
  slidesToScroll: 1,
  arrows: true,
  fade: false,
  dots: false,
  infinite: false,
  variableWidth: true,
  prevArrow: $('.conversationssec_mainpage_content_slider_buttons_left'),
  nextArrow: $('.conversationssec_mainpage_content_slider_buttons_right')
});


const $slider = $('.modal_kviz_form_slider');
const $prev = $('.modal_kviz_form_slider_prevbtn');
const $lastSlideBtn = $('.modal_kviz_form_slider_item_main_lastslide_btn');
const $manager_title = $('.title_manager');
const $last_slide = $('.modal_kviz_form_slider_item_main_lastslide');
console.log($last_slide);
$lastSlideBtn.addClass('hidden-btn').addClass('lastslide-hide');

$('.modal_kviz_form_slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  fade: true,
  dots: false,
  infinite: false,
  variableWidth: false,
  prevArrow: $('.modal_kviz_form_slider_prevbtn'),
  nextArrow: $('.modal_kviz_form_slider_nextbtn')
});


/*========ПЕРЕСТАНОВКА КНОПОК НА ПОСЛЕДНЕМ СЛАЙДЕ (ПОКАЗ КНОПКИ ОТПРАВКИ)====*/
function toggleButtons(current, slick) {
  const lastIndex = slick.slideCount - 1;

  if (current === lastIndex) {
    // старая кнопка уезжает вниз
    $prev.addClass('prev-hide');
    $last_slide.addClass('inputs-visible');
    // новая кнопка появляется снизу
    $lastSlideBtn.removeClass('hidden-btn lastslide-hide'); 
    $lastSlideBtn.addClass('lastslide-show'); 
    $manager_title.addClass('title_manager_flex'); 
  } else {
    // возвращаем старую кнопку
    $prev.removeClass('prev-hide');

    // новая кнопка уезжает вниз и скрывается
    $lastSlideBtn.removeClass('lastslide-show').addClass('lastslide-hide');
    setTimeout(() => $lastSlideBtn.addClass('hidden-btn'), 500); // после анимации
  }
}

// Инициализация
$slider.on('init', function(e, slick) {
  toggleButtons(slick.currentSlide, slick);
});

// При перелистывании
$slider.on('afterChange', function(e, slick, currentSlide) {
  toggleButtons(currentSlide, slick);
});

$slider.slick('setPosition');




/*========ПЕРЕСТАНОВКА КНОПОК МЕЖДУ 1 и 2 СЛАЙДАМИ(882:order: 2;)====*/

(function () {
  const $slider = $('.modal_kviz_form_slider');
  const $modal = $('.modal_kviz');
  const $prev = $('.modal_kviz_form_slider_prevbtn');
  const $next = $('.modal_kviz_form_slider_nextbtn');

  if (!$slider.length || !$slider.hasClass('slick-initialized')) return;

  function updateState(currentSlide) {
    const isFirst = currentSlide === 0;

    // запускаем плавное исчезновение
    $prev.add($next).addClass('fade');

    setTimeout(() => {
      // меняем состояние
      $slider.toggleClass('first-slide', isFirst);
      $modal.toggleClass('first-slide', isFirst);

      $prev.toggleClass('first-slide', isFirst);
      $next.toggleClass('first-slide', isFirst);

      // возвращаем кнопки
      $prev.add($next).removeClass('fade');
    }, 150); // половина анимации
  }

  // начальное состояние (без рывка)
  updateState($slider.slick('getSlick').currentSlide);

  $slider.on('afterChange', function (e, slick, currentSlide) {
    updateState(currentSlide);
  });
})();






/*========СКРЫТИЕ СОДЕРЖИМОГО ДРУГИХ СЛАЙДОВ ДЛЯ ТЕКУЩЕГО СЛАЙДА====*/

(function () {
  const $slider = $('.modal_kviz_form_slider');

  if (!$slider.length || !$slider.hasClass('slick-initialized')) return;

  function updateSlideContent() {
    $slider.find('.modal_kviz_form_slider_item').each(function () {
      const $item = $(this);
      const $main = $item.find('.modal_kviz_form_slider_item_main');

      if ($item.hasClass('slick-current')) {
        $main.show(); // показываем содержимое
      } else {
        $main.hide(); // скрываем содержимое
      }
    });
  }

  // при инициализации слайдера
  $slider.on('init', updateSlideContent);

  // при смене слайда
  $slider.on('afterChange', updateSlideContent);

  // если slick уже инициализирован, вызываем сразу
  updateSlideContent();
})();



/*========ВЫВОД РАДИОКНОПОК====*/


document.querySelectorAll('.custom-radio-group input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', () => {
  console.log(radio.id);
  });
});



if (document.querySelector('.conversationssec_mainpage_content_marquee')) {
class Marquee {
  constructor(selector, speed = 0.5) {
    this.container = document.querySelector(selector);
    this.track = this.container.querySelector('.marquee__track');
    this.speed = speed;
    this.x = 0;

    this.init();
  }

  init() {
    const items = Array.from(this.track.children);

    // 🔥 Дублируем контент, пока он не станет шире контейнера ×2
    let trackWidth = this.track.scrollWidth;
    const containerWidth = this.container.offsetWidth;

    while (trackWidth < containerWidth * 2) {
      items.forEach(item => {
        this.track.appendChild(item.cloneNode(true));
      });
      trackWidth = this.track.scrollWidth;
    }

    this.trackWidth = trackWidth;
    requestAnimationFrame(() => this.animate());
  }

  animate() {
    this.x -= this.speed;

    // 🔥 НИКАКИХ скачков — просто циклическое смещение
    if (Math.abs(this.x) >= this.trackWidth / 2) {
      this.x = 0;
    }

    this.track.style.transform = `translateX(${this.x}px)`;
    requestAnimationFrame(() => this.animate());
  }

  setSpeed(speed) {
    this.speed = speed;
  }
}

new Marquee('#marquee', 0.8);

}

window.addEventListener("DOMContentLoaded", function() {
  [].forEach.call( document.querySelectorAll('input[data-tel-input]'), function(input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) : a
          });
      i = new_value.indexOf("_");
      if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
              return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
        this.value = new_value;
      }
      if (event.type == "blur" && this.value.length < 5) {
        this.value = "";
      }
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
});

var nameInputs = document.querySelectorAll('input[data-name-input]');

$(nameInputs).on('keypress', function() {
    var that = this;

    setTimeout(function() {
        var res = /[^аА-яЯ]/g.exec(that.value);
        
        that.value = that.value.replace(res, '');
    }, 0);
});



if (document.querySelector('.firstsec_contactpage_main_title_map')) {

ymaps.ready(init);

function init() {
  const map = new ymaps.Map('map', {
    center: [54.999060, 82.821247],
    zoom: 15,
    controls: []
  }, {
    suppressMapOpenBlock: true
  });

  map.behaviors.disable([
    
   
    
  ]);

  // Кастомный layout балуна
  const BalloonLayout = ymaps.templateLayoutFactory.createClass(
    `
    <div class="custom-balloon">
      <div class="custom-balloon__logo"></div>
    </div>
    `,
    {
      build: function () {
        BalloonLayout.superclass.build.call(this);
        this._element = this.getParentElement().querySelector('.custom-balloon');
        this.applyElementOffset();
      },

      applyElementOffset: function () {
        const height = this._element.offsetHeight;
        this._element.style.marginTop = -(height + 20) + 'px';
        this._element.style.marginLeft = -(this._element.offsetWidth / 2) + 'px';
      }
    }
  );

  const placemark = new ymaps.Placemark(
    [54.997260, 82.821247],
    {},
    {
      balloonLayout: BalloonLayout,
      balloonPanelMaxMapArea: 0, // ❗ отключает панель — критично
      hideIconOnBalloonOpen: false,
      balloonOffset: [0, -10],
      autoPan: true,
      autoPanPadding: [10, 10, 10, 10],

      iconLayout: 'default#image',
      iconImageHref: 'https://example.com/logo-pin.png',
      iconImageSize: [40, 40],
      iconImageOffset: [-20, -40]
    }
  );

  map.geoObjects.add(placemark);
  placemark.balloon.open();
}


}

if (document.getElementById('form_modal_order')) {


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form_modal_order');
  const inputs = form.querySelectorAll('input[type="text"]');
  const checkbox = form.querySelector('input[type="checkbox"]');
  const button_modal = form.querySelector('.form_modal_order_btn');
  button_modal.disabled = true;
  function checkForm() {
    const inputsFilled = [...inputs].every(input => input.value.trim() !== '');
    const checkboxChecked = checkbox.checked;

    button_modal.disabled = !(inputsFilled && checkboxChecked);
  }

  // Проверка при вводе и клике
  inputs.forEach(input => input.addEventListener('input', checkForm));
  checkbox.addEventListener('change', checkForm);
});




const buyButtons = document.querySelectorAll('.modal_order_btn');
const modalOverlay = document.getElementById('modalOverlay');
const modal_buy = document.getElementById('modal_order');
const closeBtn_buy = document.getElementById('closeBtn_modal_order');
const formModalOrderBtn = document.querySelector('.form_modal_order_btn');

// Функция открытия модального окна
function openModal() {
  modalOverlay.style.pointerEvents = 'auto';
  modalOverlay.classList.add('show');
  modal_buy.classList.add('show');
  document.body.classList.add('bodynosscroll');
}

// Функция закрытия модального окна
function closeModal() {
  modal_buy.classList.remove('show');
  modalOverlay.classList.remove('show');
  document.body.classList.remove('bodynosscroll');

  setTimeout(() => {
    modalOverlay.style.pointerEvents = 'none';
  }, 300);
}

// Открытие по любой кнопке .modal_order_btn
buyButtons.forEach(button => {
  button.addEventListener('click', openModal);
});

// Закрытие по крестику
closeBtn_buy.addEventListener('click', closeModal);

// Закрытие по кнопке формы
formModalOrderBtn.addEventListener('click', (e) => {
  if (formModalOrderBtn.disabled) {
    e.preventDefault(); // на всякий случай
    return; // выходим, ничего не делаем
  }

  // если кнопка активна — выполняем действие
  closeModal();
});

// Закрытие по клику на оверлей
modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});


}





const buyButtons2 = document.querySelectorAll('.header_modalbtn');
const modalOverlay2 = document.getElementById('modalOverlay2');
const modal_kviz = document.getElementById('modal_kviz');


// Функция открытия модального окна
function openModal2() {
  modalOverlay2.style.pointerEvents = 'auto';
  modalOverlay2.classList.add('show');
  modal_kviz.classList.add('show');
  document.body.classList.add('bodynosscroll');
}

// Функция закрытия модального окна
function closeModal2() {
  modal_kviz.classList.remove('show');
  modalOverlay2.classList.remove('show');
  document.body.classList.remove('bodynosscroll');

  setTimeout(() => {
    modalOverlay2.style.pointerEvents = 'none';
  }, 300);
}

// Открытие по любой кнопке .modal_order_btn
buyButtons2.forEach(buttonsel => {
  buttonsel.addEventListener('click', openModal2);
});

// Закрытие по клику на оверлей
modalOverlay2.addEventListener('click', (event) => {
  if (event.target === modalOverlay2) {
    closeModal2();
  }
});






