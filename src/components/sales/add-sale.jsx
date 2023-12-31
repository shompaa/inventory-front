import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { set, useForm } from "react-hook-form";
import { validateSalesForm } from "./utils/validations";
import { useProducts } from "./hooks/use-products";
import { useCreateSale } from "./hooks/use-sales";
import { Button, Input, LoadingSpinner, UncontrolledInput } from "../ui/shared";
import { SalesCard } from "../ui/shared/card/sale-card";
import { closeModal, saleCreated } from "../../store";
import { moneyFormat } from "../../utils/utils";
import { toast } from "react-toastify";

export const AddSale = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [voucher, setVoucher] = useState("");
  const [search, setSearch] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const dispatch = useDispatch();
  const { data, isLoading, refetch, isError, isRefetching, error } =
    useProducts();
  const { mutateAsync: saleDataMutate } = useCreateSale();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();
  useEffect(() => {
    setTotal(
      products.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      )
    );
  }, [products]);

  useEffect(() => {
    setFocus("search");
  }, []);

  useEffect(() => {
    if (data) {
      setSearchedProducts(data);
    }
  }, [data]);

  useEffect(() => {
    if (search) {
      setSearchedProducts(
        data.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setSearchedProducts(data);
    }
  }, [search, data]);

  const handleAddProduct = (product, quantity) => {
    setProducts((prevProducts) => {
      const productIndex = prevProducts.findIndex((p) => p.id === product.id);

      if (productIndex !== -1) {
        const newProducts = [...prevProducts];
        if (
          newProducts[productIndex].stock <
          newProducts[productIndex].quantity + quantity
        ) {
          return prevProducts;
        }
        newProducts[productIndex].quantity += quantity;
        return newProducts;
      } else {
        if (product.stock < quantity) {
          return prevProducts;
        }
        return [...prevProducts, { ...product, quantity }];
      }
    });
  };

  const handleRemoveProduct = (id) => {
    const product = products.find((product) => product.id === id);

    if (product) {
      setProducts((products) =>
        products.filter((product) => product.id !== id)
      );

      setTotal((total) => total - product.quantity * product.price);
    }
  };

  const handleQuantityChange = useCallback((id, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: newQuantity };
        } else {
          return product;
        }
      })
    );
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCreateSale = async () => {
    try {
      setButtonLoading(true);
      const saleData = {
        products: products.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        })),
        total,
        voucher,
      };
      await saleDataMutate(saleData);
      toast.success("Venta creada con éxito");
      dispatch(closeModal());
      dispatch(saleCreated());
    } catch (error) {
      toast.error("Error al crear la venta");
    }
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div>
          <div className="pb-3">
            <UncontrolledInput
              type="text"
              name="search"
              label="Buscar producto"
              placeholder="Buscar..."
              variant="primary-search"
              onChange={handleSearchChange}
              value={search}
              button={{
                variant: "primary",
                type: "submit",
                children: "Buscar",
                icon: "SearchIcon",
              }}
            />
          </div>
          <div className="overflow-y-auto h-96 grid grid-cols-1 gap-y-2">
            {isLoading ? (
              <LoadingSpinner variant="default" />
            ) : searchedProducts && searchedProducts.length > 0 ? (
              searchedProducts?.map((product) => {
                const cartProduct = products.find((p) => p.id === product.id);
                const cartQuantity = cartProduct ? cartProduct.quantity : 0;
                return (
                  <SalesCard
                    key={product.id}
                    {...product}
                    cartQuantity={cartQuantity}
                    onAdd={handleAddProduct}
                  />
                );
              })
            ) : (
              <div>No se ha encontrado ningun producto</div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="overflow-y-auto">
            {products.map((product) => (
              <SalesCard
                key={product.id}
                {...product}
                quantity={product.quantity}
                onRemove={handleRemoveProduct}
                onQuantityChange={handleQuantityChange}
                removable
              />
            ))}
          </div>
          <div className="flex-shrink-0 w-full p-3 mt-auto">
            <p className="font-mono font-semibold text-xl bg-amber-50">
              Total:{" "}
              <span className="font-normal text-slate-800">
                {moneyFormat(total)}
              </span>
            </p>
            <hr className="my-2" />
            <UncontrolledInput
              name="voucher"
              label="Ingrese el número de comprobante"
              placeholder="Ingrese el número de comprobante"
              variant="primary-search"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
            />
            <hr className="my-2" />
            <Button
              disabled={products.length <= 0 || !voucher}
              onClick={handleCreateSale}
              isLoading={buttonLoading}
              fullWidth
            >
              Agregar venta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
