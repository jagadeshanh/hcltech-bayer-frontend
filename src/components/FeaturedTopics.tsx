import { FC } from "react";

interface HealthTopic {
  title: string;
  description: string;
  icon: string;
}

const topics: HealthTopic[] = [
  {
    title: "Preventive Care",
    description:
      "Regular check-ups and screenings to maintain your health and catch issues early.",
    icon: "🏥",
  },
  {
    title: "Mental Wellness",
    description:
      "Professional support for mental health and emotional well-being.",
    icon: "🧠",
  },
  {
    title: "Specialized Treatment",
    description:
      "Expert care for specific conditions from our specialized doctors.",
    icon: "👨‍⚕️",
  },
  {
    title: "Emergency Care",
    description: "24/7 emergency services with quick response times.",
    icon: "🚑",
  },
];

const FeaturedTopics: FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Featured Health Topics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{topic.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {topic.title}
              </h3>
              <p className="text-gray-600">{topic.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTopics;
