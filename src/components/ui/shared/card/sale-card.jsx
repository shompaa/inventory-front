import React, { useEffect, useState } from "react";
import { moneyFormat } from "../../../../utils/utils";

export const SalesCard = ({
  id,
  brand,
  imageUrl = "https://via.placeholder.com/100",
  name,
  price,
  size,
  stock,
  description,
  quantity: initialQuantity = 1,
  onAdd,
  onRemove,
  onQuantityChange,
  cartQuantity,
  removable = false,
}) => {
  const [quantity, setQuantity] = useState(() => initialQuantity);
  useEffect(() => {
    if (removable && onQuantityChange) {
      onQuantityChange(id, quantity);
    }
  }, [quantity, id, removable, onQuantityChange]);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  return (
    <div
      className={`w-full flex flex-col md:flex-row items-stretch border border-gray-200 rounded ${
        stock <= 5 ? "bg-red-100" : ""
      }`}
      key={id}
    >
      <div
        className="h-24 w-full md:w-24 md:h-auto flex-shrink-0 bg-cover bg-center rounded-t md:rounded-t-none md:rounded-l text-center overflow-hidden border border-gray-200"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        title="name"
      />
      <div className="p-2 flex-1 flex flex-col justify-between leading-tight">
        <div>
          <p className="text-base text-gray-900 flex items-center">{name}</p>
          <p className="text-gray-500 font-normal text-xs">
            {brand} - {size}ml
          </p>
          <p className="hidden md:block text-gray-600 text-xs">{description}</p>
        </div>

        <div>
          <p
            className={`text-xs ${
              stock <= 5 ? "text-red-500" : "text-gray-600"
            }`}
          >
            Stock: {stock}
          </p>
          <div className="flex flex-col md:flex-row md:items-center justify-between mt-2">
            <p className="text-amber-700 font-semibold mb-2 md:mb-0 md:mr-2">
              {moneyFormat(price)}
            </p>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => {
                  const newQuantity = Number(event.target.value);
                  setQuantity(newQuantity);
                  if (removable && onQuantityChange) {
                    onQuantityChange(id, newQuantity);
                  }
                }}
                className="border rounded w-full md:w-16 text-center text-xs h-6 mb-2 md:mb-0"
              />
              {!removable ? (
                <button
                  disabled={cartQuantity >= stock}
                  className={`font-bold py-1 px-2 rounded text-xs mt-2 md:mt-0 w-full md:w-auto ${
                    cartQuantity < stock
                      ? "bg-blue-500 hover:bg-blue-700 text-white"
                      : "bg-gray-400 text-gray-500 cursor-not-allowed"
                  } md:ml-2`}
                  onClick={() => {
                    if (onAdd) {
                      onAdd(
                        { id, brand, imageUrl, name, price, size, stock },
                        quantity
                      );
                      setQuantity(1);
                    }
                  }}
                >
                  Agregar
                </button>
              ) : (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs mt-2 md:mt-0 w-full md:w-auto md:ml-2"
                  onClick={() => onRemove(id)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
