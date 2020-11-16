import countryCardsTmpl from '../templates/country-cards.hbs';
import countryList from '../templates/many-countries.hbs';
import API from './api-service';
import getRefs from './get-refs';
const debounce = require('lodash.debounce');
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';


const refs = getRefs();
refs.inputForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) { 
    e.preventDefault();
    clearInputForm();
    const searchQuery = e.target.value;
    API.fetchCountries(searchQuery)
        .then(data => {
            if (data.length > 10) {
                return error({
                    text: 'Too many matches found. Please enter a more specific query!',
                    type: 'info'
                });
            } if (data.length === 1) {
                return renderCountryCard(data);
            } if (data.length > 1) {
                return renderCountryList(data);
            }
        })
        .catch(Error => console.log(Error));
}     

function renderCountryCard(country) {
    refs.description.innerHTML = countryCardsTmpl(country);
}

function renderCountryList(country) {
    refs.description.innerHTML = countryList(country);
}

function clearInputForm() {
    refs.description.innerHTML = '';
}
