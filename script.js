"use strict";

const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);
const dropdown = document.querySelectorAll(".dropdownText");
const dropdownBtn = document.querySelectorAll(".arrowColor");
const navLinks = document.querySelectorAll(".navlink");
const hamburgerMenu = document.querySelector(".hamburgerMenu");
const width600 = window.matchMedia("(max-width: 600px)");

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide-indicator");
  targetDot.classList.add("current-slide-indicator");
};

const hideShowArrow = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};

//when i click left, move slide to the left
prevButton.addEventListener("click", function () {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide-indicator");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrow(slides, prevButton, nextButton, prevIndex);
});

// when i click right, move slide to right
nextButton.addEventListener("click", function () {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide-indicator");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrow(slides, prevButton, nextButton, nextIndex);
});

//when i click the nav indicators, move to that slide

dotsNav.addEventListener("click", (e) => {
  //what indicator was clicked?
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide-indicator");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrow(slides, prevButton, nextButton, targetIndex);
});
for (let i = 0; i < dropdown.length; i++) {
  dropdownBtn[i].addEventListener("click", function () {
    dropdown[i].classList.toggle("dropdownHidden");
  });
}

hamburgerMenu.addEventListener("click", function () {
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.toggle("block");
    navLinks[i].classList.toggle("is-hidden");
  }
});

function screenTest(e) {
  if (e.matches) {
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].classList.add("is-hidden");
    }
  } else {
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].classList.remove("is-hidden");
      navLinks[i].classList.remove("block");
    }
  }
}

width600.addEventListener("change", screenTest);
