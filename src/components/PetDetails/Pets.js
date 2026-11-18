// One place that reads the dummy pets. Every page should use these functions
// (pet list, details, favorites) so they all agree.
import data from "../../db/db.json";
import { getFavoriteIds, saveFavoriteIds } from "./Favourites";

const DELETED_KEY = "deletedPetIds";

function getDeletedIds() {
  try {
    return JSON.parse(localStorage.getItem(DELETED_KEY)) ?? [];
  } catch {
    return [];
  }
}

// All pets that have not been "deleted" in this browser.
export function getPets() {
  const deleted = getDeletedIds();
  return data.pets.filter((pet) => !deleted.includes(pet.id));
}

// The pet with this id, or null if it does not exist.
export function getPet(id) {
  return getPets().find((pet) => String(pet.id) === String(id)) ?? null;
}

// Up to `limit` other pets of the same kind.
// If pets have no `species` field yet, every other pet counts as similar.
export function getSimilarPets(pet, limit = 3) {
  return getPets()
    .filter((other) => other.id !== pet.id && other.species === pet.species)
    .slice(0, limit);
}

// The JSON file cannot be edited from the browser, so we remember the deleted id.
export function deletePet(id) {
  localStorage.setItem(DELETED_KEY, JSON.stringify([...getDeletedIds(), id]));
  saveFavoriteIds(getFavoriteIds().filter((favoriteId) => favoriteId !== id));
}