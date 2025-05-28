import React, { useState } from "react";
import { FaKey, FaUtensils, FaMapMarkerAlt, FaTag, FaSprayCan } from "react-icons/fa";

const categories = [
  { key: "cleanliness", label: "Cleanliness", icon: <FaSprayCan size={40} /> },
  { key: "check in", label: "Check in", icon: <FaKey size={40} /> },
  { key: "food", label: "Food", icon: <FaUtensils size={40} /> },
  { key: "location", label: "Location", icon: <FaMapMarkerAlt size={40} /> },
  { key: "value", label: "Value", icon: <FaTag size={40} /> },
];

export default function Rating({ ratings }) {
  const [activeTab, setActiveTab] = useState("overall");

  return (
    <div className="bg-[#f3eceb] border border-gray-300 rounded-xl py-6 px-2 w-full flex flex-col">
      {/* Tab bar for small/medium/large screens */}
      <div className="flex lg:hidden mb-4 border-b border-gray-300">
        <button
          className={`flex-1 py-2 text-center font-semibold ${activeTab === "overall" ? "border-b-2 border-pink-600 text-pink-700" : "text-gray-500"}`}
          onClick={() => setActiveTab("overall")}
        >
          Overall
        </button>
        <button
          className={`flex-1 py-2 text-center font-semibold ${activeTab === "categories" ? "border-b-2 border-pink-600 text-pink-700" : "text-gray-500"}`}
          onClick={() => setActiveTab("categories")}
        >
          Categories
        </button>
      </div>

      {/* Desktop: show both */}
      <div className="hidden lg:flex flex-row items-stretch justify-between w-full divide-x divide-gray-300">
        {/* Overall rating */}
        <div className="flex flex-col items-center justify-center px-6 min-w-[180px]">
          <div className="font-bold text-lg mb-2">overall rating</div>
          <div className="flex flex-col gap-1 w-full">
            {[5, 4, 3, 2, 1].map((num) => (
              <div key={num} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-4">{num}</span>
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    Math.round(ratings.overall) === num
                      ? "bg-gray-800 w-24"
                      : "bg-gray-300 w-16"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Categories */}
        {categories.map((cat, idx) => (
          <div
            key={cat.key}
            className="flex flex-col items-center justify-center px-6 min-w-[140px]"
          >
            <div className="font-bold text-lg mb-1">{cat.label}</div>
            <div className="text-2xl font-extrabold mb-1">{ratings[cat.key]}</div>
            <div className="mb-1">{cat.icon}</div>
          </div>
        ))}
      </div>

      {/* Mobile/Tablet/Laptop: show one at a time */}
      <div className="lg:hidden">
        {activeTab === "overall" && (
          <div className="flex flex-col items-center justify-center px-6 min-w-[180px]">
            <div className="font-bold text-lg mb-2">overall rating</div>
            <div className="flex flex-col gap-1 w-full">
              {[5, 4, 3, 2, 1].map((num) => (
                <div key={num} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-4">{num}</span>
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      Math.round(ratings.overall) === num
                        ? "bg-gray-800 w-24"
                        : "bg-gray-300 w-16"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "categories" && (
          <div className="flex flex-row flex-wrap justify-center w-full">
            {categories.map((cat) => (
              <div
                key={cat.key}
                className="flex flex-col items-center justify-center px-3 min-w-[120px] mb-4"
              >
                <div className="font-bold text-base mb-1">{cat.label}</div>
                <div className="text-xl font-extrabold mb-1">{ratings[cat.key]}</div>
                <div className="mb-1">{cat.icon}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
