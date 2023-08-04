export const DynamicGrid = ({ children }) => {
  return (
    <div className="grid grid-flow-row auto-cols-max gap-4 overflow-auto">
      {children}
    </div>
  );
};
