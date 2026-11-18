
import { Link } from "react-router-dom";

function PetCard({
  id,
  name,
  description,
  image,
  breed,
  age,
  status = "available",
}) {
  const isAvailable = status === "available";

  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-ivory-deep bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Pet image */}
      <Link to={`/pets/${id}`} className="block overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={`${name}, available for adoption`}
            className="h-48 w-full object-cover object-[center_30%] transition duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-48 items-center justify-center bg-teal-tint text-teal-deep">
            No image available
          </div>
        )}
      </Link>

      {/* Pet information */}
      <div className="flex flex-1 flex-col p-5">

        <h2 className="text-xl font-bold text-ink">
          {name}
        </h2>

        {breed && (
          <p className="mt-1 text-sm font-medium text-teal-deep">
            {breed}
          </p>
        )}

        {age && (
          <p className="mt-1 text-sm text-ink-soft">
            {age}
          </p>
        )}

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink-soft">
          {description || "No description available."}
        </p>

        <p
          className={`mt-4 text-sm font-semibold ${
            isAvailable ? "text-teal-deep" : "text-red-700"
          }`}
        >
          {isAvailable
            ? "Available for adoption"
            : "Currently unavailable"}
        </p>

        {/* Buttons */}
        <div className="mt-auto grid gap-3 pt-5 sm:grid-cols-2">

          {/* More Details */}
          <Link
            to={`/pets/${id}`}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-teal-deep px-4 py-3 text-center font-semibold text-teal-deep transition hover:bg-teal-tint"
          >
            More Details
          </Link>

          {/* Adopt */}
          {isAvailable ? (
            <Link
              to={`/pets/${id}/adopt`}
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-coral px-4 py-3 text-center font-semibold text-ink transition hover:bg-coral-dark"
            >
              Adopt
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="min-h-11 cursor-not-allowed rounded-lg bg-gray-200 px-4 py-3 font-semibold text-gray-500"
            >
              Unavailable
            </button>
          )}

        </div>
      </div>
    </article>
  );
}

export default PetCard;
