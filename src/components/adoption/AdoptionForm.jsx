import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function AdoptionForm({ pet, onSubmit }) {
    const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  address: "",
  homeType: "",
  household: "",
  experience: "",
  reason: "",
});

const [isSubmitting, setIsSubmitting] = useState(false);

const [error, setError] = useState("");

const [success, setSuccess] = useState("");

const handleChange = (event) => {
  const { name, value } = event.target;

  setFormData((previousData) => ({
    ...previousData,
    [name]: value,
  }));
};

const handleSubmit = async (event) => {
    event.preventDefault();

    if (!pet) {
      setError("Please select a pet before applying.");
      return;
    }

    if (!onSubmit) {
      setError("The application service is not configured.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await onSubmit({
        ...formData,
        petId: pet.id,
        petName: pet.name,
      });

      setSuccess("Your adoption application was submitted successfully!");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        homeType: "",
        household: "",
        experience: "",
        reason: "",
      });
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

   const inputStyle =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#176965] focus:ring-2 focus:ring-[#176965]/20";

  const petImage = pet?.image || pet?.imageUrl || pet?.photo;

  return (
    <div className="min-h-screen bg-[#F4EEE8] px-4 py-12 text-[#1D2D2C]">
      <div className="mx-auto max-w-5xl">

        {/* Back link */}
                <Link
          to="/pets"
          className="mb-6 inline-flex items-center gap-3 text-[#176965] font-medium text-lg hover:text-[#FF6347] transition"
        >
          <ArrowLeft size={21} strokeWidth={1.8} />
          <span>Back to Find a Pet</span>
        </Link>

        {/* Page heading */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold md:text-4xl">
            Adoption Application
          </h1>

          <p className="mt-3 text-gray-600">
            Give a loving pet a forever home. Complete the form below
            to begin your adoption journey.
          </p>
        </div>

        {/* Selected pet information */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-[#176965] p-6 text-white shadow-lg">
          <h2 className="mb-5 text-xl font-bold">
            The Pet You Want to Adopt
          </h2>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {petImage ? (
              <img
                src={petImage}
                alt={pet?.name || "Selected pet"}
                className="h-36 w-full rounded-xl object-cover sm:w-40"
              />
            ) : (
              <div className="flex h-36 w-full items-center justify-center rounded-xl bg-white/15 text-5xl sm:w-40">
                🐾
              </div>
            )}

            <div className="grid flex-1 grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-white/70">Pet name</p>
                <p className="font-semibold">
                  {pet?.name || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-sm text-white/70">Breed / Type</p>
                <p className="font-semibold">
                  {pet?.breed || pet?.type || pet?.species || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-sm text-white/70">Age</p>
                <p className="font-semibold">
                  {pet?.age || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-sm text-white/70">Gender</p>
                <p className="font-semibold">
                  {pet?.gender || "Not specified"}
                </p>
              </div>
            </div>
          </div>
        </div>

{/* Adoption form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow-lg md:p-10"
        >
          <h2 className="mb-2 text-2xl font-bold">
            Your Information
          </h2>

          <p className="mb-8 text-sm text-gray-500">
            Please provide accurate information so the shelter can
            contact you.
          </p>

          {/* Personal details */}
          <h3 className="mb-5 border-b border-gray-200 pb-3 text-lg font-semibold text-[#176965]">
            Personal Details
          </h3>

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-medium">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={inputStyle}
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className={inputStyle}
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className={inputStyle}
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Home Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your location"
                className={inputStyle}
                required
              />
            </div>

          </div>

 {/* Home details */}
          <h3 className="mb-5 mt-10 border-b border-gray-200 pb-3 text-lg font-semibold text-[#176965]">
            About Your Home
          </h3>

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-medium">
                Type of Home *
              </label>
              <select
                name="homeType"
                value={formData.homeType}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option value="">Select your home type</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Farm">Farm</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Household Members
              </label>
              <input
                type="text"
                name="household"
                value={formData.household}
                onChange={handleChange}
                placeholder="e.g. 2 adults and 1 child"
                className={inputStyle}
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block font-medium">
                Have you cared for a pet before?
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="">Select an answer</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Currently have pets">I currently have pets</option>
              </select>
            </div>

          </div>

           {/* Adoption reason */}
          <h3 className="mb-5 mt-10 border-b border-gray-200 pb-3 text-lg font-semibold text-[#176965]">
            Why Do You Want to Adopt?
          </h3>

          <div>
            <label className="mb-2 block font-medium">
              Tell us why you would like to adopt this pet *
            </label>

            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="5"
              placeholder="Tell us about the home you can provide..."
              className={inputStyle}
              required
            />
          </div>

          {/* Feedback */}
          {error && (
            <p className="mt-5 rounded-lg bg-red-50 p-3 text-red-700">
              {error}
            </p>
          )}

          {success && (
            <p className="mt-5 rounded-lg bg-green-50 p-3 text-green-700">
              {success}
            </p>
          )}

           {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full rounded-lg bg-[#FF6347] px-6 py-4 font-bold text-white transition hover:bg-[#e95339] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit Adoption Application"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            Our team will review your application and contact you.
          </p>

        </form>
      </div>
    </div>
  );
}
export default AdoptionForm;