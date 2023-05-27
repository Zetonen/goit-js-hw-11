import axios from 'axios';

export class ApiPixabay {
  url = 'https://pixabay.com/api/';
  key = '36802723-0938614ccb0b003a152802b8b';
  image_type = 'photo';
  orientation = 'horizontal';
  safesearch = true;
  search = null;
  page = 1;
  per_page = 40;
  total = null;
  q = null;

  async fetchPixabay(search) {
    this.search = search;
    const searchQuery = await axios.get(`${this.url}?`, {
      params: {
        key: this.key,
        q: this.q,
        image_type: this.image_type,
        orientation: this.orientation,
        orientation: this.orientation,
        page: this.page,
        per_page: this.per_page,
      },
    });
    return searchQuery.data;
  }
}