export const colorVariants = {
  default: "bg-slate-100 text-slate-800",
  primary: "bg-gray-100 text-gray-800",
  danger: "bg-red-100 text-red-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-800",
  secondary: "bg-indigo-100 text-indigo-800",
};

export const Badge = ({ variant = "default", label }) => {
  const color = colorVariants[variant];
  return (
    <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${color}`}>
      {label}
    </span>
  );
};
