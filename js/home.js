// Setup section scroll
gsap.registerPlugin(Observer);

const isInitialLanding = window.performance.navigation.type === 1
  || document.referrer === ''
  || document.referrer === window.location.href;

let sections = document.querySelectorAll('section'),
  backgrounds = document.querySelectorAll('section .bg'),
  outerWrappers = gsap.utils.toArray('section .outer'),
  innerWrappers = gsap.utils.toArray('section .inner'),
  backgroundWrappers = gsap.utils.toArray('section .bg'),
  containerWrappers = gsap.utils.toArray('section .container'),
  sectionDots = document.querySelectorAll('.section-dot'),
  currentIndex = isInitialLanding ? -1 : 0,
  animating = false;

gsap.set(outerWrappers, { yPercent: 100 });
gsap.set(innerWrappers, { yPercent: -100 });
gsap.set(backgroundWrappers, { backgroundColor: '#F5F5F5' });
gsap.set(containerWrappers, { autoAlpha: 0 });

function gotoSection(index, direction) {
  if (index < 0 || index >= sections.length || animating) return;

  animating = true;
  let fromTop = direction === -1,
    dFactor = fromTop ? -1 : 1,
    tl = gsap.timeline({
      defaults: { duration: 0.9, ease: 'power1.inOut' },
      onComplete: () => animating = false
    });

  if (currentIndex >= 0) {
    gsap.set(sections[currentIndex], { zIndex: 0 });
    tl.to(backgrounds[currentIndex], { yPercent: -15 * dFactor })
      .set(sections[currentIndex], { autoAlpha: 0 });

    sectionDots[currentIndex].classList.remove('active');
  }

  gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });

  tl.fromTo([outerWrappers[index], innerWrappers[index]], {
    yPercent: i => i ? -100 * dFactor : 100 * dFactor
  }, {
    yPercent: 0
  }, 0)
    .fromTo(backgrounds[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
    .fromTo(sections[index].querySelector('.container'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, '-=0.5')
    .fromTo(sections[index].querySelector('.bg'), { backgroundColor: '#F5F5F5' }, { backgroundColor: '#FFFFFF', duration: 0.9 }, 0);

  sectionDots[index].classList.add('active');
  currentIndex = index;
}

let isMouseDown = false;
document.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    isMouseDown = true;
  }
});
document.addEventListener('mouseup', () => {
  isMouseDown = false;
});

Observer.create({
  type: 'wheel,touch,pointer',
  wheelSpeed: -1,
  onDown: () => {
    if (!isMouseDown && (currentIndex > 0 || currentIndex === -1)) {
      gotoSection(currentIndex - 1, -1);
    }
  },
  onUp: () => {
    if (!isMouseDown && (currentIndex < sections.length - 1)) {
      gotoSection(currentIndex + 1, 1);
    }
  },
  tolerance: 50,
  preventDefault: true
});

if (isInitialLanding) {
  setTimeout(() => {
    gotoSection(0, 1);
  }, 1800);
} else {
  gsap.set(backgroundWrappers, { backgroundColor: '#FFFFFF' });
  gsap.set(sections[0], { autoAlpha: 1, zIndex: 1 });
  gsap.set(outerWrappers[0], { yPercent: 0 });
  gsap.set(innerWrappers[0], { yPercent: 0 });
  gsap.set(containerWrappers[0], { autoAlpha: 1 });
}

// Setup BTC / SAT display
const headingContainer = document.querySelector('.heading-container');
const headings = document.querySelectorAll('.heading');
headingContainer.addEventListener('click', function () {
  const selection = window.getSelection();
    if (!selection.isCollapsed) {
    return;
  }
  const activeHeading = document.querySelector('.heading.active');
  if (activeHeading) {
    activeHeading.classList.remove('active');
  }
  const nextHeading = activeHeading && activeHeading.nextElementSibling
    ? activeHeading.nextElementSibling
    : headings[0];
  if (nextHeading) {
    nextHeading.classList.add('active');
  }
});

// Setup .info__item
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.info__item');

  items.forEach(item => {
    item.addEventListener('mouseenter', function () {
      let prev = this.previousElementSibling;
      let next = this.nextElementSibling;
      while (prev) {
        prev.classList.add('info__item--gray');
        prev = prev.previousElementSibling;
      }
      while (next) {
        next.classList.add('info__item--gray');
        next = next.nextElementSibling;
      }
    });

    item.addEventListener('mouseleave', function () {
      let prev = this.previousElementSibling;
      let next = this.nextElementSibling;
      while (prev) {
        prev.classList.remove('info__item--gray');
        prev = prev.previousElementSibling;
      }
      while (next) {
        next.classList.remove('info__item--gray');
        next = next.nextElementSibling;
      }
    });
  });
});

// Setup .landing-wordmark
const landingWordMark = document.querySelector('.landing-wordmark');
if (!isInitialLanding) {
  landingWordMark.classList.add('is-hidden');
} else {
  landingWordMark.classList.remove('is-hidden');
}

// Setup .footer__copyrights a
document.querySelectorAll('.footer__copyrights a').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.parentElement.classList.add('gray');
  });
  link.addEventListener('mouseleave', () => {
    link.parentElement.classList.remove('gray');
  });
});
