import { refs } from './refs.js';
import { createCards } from './create/createCards.js';

export function populateMarkup(cards) {
  const cardsEl = createCards(cards);
  refs.gallery.insertAdjacentHTML('beforeend', cardsEl);
}

export function renderMarkup() {
  refs.gallery.innerHTML = '';
}
