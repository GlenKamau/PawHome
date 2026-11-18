
import { useState } from "react";

export default function AddForm({ onPetAdded }) {
    // Store the form input values
    const [formData, setFormData] = useState({
        name: "",
        breed: "",
        age: "",
        gender: "",
        adoptionFee: "",
        image: "",
        description: "",
    });

    // Store error and success messages
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // Updfate form values whenever the user types
    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData, [name]: value,
        });
    }

    // Submit the new pet
    async function handleSubmit(event) {
        event.preventDefault();
        
        setError("");
        setSuccess("");

        // Basic validation 
        if (
            !formData.name.trim() ||
            !formData.breed.trim() ||
            !formData.age.trim() ||
            !formData.gender ||
            formData.adoptionFee === "" ||
            !formData.image.trim() ||
            !formData.description.trim()
        ) {
            setError("Please fill in all the fields.");
            return;
        }

        if (Number(formData.adoptionFee) < 0) {
            setError("Adoption fee cannot be negative.");
            return;
        }

        // Prepare pet data using db.json
        const newPet = {
            id: Date.now().toString(),
            name: formData.name.trim(),
            breed: formData.breed.trim(),
            age: formData.age.trim(),
            gender: formData.gender,
            adoptionFee: Number(formData.adoptionFee),
            image: formData.image.trim(),
            description: formData.description.trim(),
        };

        try {
            setLoading(true);

            const response = await fetch("http://localhost:3001/pets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPet),
            });

            if (!response.ok) {
                throw new Error("Failed to add pet. Please try again.");
            }

            const savedPet = await response.json();

            // Notify the parent page that a pet was added
            if (onPetAdded) {
                onPetAdded(savedPet);
            }

            // CLear the form after successful submission 
            setFormData({
                name: "",
                breed: "",
                age: "",
                gender: "",
                adoptionFee: "",
                image: "",
                description: "",
            });

            setSuccess("Pet added successfully!");

        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false); 
        } 

    }

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

            <form onSubmit={handleSubmit} className="space-y-5"> 

                {/* Pet Name */}
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
                        className="w-full rounded-lg border border-ivory-deep bg-ivory px-4 py-3 text-ink outline-none focus:border-teal-deep focus:ring-2 focus:ring-teal-tint"
                    />
                </div>
               
                 {/* Breed  */}
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
                        className="w-full rounded-lg border border-ivory-deep bg-ivory px-4 py-3 text-ink outline-none focus:border-teal-deep focus:ring-2 focus:ring-teal-lint"
                    />
                    
                 </div>
                 
                 {/* Age and Gender */}
                 <div className="grid gap-5 sm:grid-cols-2">

                    <div>
                        <label htmlFor="age" className="mb-2 block font-semibold text">
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
                             className="w-full rounded-lg border border-ivory-deep bg-ivory px-4 py-3 text-ink outline-none focus:border-teal-deep focus:ring-2 focus:ring-teal-tint"                      
                        />
                    </div>

                    <div>
                        <label htmlFor="gender" className="mb-2 block font-semibold text-ink">
                            Gender
                        </label>

                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-ivory-deep bg-ivory px-4 py-3 text-ink outline-none focus:ring-teal-tint"
                        >

                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                    </div>

                 </div>

                   {/* Adoption Fee */}
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
                          className="w-full rounded-lg border border-ivory-deep bg-ivory px-4 py-3 text-ink outline-none focus:border-teal-deep focus:ring-2 focus:ring-teal-tint"
                      />

                   </div>

                   {/* Image URL */}
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
                          className="w-full rounded-lg border border-ivory-deep bg-ivory px-4 py-3 text-ink outline-none focus:border-teal-deep focus:ring-teal-tint"
                      />
                   </div>

                   {/* Description */}
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
                              className="w-full resize-y rounded-lg border border-ivory-deep bg-ivory px-4 py-3 text-ink outline-none focus:border-teal-deep focus:ring-2 focus:ring-teal-tint"
                        />
                    </div>

                    {/* Error Message */}
                     
                    {error && (
                        <p role="alert" className="rounded-lg bg-red-100 p-3 text-red-700">
                            {error}
                        </p>
                    )} 

                    {/* Success Message */}

                    {success && (
                        <p role="status" className="rounded-lg bg-teal-tint p-3 text-teal-deep">
                            {success}
                        </p>
                    )}

                    {/* Submit Button */}

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-coral px-6 py-3 font-bold text-ink transition-colors hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-60"
                    > 
                       {loading ? "Adding Pet..." : "Add Pet" }                        
                        
                    </button>

            </form>

        </section>
    );

}