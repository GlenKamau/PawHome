import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

const INITIAL_VALUES = {
  name: "",
  breed: "",
  age: "",
  gender: "",
  adoptionFee: "",
  image: "",
  description: "",
};

function validatePet(values) {
  const errors = {};

  if (
    !values.name.trim() ||
    !values.breed.trim() ||
    !values.age.trim() ||
    !values.gender ||
    values.adoptionFee === "" ||
    !values.image.trim() ||
    !values.description.trim()
  ) {
    errors.form = "Please fill in all the fields.";
    return errors;
  }

  if (
    !Number.isFinite(Number(values.adoptionFee)) ||
    Number(values.adoptionFee) < 0
  ) {
    errors.adoptionFee = "Please enter a valid adoption fee.";
  }

  return errors;
}

export default function AddForm({ onPetAdded }) {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    values: formData,
    errors,
    handleChange,
    resetForm,
    handleSubmit,
  } = useForm(INITIAL_VALUES, validatePet);

  async function onSubmit(data) {
    if (submitting) return;

    setSubmitError("");
    setSuccess("");

    const newPet = {
      id: Date.now().toString(),
      name: data.name.trim(),
      breed: data.breed.trim(),
      age: data.age.trim(),
      gender: data.gender,
      adoptionFee: Number(data.adoptionFee),
      image: data.image.trim(),
      description: data.description.trim(),
      status: "available",
    };

    try {
      setSubmitting(true);

      const response = await fetch("http://localhost:3000/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPet),
      });

      if (!response.ok) {
        throw new Error("Failed to add pet. Please try again.");
      }

      const savedPet = await response.json();
      onPetAdded?.(savedPet);
      setSuccess("Pet added successfully!");
      resetForm(INITIAL_VALUES);
      navigate("/pets");
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const displayedError = submitError || errors.form || errors.adoptionFee;

  const inputStyle =
    "w-full rounded-lg border border-ivory-deep bg-ivory px-4 py-3 text-ink outline-none focus:border-teal-deep focus:ring-2 focus:ring-teal-tint";

  return (
    <section className="mx-auto max-w-3xl rounded-xl bg-card p-6 shadow-md sm:p-8">
      <div className="mb-8">
        <h2 className="font-heading text-3xl font-bold text-teal-deep">
          List a Pet
        </h2>
        <p className="mt-2 text-ink-soft">
          Share a pet looking for a loving home.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <label htmlFor="name" className="mb-2 block font-semibold text-ink">
            Pet Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter pet name"
            required
            className={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="breed" className="mb-2 block font-semibold text-ink">
            Breed
          </label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            placeholder="Enter pet breed"
            required
            className={inputStyle}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="age" className="mb-2 block font-semibold text-ink">
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 2 years"
              required
              className={inputStyle}
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="mb-2 block font-semibold text-ink"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className={inputStyle}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="adoptionFee"
            className="mb-2 block font-semibold text-ink"
          >
            Adoption Fee
          </label>
          <input
            type="number"
            id="adoptionFee"
            name="adoptionFee"
            value={formData.adoptionFee}
            onChange={handleChange}
            placeholder="Enter adoption fee"
            min="0"
            step="1"
            required
            className={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="image" className="mb-2 block font-semibold text-ink">
            Pet Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/pet-image.jpg"
            required
            className={inputStyle}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block font-semibold text-ink"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us about this pet..."
            rows="5"
            required
            className={inputStyle}
          />
        </div>

        {displayedError && (
          <p role="alert" className="rounded-lg bg-red-100 p-3 text-red-700">
            {displayedError}
          </p>
        )}

        {success && (
          <p
            role="status"
            className="rounded-lg bg-teal-tint p-3 text-teal-deep"
          >
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-coral px-6 py-3 font-bold text-ink transition-colors hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Adding Pet..." : "Add Pet"}
        </button>
      </form>
    </section>
  );
}
