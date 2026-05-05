const quotes = [
  {
    quote:
      "I stopped losing threads completely. Recall found a Slack message from four months ago in two seconds. I'd given up looking for it.",
    name: "Alex K.",
    role: "Product Designer",
    initials: "AK",
  },
  {
    quote:
      "The natural language search is eerie. I typed 'that email about the contract renewal' and it surfaced the exact thread. Not a keyword match — it actually understood what I meant.",
    name: "Priya S.",
    role: "Product Manager",
    initials: "PS",
  },
  {
    quote:
      "It feels like giving your Mac a perfect memory. I didn't realize how much time I was burning just looking for things I already had.",
    name: "Marcus T.",
    role: "Software Engineer",
    initials: "MT",
  },
];

export default function SocialProof() {
  return (
    <section id="social-proof" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">
            Early access
          </p>
          <h2 className="font-caveat text-5xl md:text-6xl text-foreground leading-tight">
            Strong opinions from early testers.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <figure
              key={q.name}
              className="flex flex-col p-6 rounded-2xl border border-border bg-card"
            >
              {/* Quote mark */}
              <div className="font-caveat text-5xl text-accent/30 leading-none mb-4 select-none">
                &ldquo;
              </div>

              <blockquote className="flex-1 text-sm text-foreground leading-relaxed mb-6">
                {q.quote}
              </blockquote>

              <figcaption className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                  <span className="font-mono text-[10px] text-accent">
                    {q.initials}
                  </span>
                </div>
                <div>
                  <div className="text-sm text-foreground font-medium">
                    {q.name}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground">
                    {q.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
