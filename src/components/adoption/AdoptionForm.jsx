import { useState } from "react";

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

}