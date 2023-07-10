import LoaderIcon from "../icons/svg-icon/loading";

const COLORS = {
  primary: "blue-600",
  info: "teal-400",
  default: "slate-800",
  warning: "amber-600",
  danger: "red-600",
  success: "green-600",
};

export const LoadingSpinner = ({ variant = "default" }) => {
  const color = COLORS[variant];
  return (
    <div className="flex flex-col items-center justify-center space-y-2 py-4 px-6 bg-white shadow-md rounded-lg">
      <LoaderIcon fill={color} className="w-10 h-10 animate-spin" />
      <p className="text-sm font-medium">Cargando...</p>
    </div>
  );
};
