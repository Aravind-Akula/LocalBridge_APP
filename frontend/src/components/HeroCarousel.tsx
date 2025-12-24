import { useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    image: "/Images/Vegitable_Farming.png",
    title: "Trusted Local Farming Workers",
    desc: "Hire skilled workers for every farming need",
  },
  {
    image: "/Images/Farming.png",
    title: "Reliable Agricultural Services",
    desc: "Experienced workers for crops & land care",
  },
  {
    image: "/Images/Reliable_Services.png",
    title: "Reliable Home Services",
    desc: "Plumbing, electrician, repairs & more",
  },
  {
    image: "/Images/Construction.png",
    title: "Construction Services",
    desc: "Masons, painters, helpers & more",
  },
];

export default function HeroCarousel() {
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [autoplay.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div
      className="relative"
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.play()}
    >
      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((s, i) => (
            <div key={i} className="flex-[0_0_100%] relative">
              
              {/* IMAGE */}
              <img
                src={s.image}
                alt={s.title}
                className="w-full aspect-[16/9] object-cover object-center"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40 flex items-center">
                <div className="max-w-7xl mx-auto px-6 text-white">
                  <h1 className="text-4xl font-bold">{s.title}</h1>
                  <p className="mt-2 text-lg">{s.desc}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === selectedIndex
                ? "bg-white scale-110"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
