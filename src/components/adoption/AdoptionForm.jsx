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

  
}