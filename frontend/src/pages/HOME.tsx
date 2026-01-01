import { useNavigate } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import { Button } from "../components/ui/button";
import { navigateByAuth, goToApp } from "../utils/navigation";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white">

      {/* ================= HERO ================= */}
      <section className="bg-slate-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <span className="text-xs font-semibold text-indigo-600 tracking-wide">
              LOCAL SERVICES, SIMPLIFIED
            </span>

            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Where Local Talent <br /> Meets Local Needs
            </h1>

            <p className="mt-5 text-lg text-gray-600 max-w-xl">
              Connect with trusted workers nearby for farming, home services,
              construction, and events — fast, transparent, and local.
            </p>

            <div className="mt-8 flex gap-4">
              <Button onClick={() => navigateByAuth(navigate)}>
                Get Started
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("categories")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Services
              </Button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-2xl overflow-hidden shadow-sm border bg-white">
            <HeroCarousel minimalText />
          </div>
        </div>
      </section>

      {/* ================= QUICK FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "🌾", title: "Local Workers", desc: "From your village & nearby" },
            { icon: "🏷️", title: "Transparent Pricing", desc: "No middlemen or hidden costs" },
            { icon: "📍", title: "Nearby Availability", desc: "Workers close to your location" },
            { icon: "📞", title: "Direct Contact", desc: "Call & coordinate directly" },
          ].map(item => (
            <div
              key={item.title}
              className="bg-white border rounded-xl p-5 hover:shadow-sm transition"
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
      </section>

      {/* ================= CATEGORIES ================= */}
      <section
        id="categories"
        className="bg-gray-50 py-16 border-t border-b"
      >
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Services We Offer
            </h2>
            <p className="mt-3 text-gray-600">
              Choose a service to get started quickly
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Farming",
                desc: "Paddy, harvesting & daily work",
                img: "/Images/Farming_card.png",
              },
              {
                title: "Home Services",
                desc: "Plumbing, electrical & cleaning",
                img: "/Images/Home_services_card.png",
              },
              {
                title: "Construction",
                desc: "Masons, painters & helpers",
                img: "/Images/Construction_card.png",
              },
              {
                title: "Events",
                desc: "Catering, lighting & decoration",
                img: "/Images/Events_card.png",
              },
            ].map(service => (
              <div
                key={service.title}
                onClick={() => navigateByAuth(navigate)}
                className="bg-white rounded-xl overflow-hidden border hover:shadow-md transition cursor-pointer"

              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOR SEEKERS & WORKERS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">

        {/* SEEKERS */}
        <div className="bg-white border rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">
            For Service Seekers
          </h3>

          <ul className="space-y-2 text-gray-700">
            <li>✔ Post jobs easily</li>
            <li>✔ Get trusted workers</li>
            <li>✔ Direct contact</li>
            <li>✔ Transparent pricing</li>
          </ul>

          <Button className="mt-6" onClick={() => goToApp(navigate)}>
            Post a Job
          </Button>
        </div>

        {/* WORKERS */}
        <div className="bg-white border rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">
            For Workers
          </h3>

          <ul className="space-y-2 text-gray-700">
            <li>✔ Find local work</li>
            <li>✔ Flexible hours</li>
            <li>✔ Fair wages</li>
            <li>✔ No middlemen</li>
          </ul>

          <Button className="mt-6" onClick={() => goToApp(navigate)}>
            Find Work
          </Button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} LocalBridge. All rights reserved.
      </footer>
    </div>
  );
}
