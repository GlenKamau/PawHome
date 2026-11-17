import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="px-4 pb-12 sm:pb-16">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-2xl bg-teal-deep p-8 sm:flex-row sm:items-center sm:p-12">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-ivory sm:text-3xl">
            Run a shelter or rescue?
          </h2>
          <p className="mt-2 max-w-lg text-ivory/90">
            List your pets on PawHome so more people can find them and give them
            a home.
          </p>
        </div>
        <Link
          to="/pets/new"
          className="inline-flex min-h-11 shrink-0 items-center rounded-lg bg-coral px-6 py-3 font-semibold text-ink hover:bg-coral-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
        >
          List a pet
        </Link>
      </div>
    </section>
  );
}
