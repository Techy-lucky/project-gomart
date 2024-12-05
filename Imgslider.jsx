import React, { useState, useEffect } from "react";
import slide1 from "../../images/img/slide1.jpg";
import slide2 from "../../images/img/slide2.jpg";
import slide3 from "../../images/img/slide3.jpg";

const Imgslider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [slide1, slide2, slide3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="backdrop-blur-md bg-white/10 p-4 rounded-xl shadow-lg w-[1200px] gap-4 h-[525px]">
      <div className="relative w-full h-[495px] overflow-hidden rounded-xl">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Slide ${index + 1}`}
            className={`absolute w-full h-[525px] object-cover transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        
        <div className="absolute bottom-4 right-4 flex gap-4">
          <button
            onClick={prevSlide}
            className="px-3 py-1 rounded-lg bg-gray-800/80 text-white hover:bg-gray-700/80 transition-all"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="px-3 py-1 rounded-lg bg-gray-800/80 text-white hover:bg-gray-700/80 transition-all"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Imgslider;
