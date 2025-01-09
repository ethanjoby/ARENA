import React, { useState } from "react";

const HeroSection = () => {
  // Define items with associated GIF URLs
  const items = [
    {
      text: "Essay Help.",
      gif: "",
    },
    {
      text: "Unlimited Resources.",
      gif: "",
    },
    {
      text: "Contacts.",
      gif: "",
    },
  ];

  // State to manage the current background GIF
  const [backgroundGif, setBackgroundGif] = useState(items[0].gif);

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-black text-white"
      style={{
        backgroundImage: `url(${backgroundGif})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background 0.5s ease-in-out",
      }}
    >
      {/* Title */}
      <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 bg-black bg-opacity-70 p-4 rounded-lg">
        Welcome to ARENA
      </h1>

      {/* Interactive Words */}
      <div className="flex gap-12 text-2xl sm:text-4xl font-bold">
        {items.map((item, index) => (
          <div
            key={index}
            className="group relative cursor-pointer"
            onClick={() => setBackgroundGif(item.gif)} // Update GIF on click
          >
            <span className="z-10">{item.text}</span>

            {/* Animated underline */}
            <span className="absolute left-0 top-full mt-2 w-full h-[2px] bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;



