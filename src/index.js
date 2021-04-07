import './styles.css';
import API from './js/fetchCountries';
import countriesTpl from './templates/countries.hbs';
import searchlistTpl from './templates/searchlist.hbs';
import getRefs from './js/getRefs';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/confirm/dist/PNotifyConfirm.css';


const refs = getRefs()
refs.searchInput.addEventListener('input', debounce(onSearch, 500))

function onSearch(e) {     
    const searchQuery = e.target.value;
    API.fetchCountries(searchQuery)
    .then(renderSearch)
    .catch(err =>
      console.error('%c Empty input! or Nothing matched!', 'color: chocolate'))
}

function onPNotifyError() {
  error({
    title: 'Too many countries found. Please enter a more specific query.',
    width: '320px',
    delay: '2000',
  });
}

function renderSearch(response) {
    console.log();
    if (response.length >= 6) {
        console.log(
          '%c Too many countries found. Please enter a more specific query',
            'color: tomato')
        refs.cardContainer.innerHTML = ''
        onPNotifyError()
        return response
    }
    if (response.length < 6 && response.length >= 2) {
        refs.cardContainer.innerHTML = ''
        renderSearchList(response)
    }
    if (response.length === 1) {
        refs.cardContainer.innerHTML = ''
        console.log(`%c Your checked country is:  ${response[0].name}`, 'color: green');
        renderCountrie(response)
    }
    
 }

function renderCountrie(coutrie) {
    const markup = countriesTpl(coutrie)    
    refs.cardContainer.innerHTML = markup
}
 
function renderSearchList(countries) {
    const markup = searchlistTpl(countries)
    refs.cardContainer.innerHTML = markup
}
