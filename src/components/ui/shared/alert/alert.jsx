import React from "react";
import { Icon } from "../icons/icon-component";

const variants = {
  info: "text-blue-800 border-blue-300 bg-blue-200",
  danger: "text-red-800 border-red-300 bg-red-300 border opacity-85",
  success: "text-green-800 border-green-300 bg-green-200",
  warning: "text-yellow-800 border-yellow-300 bg-yellow-200",
  dark: "text-gray-800 border-gray-300 bg-gray-200",
};

export const Alert = ({ variant, icon, text }) => {
  const classes = variants[variant] || {};

  return (
    <div
      className={`flex justify-center p-2 text-sm ${classes} rounded-lg w-full items-center`}
      role="alert"
    >
      {icon && (
        <Icon variant={`${variant}-outlined`} iconActive={false} icon={icon} />
      )}
      <div>{text}</div>
    </div>
  );
};
