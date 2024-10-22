const cardContainer = document.querySelector('.card-container');
let allCountryData;
fetch('https://restcountries.com/v3.1/all')
  .then((res) => {
    return res.json();
  })
 
  .then((data)=>{
    allCountryData = data;
    renderCountries(data)
  })
  
 

  const darkMode= document.querySelector('.dark-mode-box')
darkMode.addEventListener('click', ()=>{
    document.querySelector('body').classList.toggle('dark-mode')
    const cardText= document.querySelectorAll('.card-text')
    cardText.forEach((card)=>{
      card.classList.toggle('dark-active')
    })
})


const inputSearch= document.querySelector('.search-section input')
inputSearch.addEventListener('input', (e)=>{
  
  const filterByInput= e.target.value;
      let filteredCountryData=   allCountryData.filter((country)=>{
       
       return  country.name.common.toLowerCase().includes(e.target.value.toLowerCase());
        
  })

  renderCountries(filteredCountryData)
  
});
  


const regionSearch= document.querySelector('.filter-by-reg')

regionSearch.addEventListener('change', (e)=>{

  
  const region = e.target.value;
  


  fetch(`https://restcountries.com/v3.1/region/${region}`)
  .then((res) => {
    return res.json();
  })
  .then(renderCountries)  

});




// create function******************************


function renderCountries(countries){
  cardContainer.innerHTML='';
 let i=1;
    countries.forEach((country) => {
   
      // console.log(i);
      
      
      const card = document.createElement('a');
      card.classList.add('card');
      card.href = `./countryDetails.html?name=${country.name.common}`;

      const cardHTML = `
<img   src="${country.flags.svg}" alt=" ${country.flags.alt}">
  
    <div class="card-text">
      <h3>${country.name.common}</h3>
      <p class="population"><b>Population:</b> ${country.population.toLocaleString(
        'en-IN'
      )} </p>
      <p class="religion"><b>Region:</b> ${country.region} </p>
      <p class="capital"><b>Capital:</b>  ${country.capital} </p>
    </div>

`;
      card.innerHTML = cardHTML;

      cardContainer.append(card);
      i++
    });
  };