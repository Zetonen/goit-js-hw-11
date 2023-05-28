import { refs } from './refs.js';
import { ApiPixabay } from './api.js';
import { populateMarkup, renderMarkup } from './populate.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery = new simpleLightbox('.gallery a');
const pixabay = new ApiPixabay();

export async function onSubmitSearchForm(e) {
  e.preventDefault();
  renderMarkup();
  refs.loadMoreBtn.classList.add('is-hidden');

  const inputValue = e.currentTarget
    .querySelector('input[name="searchQuery"]')
    .value.trim();
  pixabay.q = inputValue;

  if (!inputValue) {
    Notify.failure('please enter something in the search');
    return;
  }
  searchGalleryForm()

}

async function searchGalleryForm() {
  try {
    const data = await pixabay.fetchPixabay();
    if (data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    populateMarkup(data.hits)
    
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
    gallery.refresh();

    if (data.totalHits > pixabay.per_page) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

export function loadMore(){
  pixabay.page += 1;
  searchMoreImage()
}

async function searchMoreImage() {
  try {
    const data = await pixabay.fetchPixabay();

    populateMarkup(data.hits)
    gallery.refresh();
    if (data.hits.length < pixabay.per_page || pixabay.per_page * pixabay.page >= 500) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error);
  }
}