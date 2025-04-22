import { howItWorksSteps } from "@/lib/how-it-works";
import { faqData } from "@/lib/faq";
import { getContestData } from "@/lib/contest-data";

export default async function HowItWorksPage() {
  // Fetch active contests
  const activeContests = await getContestData();

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">How It Works</h1>
        <p className="text-gray-600">
          Learn how our design contest process works to bring your ideas to life.
        </p>
      </div>

      {/* How It Works Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-8">The Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorksSteps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 border rounded-lg shadow hover:shadow-lg transition"
            >
              {/* Icon */}
              <div className="mb-4">
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-16 h-16 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>

              {/* Description */}
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Q&A Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Contests Section */}
      <div>
        <h2 className="text-3xl font-semibold text-center mb-8">Active Contests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeContests.map((contest) => (
            <div
              key={contest.id}
              className="border rounded-lg p-6 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-2">{contest.title}</h3>
              <p className="text-gray-600 mb-4">{contest.description}</p>
              <div className="text-sm text-gray-500">
                <span>Prize: ${contest.prize}</span> |{" "}
                <span>Entries: {contest.entries}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}