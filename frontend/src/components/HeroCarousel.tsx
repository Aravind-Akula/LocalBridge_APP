import { useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    image: "/Images/Vegitable_Farming.png",
    title: "Local Farming Workers",
    desc: "Skilled help for daily agricultural work",
  },
  {
    image: "/Images/Farming.png",
    title: "Agricultural Services",
    desc: "Trusted workers for crops & land care",
  },
  {
    image: "/Images/Reliable_Services.png",
    title: "Home Services",
    desc: "Plumbing, electrical & repairs",
  },
  {
    image: "/Images/Construction.png",
    title: "Construction Work",
    desc: "Masons, painters & helpers",
  },
  {
    image: "/Images/Events_Carousal.png",
    title: "Event Support",
    desc: "Catering, lighting & decoration",
  }
];

export default function HeroCarousel({
  minimalText = false,
}: {
  minimalText?: boolean;
}) {
  const autoplay = useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false })
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
      className="relative rounded-2xl overflow-hidden"
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.play()}
    >
      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((s, i) => (
            <div
              key={i}
              className="flex-[0_0_100%] relative"
            >
              {/* IMAGE */}
              <img
                src={s.image}
                alt={s.title}
                className="w-full aspect-[16/9] object-cover"
              />

              {/* SOFT GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

              {/* TEXT – SUBTLE & APP-LIKE */}
              {!minimalText && (
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="max-w-md">
                    <h2 className="text-white text-xl font-semibold leading-snug">
                      {s.title}
                    </h2>
                    <p className="text-white/80 text-sm mt-1">
                      {s.desc}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-4 right-6 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
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
