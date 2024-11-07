import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-12 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Health Is Our{" "}
            <span className="text-blue-600">Top Priority</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Connect with certified doctors, book appointments, and get the care
            you deserve from the comfort of your home.
          </p>
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
              <Link href="/appointment">Book Appointment</Link>
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
          <Image
            src="https://pixabay.com/get/g439e357aec75cd4d11cca366faf857cb753f6e4ad6f96875f9ad92fb938b8646b67db4e7ae93dbb994916754250d0c8aa261d45c7821aa21b59a915284e8693672885c9bc994201cf58c577cf6d3fec2_640.png"
            alt="Healthcare Professional"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
