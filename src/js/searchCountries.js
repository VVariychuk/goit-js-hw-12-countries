import API from './fetchCountries';
import countriesTpl from '../templates/countries.hbs';
import searchlistTpl from '../templates/searchlist.hbs';
import getRefs from './getRefs';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/confirm/dist/PNotifyConfirm.css';


const refs = getRefs()
refs.searchInput.addEventListener('input', debounce(onSearch, 500))

const searchQuery = refs.searchInput.value

function onSearch() {
    API.fetchCountries(searchQuery)
    .then(renderSearch)
    .catch(err =>
      console.log('%c Empty input! or Nothing matched!', 'color: chocolate'),)
}

function onPNotifyError() {
  error({
    title: 'Too many countries found. Please enter a more specific query.',
    width: '320px',
    delay: '2000',
  });
}

function renderSearch(responce) {
    if (responce.length > 6) {
        onPNotifyError
    }
    if (responce.length < 6 && response.length >= 2) {
        return renderSearchList
    }
    if (responce.length === 1){
        return renderCountrie
    }
    
 }

function renderCountrie(coutrie) {
    const markup = countriesTpl(coutrie)
    refs.cardContainer.innerHtml = markup
}
 
function renderSearchList(countries) {
    const markup = searchlistTpl(countries)
    refs.cardContainer.innerHtml = markup
}