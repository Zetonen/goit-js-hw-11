export function createCard(card){
    return `  <a class='gallery_item' href="${card.largeImageURL}">
    <div class="photo-card">
    <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <span>Likes</span> 
        ${card.likes}
      </p>
      <p class="info-item">
        <span>Views</span>
        ${card.views}
      </p>
      <p class="info-item">
        <span>Comments</span>
        ${card.comments}
      </p>
      <p class="info-item">
        <span>Downloads</span>
        ${card.downloads}
      </p>
    </div>
  </div>
  </a>`
}