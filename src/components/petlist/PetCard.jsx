
import { Link } from "react-router-dom";

function PetCard({ name, description, image }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full h-full">

    <img src={image} alt={name} className="w-full h-48 object-cover object-[center_30%]" />

      <div className="p-4">

        <h2 className="text-xl font-bold text-gray-800">
          {name}
        </h2>

        <p className="text-gray-600 text-sm mt-3">
          {description}
        </p>

        <p className="text-green-600 font-semibold text-sm mt-3">
          Available for adoption
        </p>

        <Link
          to="/pet-details"
          className="block text-center bg-blue-600 text-white w-full p-2 rounded-lg mt-3 hover:bg-blue-700"
        >
          More Details
        </Link>

      </div>
    </div>
  );
}

export default PetCard;
