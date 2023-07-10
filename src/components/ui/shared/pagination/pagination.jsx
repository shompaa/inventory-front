import React from "react";

export const InfiniteScroll = ({ hasMore, onLoadMore }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={onLoadMore}
        disabled={!hasMore}
        className={`px-8 py-2 font-semibold rounded-lg ${
          hasMore
            ? "bg-slate-700 text-white hover:bg-slate-600"
            : "bg-slate-300 text-slate-400 cursor-not-allowed"
        }`}
      >
        Load More
      </button>
    </div>
  );
};
