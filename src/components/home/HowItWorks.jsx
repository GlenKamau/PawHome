const STEPS = [
  {
    title: "Find a pet",
    text: "Browse by type, or search by name, size and age until someone catches your eye.",
  },
  {
    title: "Send an application",
    text: "Tell the shelter a little about you and your home. It only takes a few minutes.",
  },
  {
    title: "Meet and take them home",
    text: "The shelter reviews your application and arranges a visit. Then your new friend is yours.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        How adoption works
      </h2>

      <ol className="mt-8 grid gap-8 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-deep font-heading text-lg font-bold text-ivory">
              {i + 1}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-1 text-sm leading-6 text-ink-soft">
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
