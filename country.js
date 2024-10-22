const cardDetailsContainer = document.querySelector('.card-details-container');
const countryImg = document.querySelector('.country-img img');
const countryNameEl = document.querySelector('.country-name');
const nativeName = document.querySelector('.native-name');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const subRegion = document.querySelector('.sub-region');
const capital = document.querySelector('.capital');
const topLevelDomain = document.querySelector('.top-level-domain');
const currencies = document.querySelector('.currencies');
const languages = document.querySelector('.languages');
const borderCountry = document.querySelector('.border-country');
const countryName = new URLSearchParams(location.search).get('name');

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    // console.log(country);
    // console.log(country.population);

    console.log();
    countryImg.src = country.flags.svg;
    countryNameEl.innerText = country.name.common;

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }

    population.innerText = country.population.toLocaleString();
    region.innerText = country.region;

    if (country.subregion) {
      subRegion.innerText = country.subregion;
    } else {
      // debugger
      subRegion.parentElement.remove();
    }

    if (country.capital) {
      capital.innerText = country.capital;
    } else {
      capital.parentElement.remove();
    }

    if (country.tld) {
      topLevelDomain.innerText = country.tld.join(', ');
    } else {
      topLevelDomain.parentElement.remove();
    }

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(', ');
    } else {
      currencies.parentElement.remove();
    }

    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(', ');
    } else {
      languages.parentElement.remove();
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        let borderCountryEl = document.createElement('a');
        borderCountryEl.innerText = border;

        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([data]) => {
            let borderName;
            borderName = data.name.common;
            borderCountryEl.href = `./countryDetails.html?name=${borderName}`;
          });

        borderCountry.append(borderCountryEl);
      });
    } else {
      borderCountry.remove();
    }
  });



