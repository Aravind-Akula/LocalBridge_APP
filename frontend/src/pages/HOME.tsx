import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar";
import HeroCarousel from "../components/HeroCarousel";
import { goToApp } from "../utils/navigation";
import { navigateByAuth } from "../utils/navigation";

function WhyLocalBridgeCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 max-w-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">
        Why LocalBridge?
      </h3>

      <ul className="space-y-4 text-gray-700">
        <li className="flex items-start gap-3">
          <span className="text-2xl">🌾</span>
          <span>Local workers from your village</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-2xl">🏠</span>
          <span>Services at transparent prices</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-2xl">📍</span>
          <span>Nearby & available workers</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-2xl">📞</span>
          <span>Direct contact — no middlemen</span>
        </li>
      </ul>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      {/* Navbar */}
      <Navbar />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* ================= APP INTRO ================= */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT CONTENT */}
            <div>
            <span className="inline-block mb-3 text-sm font-semibold text-indigo-600">
                LOCAL SERVICES, SIMPLIFIED
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Where Local Talent <br />
                Meets Local Needs
            </h1>

            <p className="mt-5 text-lg text-gray-600 max-w-xl">
                LocalBridge connects you with trusted workers from your area for
                farming, home services, construction, and events — quickly and
                transparently.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
            <Button
              onClick={() => navigateByAuth(navigate)}
            >
              Get Started
            </Button>
                <Button
                size="lg"
                variant="outline"
                onClick={() => navigateByAuth(navigate)}

                // onClick={() =>
                //     document
                //     .getElementById("services")
                //     ?.scrollIntoView({ behavior: "smooth" })
                // }

                >
                Explore Services
                </Button>
            </div>
            </div>

            {/* RIGHT FEATURES */}
            <div className="grid sm:grid-cols-2 gap-6">
            {[
                {
                icon: "🌾",
                title: "Local Workers",
                desc: "People from your village & nearby areas",
                },
                {
                icon: "🏷️",
                title: "Transparent Pricing",
                desc: "No hidden charges or middlemen",
                },
                {
                icon: "📍",
                title: "Nearby Availability",
                desc: "Find workers close to your location",
                },
                {
                icon: "📞",
                title: "Direct Contact",
                desc: "Call & coordinate directly",
                },
            ].map((item) => (
                <div
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition"
                >
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-3 font-semibold text-gray-900">
                    {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                    {item.desc}
                </p>
                </div>
            ))}
            </div>
        </div>
        </section>


      {/* ================= SERVICES ================= */}
        <section
        id="services"
        className="bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20"
        >
        <div className="max-w-7xl mx-auto px-6">

            {/* Section Header */}
            <div className="text-center mb-14">
            <span className="text-sm font-semibold text-indigo-600 tracking-wide">
                OUR CATEGORIES
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">
                Services We Offer
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                From farms to homes and events — LocalBridge connects you
                with trusted local professionals near you.
            </p>
            </div>

            {/* Service Cards */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
                {
                title: "Farming",
                desc: "Paddy, cotton, harvesting & daily farm work",
                img: "/Images/Farming_card.png",
                },
                {
                title: "Home Services",
                desc: "Plumbing, electrician, repairs & cleaning",
                img: "/Images/Home_services_card.png",
                },
                {
                title: "Construction",
                desc: "Masons, painters, carpenters & helpers",
                img: "/Images/Construction_card.png",
                },
                {
                title: "Events",
                desc: "Tent house, lighting, catering & decoration",
                img: "/Images/Events_card.png",
                },
            ].map((service) => (
             
            <div key={service.title} className="rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer bg-white" 
            onClick={() => navigateByAuth(navigate)}
>
            
            {/* Image */}
            <div className="relative h-56 w-full">
                <img
                src={service.img}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-semibold text-lg">{service.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{service.desc}</p>
            </div>

            </div>

            ))}
            </div>
        </div>
        </section>


      {/* ================= SERVICE SEEKERS ================= */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/Images/Service_Seeker.png"
            alt="Service seeker"
            className="rounded-xl shadow-md object-contain"
          />

          <div>
            <h2 className="text-3xl font-bold mb-4">
              For Service Seekers
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>✔ Find trusted local workers</li>
              <li>✔ Transparent pricing</li>
              <li>✔ Easy job posting</li>
              <li>✔ Direct communication</li>
            </ul>

            <Button className="mt-6" onClick={() => goToApp(navigate)}>
              Post a Job
            </Button>
          </div>
        </div>
      </section>

      {/* ================= WORKERS ================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              For Workers
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>✔ Get local work opportunities</li>
              <li>✔ Flexible working hours</li>
              <li>✔ No middlemen</li>
              <li>✔ Fair wages</li>
            </ul>

            <Button className="mt-6" onClick={() => goToApp(navigate)}>
              Find Work
            </Button>
          </div>

          <img
            src="/Images/Workers.png"
            alt="Worker"
            className="rounded-xl shadow-md object-contain"
          />
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-white py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} LocalBridge. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
