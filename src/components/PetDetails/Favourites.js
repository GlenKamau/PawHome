// Favorites are just a list of pet ids saved in the browser.
// The details page heart and the Favorites page must both use these functions.
const KEY = "favoriteIds";

export function getFavoriteIds() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
}

export function saveFavoriteIds(ids) {
  localStorage.setItem(KEY, JSON.stringify(ids));
}

// Adds the id if missing, removes it if present. Returns the new list.
export function toggleFavoriteId(id) {
  const ids = getFavoriteIds();
  const next = ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id];
  saveFavoriteIds(next);
  return next;
}