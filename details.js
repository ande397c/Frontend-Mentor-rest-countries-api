("use strict");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let countryname = urlParams.get("name");
let country;

const countryContainer = document.querySelector("#country-container");
const borderContainer = document.querySelector("#borders-container");

document.addEventListener("DOMContentLoaded", documentReady);

function documentReady() {
 const backButton = document.querySelector("#back_btn");

 backButton.addEventListener("click", () => {
  window.history.back();
 });

 getSpecifikCountry(countryname);
}

async function getSpecifikCountry(countryname) {
 const url = `https://restcountries.com/v3.1/alpha/${countryname}`;
 let data = await fetch(url);
 countryData = await data.json();
 console.log(countryData);
 getCountry(countryData);
}

function getCountry(countryData) {
 countryContainer.innerHTML = "";

 displayCountry(countryData);
}

function displayCountry(country) {
 country.forEach((element) => {
  const borders = document.createElement("article");
  borders.id = "borders-container";

  // Get custom currency and language values

  const currencyObject = element.currencies;
  const currencyValue = Object.values(currencyObject);

  const languageObject = element.languages;
  const languageValue = Object.values(languageObject).join(", ");

  const nameObject = element.name.nativeName;
  const nativeNameValue = Object.values(nameObject);

  countryContainer.innerHTML = `
        <img src="${element.flags.svg}" alt="${element.name}-flag/>
        <div class="detailed-text">
      <div class="detailed-top-text">
        <h2>${element.name.common}</h2>
        <p>Native Name: <span>${nativeNameValue[0].common}</span></p>
        <p>Population: <span>${getNumberWithCommas(element.population)}</span></p>
        <p>Region: <span>${element.region}</span></p>
        <p>Sub Region: <span>${element.subregion}</span></p>
        <p>Capital: <span>${element.capital}</span></p>
      </div>
      <div class="detailed-bottom-text">
        <p>Top Level Domain: <span>${element.tld}</span></p>
        <p>Currencies:<span> ${currencyValue[0].name}</span></p>
        <p>Languages:<span> ${languageValue}</span></p>
      </div>
`;

  const borderHeading = document.createElement("h4");
  borderHeading.textContent = "Border Countries:";
  borders.appendChild(borderHeading);

  const borderElementsContainer = document.createElement("div");
  borderElementsContainer.className = "border-elements-container";

  if (typeof country[0].borders === "undefined") {
   borders.innerHTML = `
        <h4>Border Countries:</h4>
      <div class="no-borders">This country has no borders</div>
      `;
  } else {
   element.borders.forEach((element) => {
    const borderElement = document.createElement("div");
    borderElement.className = "border";
    borderElement.textContent = element;
    borderElementsContainer.appendChild(borderElement);
   });
  }

  borders.appendChild(borderElementsContainer);

  countryContainer.appendChild(borders);
 });

 const borders = document.querySelectorAll(".border");

 borders.forEach((border) => {
  border.addEventListener("click", () => getSpecifikCountry(border.textContent));
 });
}

function getNumberWithCommas(x) {
 return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
}
