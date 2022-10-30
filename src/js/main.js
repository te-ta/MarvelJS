import debounce from './components/debounce.js';
import observer from './components/observer.js';
import getUrl from './components/getUrl.js';

// will count requests
let counter = 0;

// for easier to show and hide a DOM element
const showElement = (el) => el.classList.remove('undisplay');
const hideElement = (el) => el.classList.add('undisplay');

const errorElm = document.querySelector('.error');
const loadingElm = document.querySelector('.loading');
const contentElm = document.querySelector('.content__img');
const listElm = document.querySelector('.list');
const nothingFoundElm = document.querySelector('.nothing');

// replase img url with https
const getImgUrl = (tumbnail) => {
  return Object.values(tumbnail).join('.').replace(/^http:/, 'https:');
};

// create item in search result list
const createCharacter = (name, tumbnail) => {
  listElm.innerHTML += `
      <li class="list__item">
        <button class="list__btn character button" data-img="${getImgUrl(
          tumbnail
        )}">
          ${name}
        </button>
      </li>
    `;
};
// create img for showing avatar
const createAvatar = (name, src) => {
  contentElm.innerHTML = `
    <img class="content__img" src="${src}" alt="${name}" />
    `;
};

const noCharacters = () => {
  listElm.innerHTML = '';
  hideElement(moreButtonElm);
  showElement(nothingFoundElm);
};

const showCharacters = (data) => {
  if (data.offset + data.count < data.total) {
    showElement(moreButtonElm);
  }
  data.results.forEach((character) =>
    createCharacter(character.name, character.thumbnail)
  );
  counter++;
};

async function fetchCharacters(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();
    counter === 0 && results.data.count === 0
      ? noCharacters()
      : showCharacters(results.data);
  } catch (error) {
    console.log(error);
    showElement(errorElm);
    console.log(error.message);
  } finally {
    hideElement(loadingElm);
  }
}

const getCharacters = (search) => {
  hideElement(errorElm);
  hideElement(nothingFoundElm);
  hideElement(moreButtonElm);
  showElement(loadingElm);
  fetchCharacters(getUrl(counter, search));
};

const getSearch = ({ target }) => {
  if (target.value) {
    listElm.innerHTML = '';
    counter = 0;
    getCharacters(target.value);
  }
};

//listening of input with debounce and disable the submit form
const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('.input');
const moreButtonElm = document.querySelector('.load-more');

searchInput.addEventListener('input', debounce(getSearch));
searchForm.addEventListener('submit', (e) => e.preventDefault());

// show more characters by button or infinite scroll
// moreButtonElm.addEventListener('click', () => getCharacters(searchInput.value)); - if u need more button
observer(moreButtonElm, () => {
  getCharacters(searchInput.value);
});

// listening of list items clicks for show picture of the hero
listElm.addEventListener('click', (e) => {
  if (e.target.tagName == 'BUTTON') {
    createAvatar(e.target.textContent, e.target.dataset.img);
  }
});

// listening of hide button clicks for hide search panel
const hideButtonElm = document.querySelector('.content__fullscreen');
hideButtonElm.addEventListener('click', () => {
  hideButtonElm.classList.toggle('content__fullscreen--active');
  document.querySelector('.search').classList.toggle('search--hide');
});
