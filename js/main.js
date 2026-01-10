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
    }, 100);
  });

  menu.addEventListener('mouseleave', () => {
    setTimeout(() => {
      if (!item.matches(':hover') && !menu.matches(':hover')) {
        menu.style.display = 'none';
      }
    }, 100);
  });
});


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

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.classList.add('header_scrollbackground');
  } else {
    header.classList.remove('header_scrollbackground');
  }
});

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
        console.log(res);
        that.value = that.value.replace(res, '');
    }, 0);
});


