import { refs } from './refs.js';
import { ApiPaxabay } from './api.js';
import { populateMarkup, renderMarkup } from './populate.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery = new simpleLightbox('.gallery a');
const paxabay = new ApiPaxabay(refs.loadMoreBtn);

export async function onSubmitSearchForm(e) {
  e.preventDefault();
  renderMarkup();
  const inputValue = e.currentTarget.querySelector(
    'input[name="searchQuery"]'
  ).value;
  if (!inputValue) {
    Notify.failure('please enter something in the search');
    paxabay.hideBtn()
    return;
  }
  try {
    const data = await paxabay.fetchPixabay(inputValue);
    if (data) {
      return populateMarkup(data.hits);
    }
    gallery.refresh();
  } catch (error) {
    console.log(error);
  }
}

export function loadMore() {
  paxabay
    .loading()
    .then(res => {
      return populateMarkup(res.hits);
    })
    .then(res => {
      gallery.refresh();
    });
}
