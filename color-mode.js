("use strict");

const colorThemeBtn = document.querySelector(".dark-mode-container");

const themeIcon = document.querySelector("ion-icon");

document.addEventListener("DOMContentLoaded", setup);

function setup() {
 if (sessionStorage.getItem("mode") == "dark") {
  darkmode();
 } else {
  nodark();
 }

 colorThemeBtn.addEventListener("click", function () {
  colorThemeBtn.classList.toggle("dark-theme");
  if (colorThemeBtn.classList.contains("dark-theme")) {
   darkmode();
  } else {
   nodark();
  }
 });
}

function darkmode() {
 document.body.classList.add("dark-mode");
 colorThemeBtn.classList.add("dark-theme");
 sessionStorage.setItem("mode", "dark");
 themeIcon.setAttribute("name", "moon");
}

function nodark() {
 document.body.classList.remove("dark-mode");
 colorThemeBtn.classList.remove("dark-theme");
 sessionStorage.setItem("mode", "light");
 themeIcon.setAttribute("name", "moon-outline");
}
