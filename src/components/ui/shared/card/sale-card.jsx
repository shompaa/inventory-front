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
      className={`w-full flex items-center border border-gray-200 rounded h-24 ${
        stock <= 5 ? "bg-red-100" : ""
      }`}
      key={id}
    >
      <div
        className="h-24 w-24 lg:h-24 lg:w-24 bg-cover bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden border border-gray-200"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        title="name"
      />
      <div className="p-2 flex flex-col justify-between leading-tight flex-grow">
        <div className="mb-2">
          <p className="text-base text-gray-600 flex items-center">
            <span className="text-gray-900 font-semibold text-base">
              {name}
            </span>
            <span className="ml-2 text-gray-500 font-normal text-xs">
              - {brand}
            </span>
          </p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">{size}ml</span>
            <span className="text-amber-700 font-semibold">
              {moneyFormat(price)}
            </span>
          </div>
          <p
            className={`text-xs ${
              stock <= 5 ? "text-red-500" : "text-gray-600"
            }`}
          >
            Stock: {stock}
          </p>
        </div>
      </div>
      <div className="p-2 flex flex-col justify-end">
        <div className="flex items-center justify-end">
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
            className="border rounded w-16 text-center text-xs h-6"
          />
          {!removable ? (
            <button
              disabled={cartQuantity >= stock}
              className={`font-bold py-1 px-2 rounded text-xs ml-2 ${
                cartQuantity < stock
                  ? "bg-blue-500 hover:bg-blue-700 text-white"
                  : "bg-gray-400 text-gray-500 cursor-not-allowed"
              }`}
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
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs ml-2"
              onClick={() => onRemove(id)}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
