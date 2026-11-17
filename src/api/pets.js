// All talking to the database happens in this file. Pages never call fetch directly.
const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.status === 204 ? null : res.json();
}

const now = () => new Date().toISOString();

// GET
export const getPets = () => request("/pets?_sort=createdAt&_order=desc");
export const getPet = (id) => request(`/pets/${id}`);
export const getShelters = () => request("/shelters");

// POST: add a new pet
export const createPet = (data) =>
  request("/pets", {
    method: "POST",
    body: JSON.stringify({ status: "available", ...data, createdAt: now(), updatedAt: now() }),
  });

// PATCH: change only some fields (favorite, status...)
export const patchPet = (id, changes) =>
  request(`/pets/${id}`, { method: "PATCH", body: JSON.stringify({ ...changes, updatedAt: now() }) });

// PUT: replace the whole pet (used by the edit form)
export const replacePet = (id, pet) =>
  request(`/pets/${id}`, { method: "PUT", body: JSON.stringify({ ...pet, id, updatedAt: now() }) });

// DELETE
export const deletePet = (id) => request(`/pets/${id}`, { method: "DELETE" });

// POST: adoption application
export const createApplication = (data) =>
  request("/applications", {
    method: "POST",
    body: JSON.stringify({ ...data, status: "submitted", createdAt: now() }),
  });