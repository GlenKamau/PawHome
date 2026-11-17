import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as api from "../api/pets";

const PetsContext = createContext(null);

export function PetsProvider({ children }) {
  const [pets, setPets] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Always holds the latest pets, so we can undo a failed change
  const petsRef = useRef(pets);
  petsRef.current = pets;

  // Load everything once when the app starts
  useEffect(() => {
    let cancelled = false;
    Promise.all([api.getPets(), api.getShelters()])
      .then(([p, s]) => {
        if (cancelled) return;
        setPets(p);
        setShelters(s);
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  // POST: wait for the server so we get the real id
  const addPet = useCallback(async (data) => {
    const created = await api.createPet(data);
    setPets((prev) => [created, ...prev]);
    return created;
  }, []);

  // PATCH: update the screen first, undo if the server fails
  const updatePet = useCallback(async (id, changes) => {
    const previous = petsRef.current;
    setPets((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...changes } : p)),
    );
    try {
      const saved = await api.patchPet(id, changes);
      setPets((prev) => prev.map((p) => (p.id === id ? saved : p)));
    } catch (e) {
      setPets(previous);
      setError(`Update failed: ${e.message}`);
    }
  }, []);

  // PUT: replace the whole pet
  const replacePet = useCallback(async (id, pet) => {
    const saved = await api.replacePet(id, pet);
    setPets((prev) => prev.map((p) => (p.id === id ? saved : p)));
    return saved;
  }, []);

  // DELETE: remove from the screen first, undo if the server fails
  const removePet = useCallback(async (id) => {
    const previous = petsRef.current;
    setPets((prev) => prev.filter((p) => p.id !== id));
    try {
      await api.deletePet(id);
    } catch (e) {
      setPets(previous);
      setError(`Delete failed: ${e.message}`);
    }
  }, []);

  // POST the application, then PATCH the pet to "pending"
  const submitApplication = useCallback(
    async (petId, form) => {
      await api.createApplication({ petId, ...form });
      await updatePet(petId, { status: "pending" });
    },
    [updatePet],
  );

  const value = {
    pets,
    shelters,
    loading,
    error,
    setError,
    addPet,
    updatePet,
    replacePet,
    removePet,
    submitApplication,
  };
  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>;
}

export function usePets() {
  const ctx = useContext(PetsContext);
  if (!ctx) throw new Error("usePets must be used inside <PetsProvider>");
  return ctx;
}
