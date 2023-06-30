import React from "react";

export const TH = ({ label }) => {
  return (
    <th scope="col" className="px-6 py-4 font-medium text-slate-900">
      {label}
    </th>
  );
};

export const TD = ({ children }) => {
  return <td className="px-6 py-4">{children}</td>;
};

export const TR = ({ children }) => {
  return <tr className="hover:bg-gray-50">{children}</tr>;
};

export const Table = ({ titles, children }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            {titles.map((title) => (
              <TH key={title} label={title} />
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {children}
        </tbody>
      </table>
    </div>
  );
};