import React, { forwardRef } from "react";

const DeleteIcon = forwardRef((props, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="currentColor" d="M10 11V17" />
    <path stroke="currentColor" d="M14 11V17" />
    <path stroke="currentColor" d="M4 7H20" />
    <path
      stroke="currentColor"
      d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
    />
    <path
      stroke="currentColor"
      d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
    />
  </svg>
));

export default DeleteIcon;
