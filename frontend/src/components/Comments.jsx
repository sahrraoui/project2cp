import React from "react";

export default function Comments({ reviews, showAll, onToggleShowAll }) {
  return (
    <div className="w-full">
      <h2 className="font-bold text-2xl mb-3 text-center">Comments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
        {(showAll ? reviews : reviews.slice(0, 2)).map((rev, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow flex flex-col gap-3 w-full max-w-md"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xl">
                {rev.user[0]}
              </span>
              <span className="font-semibold text-lg">{rev.user}</span>
              <span className="text-base text-gray-400">
                ...{rev.daysAgo} days ago
              </span>
            </div>
            <div className="text-gray-700 text-lg">{rev.text}</div>
          </div>
        ))}
      </div>
      <button
        className="mt-4 text-pink-700 underline text-lg block mx-auto"
        onClick={onToggleShowAll}
      >
        {showAll ? "Show less" : "Show all reviews"}
      </button>
    </div>
  );
}
