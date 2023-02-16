"use strict";

document.addEventListener("DOMContentLoaded", documentReady);

let filterOption;
let countriesArray = [];
let filteredCountries = [];

const loopContainer = document.querySelector("#countries-container");
const searchInput = document.querySelector("#search-input");
const dropdownContent = document.querySelector(".dropdown-content");

function documentReady() {
 document.querySelector(".dropbtn_region").addEventListener("click", displayDropdown);

 searchInput.addEventListener("input", displaySearchCountries);

 const filterButtons = document.querySelectorAll(".filter_region");

 filterButtons.forEach((filterButton) => {
  filterButton.addEventListener("click", getFilterValue);
 });

 getData();
}

function getFilterValue(e) {
 dropdownContent.classList.toggle("flex");
 filterOption = e.target.getAttribute("data-filter");

 const regionBtn = document.querySelector(".dropbtn_region");

 if (filterOption != "*") {
  filteredCountries = countriesArray.filter((country) => country.region === filterOption);
  regionBtn.textContent = `Filter: ${filterOption}`;
  displayCountries(filteredCountries);
 } else {
  countriesArray = countriesArray.filter((country) => country.region > "*");
  regionBtn.textContent = `Filter: All`;
  displayCountries(countriesArray);
 }
 console.log(filteredCountries);
}

async function getData() {
 let countriesData;
 const url = "https://restcountries.com/v3.1/all";
 let data = await fetch(url);
 countriesData = await data.json();
 getCountries(countriesData);
}

function getCountries(allCountries) {
 allCountries.forEach((country) => {
  countriesArray.push(country);
 });

 displayCountries(countriesArray);
}

function displayCountries(countries) {
 loopContainer.innerHTML = "";
 countries.forEach((country) => {
  const countryEl = document.createElement("article");
  countryEl.className = "country-element";
  countryEl.innerHTML = `
         
            <img src="${country.flags.png}" alt=" ${country.name.common}" />
            <div class="country-text">
              <h3>${country.name.common}</h3>
              <p>Population: <span>${getNumberWithCommas(country.population)}</span></p>
              <p>Region: <span>${country.region}</span></p>
              <p>Capital: <span>${country.capital}</span></p>
            </div>

                `;
  countryEl.addEventListener("click", () => showCountryDetails(country));
  loopContainer.appendChild(countryEl);
 });
}

function showCountryDetails(country) {
 location.href = "country-details.html?name=" + country.cca3;
}

function displayDropdown() {
 dropdownContent.classList.toggle("flex");

 if (dropdownContent.classList.contains("flex")) {
  window.addEventListener("click", function (event) {
   var myBox = document.querySelector(".dropbtn_region");

   if (event.target.contains(myBox) && event.target !== myBox) {
    dropdownContent.classList.remove("flex");
   } else {
    return;
   }
  });
 }
}

function displaySearchCountries() {
 let filterSearch = getSearchVal();

 displayCountries(filterSearch);
}

// Returning functions ::

function getSearchVal() {
 const regionFilterBtn = document.querySelector(".dropbtn_region");
 const inputFieldValue = document.querySelector("#search-input").value;

 let filterSetting = inputFieldValue.charAt(0).toUpperCase() + inputFieldValue.slice(1).toLowerCase().trim();

 let result;

 if (regionFilterBtn.textContent === "Filter by region") {
  result = countriesArray.filter(function (country) {
   return country.name.common.slice(0, filterSetting.length) == filterSetting;
  });
 } else {
  result = filteredCountries.filter(function (country) {
   return country.name.common.slice(0, filterSetting.length) == filterSetting;
  });
 }

 const emptyMessage = document.querySelector(".empty-message");
 if (result.length === 0) {
  emptyMessage.innerHTML = `<span>No results matches <span class="search-value">${filterSetting}</span></span>`;
 } else if (result.length > 0) {
  emptyMessage.innerHTML = "";
 }

 return result;
}

function getNumberWithCommas(x) {
 return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
}
