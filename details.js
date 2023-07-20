("use strict");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let countryname = urlParams.get("name");
let country;

const countryContainer = document.querySelector("#country-container");

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
 getCountry(countryData);
}

function getCountry(countryData) {
 countryContainer.innerHTML = "";

 displayCountry(countryData);
}

function displayCountry(countryData) {
  console.log("country:", countryData)
  const country = countryData[0];
  const borders = document.createElement("article");
  borders.id = "borders-container";


  const currencyValue = Object.values(country.currencies);

  const languageValue = Object.values(country.languages).join(", ");

  const nativeNameValue = Object.values(country.name.nativeName);

  countryContainer.innerHTML = `
        <img src="${country.flags.svg}" alt="${country.name.common}-flag"/>
        <div class="detailed-text">
      <div class="detailed-top-text">
        <h2>${country.name.common}</h2>
        <p>Native Name: <span>${nativeNameValue[0].common}</span></p>
        <p>Population: <span>${getNumberWithCommas(country.population)}</span></p>
        <p>Region: <span>${country.region}</span></p>
        <p>Sub Region: <span>${country.subregion}</span></p>
        <p>Capital: <span>${country.capital}</span></p>
      </div>
      <div class="detailed-bottom-text">
        <p>Top Level Domain: <span>${country.tld}</span></p>
        <p>Currencies:<span> ${currencyValue[0].name}</span></p>
        <p>Languages:<span> ${languageValue}</span></p>
      </div>
`;

  const borderHeading = document.createElement("h4");
  borderHeading.textContent = "Border Countries:";
  borders.appendChild(borderHeading);

  const borderElementsContainer = document.createElement("div");
  borderElementsContainer.className = "border-elements-container";

  console.log( "borders:", country.borders)
  if (typeof country.borders === "undefined") {
   borders.innerHTML = `
      <h4>Border Countries:</h4>
      <div class="no-borders">This country has no border countries</div>
      `;
  } else {
   country.borders.forEach((element) => {
    const borderElement = document.createElement("div");
    borderElement.className = "border";
    borderElement.textContent = element;
    borderElementsContainer.appendChild(borderElement);
   });
  }

  borders.appendChild(borderElementsContainer);

  countryContainer.appendChild(borders);

 const bordersel = document.querySelectorAll(".border");

 bordersel.forEach((border) => {
  border.addEventListener("click", () => getSpecifikCountry(border.textContent));
 });
}

function getNumberWithCommas(x) {
 return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
}
