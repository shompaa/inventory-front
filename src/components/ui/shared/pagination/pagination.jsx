import React from "react";
import { Button } from "../button/button";

export const InfiniteScroll = ({ hasMore, onLoadMore }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={onLoadMore}
        disabled={!hasMore}
        className={`px-8 py-2 font-semibold rounded-lg ${
          hasMore
            ? "bg-slate-700 text-amber-500 hover:bg-slate-600"
            : "bg-slate-300 text-slate-400 cursor-not-allowed"
        }`}
      >
        Cargar más...
      </button>
    </div>
  );
};

export const Pagination = ({
  total,
  current,
  onPageChange,
  productsPerPage,
}) => {
  const pages = Math.ceil(total / productsPerPage);
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <nav className="m-4">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            disabled={current === 1}
            onClick={() => onPageChange(current - 1)}
            className={`rounded-l-lg flex items-center justify-center px-3 h-8 ml-0 leading-tight ${
              current === 1
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "text-amber-500 bg-slate-900 hover:bg-amber-500 hover:text-slate-900"
            }`}
          >
            Anterior
          </button>
        </li>
        {pageNumbers.map((page) => (
          <li key={page} className="hidden md:block">
            <button
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center px-3 h-8 ${
                page === current
                  ? "bg-amber-500 text-slate-900"
                  : "bg-slate-900 text-amber-500 hover:bg-amber-500 hover:text-slate-900"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={current === pages}
            onClick={() => onPageChange(current + 1)}
            className={`flex items-center justify-center px-3 h-8 leading-tight rounded-r-lg ${
              current === pages
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "text-amber-500 bg-slate-900 hover:bg-amber-500 hover:text-slate-900"
            }`}
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
};
