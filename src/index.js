import { refs } from "./js/refs.js";
import { onSubmitSearchForm, loadMore } from "./js/onSubmitSearchForm.js";


refs.searchForm.addEventListener('submit', onSubmitSearchForm)
refs.loadMoreBtn.addEventListener('click', loadMore)

