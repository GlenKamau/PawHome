import { Link } from "react-router-dom";
import { Mail, MapPin, PawPrint } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-teal-deep text-ivory/85">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 text-xl font-heading font-bold text-ivory">
            <PawPrint size={24} aria-hidden="true" />
            PawHome
          </p>
          <p className="mt-3 max-w-xs text-sm leading-6">
            We help shelters and rescues find loving homes for dogs, cats,
            rabbits and birds.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold text-ivory">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/pets" className="hover:text-ivory hover:underline">
                Find a pet
              </Link>
            </li>
            <li>
              <Link to="/pets/new" className="hover:text-ivory hover:underline">
                List a pet
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-ivory">Contact</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} aria-hidden="true" /> hello@pawhome.example
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} aria-hidden="true" /> Nairobi, Kenya
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/20 px-4 py-4 text-center text-xs text-ivory/85">
        &copy; {year} PawHome. A group project built with React and Tailwind.
      </div>
    </footer>
  );
}
