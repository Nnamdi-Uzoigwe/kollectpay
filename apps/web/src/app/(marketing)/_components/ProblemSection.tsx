export default function ProblemSection() {
  const problems = [
    {
      emoji: "😤",
      text: "You've sent 10 WhatsApp messages and they've read every single one — no reply.",
    },
    {
      emoji: "😬",
      text: "You feel too awkward to call again. You don't want to seem desperate.",
    },
    {
      emoji: "📒",
      text: "You're tracking who owes you in a notebook, a spreadsheet, or just your head.",
    },
    {
      emoji: "😴",
      text: "You gave them \"one more week\" three weeks ago. They're still owing.",
    },
    {
      emoji: "💸",
      text: "You're owed ₦500,000 across 20 customers but struggle to pay your own suppliers.",
    },
    {
      emoji: "🤝",
      text: "They're your customer, your neighbour, your church member. It's complicated.",
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-1.5 mb-6">
            <span className="text-red-400 text-sm">😩</span>
            <span
              className="text-red-500 text-sm font-semibold"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Sound familiar?
            </span>
          </div>

          <h2
            className="text-[40px] lg:text-[48px] font-extrabold leading-[1.1] tracking-[-1.5px] text-gray-900 mb-5"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Chasing debtors is{" "}
            <span className="relative inline-block">
              <span className="relative z-10">exhausting.</span>
              {/* Strikethrough line */}
              <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.75 bg-red-400 rounded-full z-20" />
            </span>
            <br />
            <span className="text-[#7C3AED]">It doesn't have to be.</span>
          </h2>

          <p
            className="text-lg text-gray-500 leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Every Nigerian business owner knows this pain. You did the work, you delivered the goods — but collecting your money feels like a second full-time job.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="group relative bg-gray-50 hover:bg-white border border-gray-100 hover:border-red-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-red-50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Red left accent line on hover */}
              <div className="absolute left-0 top-6 bottom-6 w-0.75 bg-red-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="text-3xl mb-4 block">{problem.emoji}</span>
              <p
                className="text-gray-600 text-[15px] leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {problem.text}
              </p>
            </div>
          ))}
        </div>

        {/* Transition line into solution */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 w-full max-w-md">
            <div className="flex-1 h-px bg-gray-200" />
            <span
              className="text-sm font-semibold text-gray-400 whitespace-nowrap"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              There is a better way
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Arrow down */}
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#7C3AED] to-[#9D5CF6] flex items-center justify-center shadow-lg shadow-purple-300/40 animate-bounce">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12l7 7 7-7"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}