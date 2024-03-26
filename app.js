window.onload = function () {
  document.getElementById('body').classList.add('loaded');
}

const elem = selector => {
  return document.querySelector(selector)
}
// SMOOTH SCROLLING --------------------
let scrollLink = $('.scroll');
scrollLink.click(function (e) {
  e.preventDefault();
  $('body,html').animate({
    scrollTop: $(this.hash).offset().top
  }, 1000);
});
// PARALLAX --------------------
let nav = elem('nav')
let introHeight = elem('.section--intro').offsetHeight
let missionOffset = elem('#mission').offsetTop - $(window).height()
let breweryOffset = elem('#brewery').offsetTop - ($(window).height() / 1.2)
let footerOffset = elem('footer').offsetTop - ($(window).height() / 4)
let beerOffset = elem('#beer').offsetTop - ($(window).height() / 1.6)

$(window).scroll(function () {
  let wScroll = $(window).scrollTop()

  // NAVIGATION
  if (wScroll > introHeight) { nav.classList.add('alone') }
  if (wScroll < introHeight) { nav.classList.remove('alone') }

  // FLOATING CARDS
  if (wScroll > missionOffset) {
    var offset = (Math.min(0, wScroll - elem('.section--mission').offsetTop + $(window).height() - 350)).toFixed();
    $('.section--mission .card').css({ 'transform': 'translate(' + offset + 'px,0)' });
  }

  if (wScroll > missionOffset) {
    var offset = (Math.min(0, wScroll - $('.section--taproom').offset().top + $(window).height() - 350)).toFixed();
    $('.section--taproom .card--img').css({ 'transform': 'translate(' + Math.abs(offset) + 'px,0)' });
  }

  // LANDING ELEMENTS
  if (wScroll > beerOffset) {elem('#beer .section__title').classList.add('is-showing');}
  if (wScroll > beerOffset - 50) {elem('#beer .section__subtitle').classList.add('is-showing');}

  if (wScroll > breweryOffset*1.2) {elem('#brewery .section__title').classList.add('is-showing');}
  if (wScroll > breweryOffset) {elem('#brewery .section__image').classList.add('is-showing');}
  if (wScroll > breweryOffset) {elem('#brewery .section__subtitle').classList.add('is-showing');}
  if (wScroll > footerOffset) {
    elem('footer .logo').classList.add('is-showing');
    // console.log('shownmf')
  }
  console.log(wScroll, footerOffset)

})
// CAROUSEL --------------------
// THE DOM STUFF
const left = document.getElementById('js-left')
const right = document.getElementById('js-right')
let list = Object.values(document.querySelectorAll('.carousel__item'))
// VARIABLES
let translate;
let length = list.length
let middleTerm = Math.ceil((length-1) / 2)
let spotlightIndex = middleTerm
let spotlight = list[spotlightIndex];
let caption = spotlight.querySelector('figcaption');
caption.style.display = 'block'
// ONCLICK FUNCTION
const clickStuff = hand => {
  caption.style.display = 'none' // REMOVE ALL CAPTIONS
  // CHENGE SPOTLIGHT INDEX WITH RESPECT TO WHERE YOU WANT TO GO
  if (hand === 'left') {
    spotlightIndex = (spotlightIndex == 0) ? (list.length - 1) : (spotlightIndex - 1);
  } else {
    spotlightIndex = (spotlightIndex == (list.length - 1)) ? 0 : (spotlightIndex + 1);
  }
  // VARAIABLES RELOADED
  spotlight = list[spotlightIndex]
  caption = spotlight.querySelector('figcaption')
  caption.style.display = 'block'
  // ANIMATION
  translate = (middleTerm-spotlightIndex)*100;
  Object.keys(list).forEach(function(key) {
    list[key].style.transform = 'translateX(' + translate + '%)';
  })
}
// EVENT LISTENERS
left.addEventListener('click', _ => clickStuff('left'))
right.addEventListener('click',  _ => clickStuff('right'))