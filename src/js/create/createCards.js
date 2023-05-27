import { createCard } from './createCard';

export function createCards(cards) {
  return cards.map(createCard).join('');
}
