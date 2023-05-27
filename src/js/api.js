import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class ApiPaxabay {
  constructor(btn) {
    this.btnLoadMore = btn;
  }

  url = 'https://pixabay.com/api/';
  key = '36802723-0938614ccb0b003a152802b8b';
  image_type = 'photo';
  orientation = 'horizontal';
  safesearch = true;
  search = null;
  page = 1;
  per_page = 40;
  total = null;

  async fetchPixabay(search) {
    this.hideBtn()
    if(search !== this.search){
      this.page = 1;
    }
    this.search = search;
    const searchQuery = await axios
      .get(`${this.url}?`, {
        params: {
          key: this.key,
          q: search,
          image_type: this.image_type,
          orientation: this.orientation,
          orientation: this.orientation,
          page: this.page,
          per_page: this.per_page,
        },
      })
      const data = searchQuery.data;
        this.total = data.total;
        if (this.total === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return false;
        }
        if (this.page === 1) {
          Notify.success(`Hooray! We found ${this.total} images.`);
        }
        this.loaded();
        return data;
      
  }

  async loading() {
    if (this.total <= this.page * this.per_page) {
      console.log('oups');
      return;
    }
    this.nextPage();
    this.hideBtn()
    return this.fetchPixabay(this.search);
  }

  loaded() {
    if (this.total <= this.page * this.per_page) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
    this.btnLoadMore.classList.remove('is-hidden');
  }

  hideBtn() {
    this.btnLoadMore.classList.add('is-hidden');
  }
  nextPage() {
    this.page += 1;
  }
}
