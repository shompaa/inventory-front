import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { validateSalesForm } from "./utils/validations";
import { useProductsBySearch } from "./hooks/use-products";
import { useCreateSale } from "./hooks/use-sales";
import { Button, Input, UncontrolledInput } from "../ui/shared";
import { SalesCard } from "../ui/shared/card/sale-card";
import { closeModal, saleCreated } from "../../store";
import { moneyFormat } from "../../utils/utils";
import { toast } from "react-toastify";

export const AddSale = () => {
  const schema = validateSalesForm();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [voucher, setVoucher] = useState("");
  const [search, setSearch] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, refetch, isError, isRefetching, error } =
    useProductsBySearch(search);
  const { mutateAsync: saleDataMutate } = useCreateSale();

  useEffect(() => {
    if (search) {
      refetch().then(() => {
        if (data) {
          setSearchedProducts(data);
        }
      });
    } else {
      setSearchedProducts([]);
    }

    return () => {
      setTotal(0);
      setSearchedProducts([]);
    };
  }, [search, data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setTotal(
      products.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      )
    );
  }, [products]);

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

  const onSubmit = (data) => {
    setSearch(data.search || "");
  };

  const handleCreateSale = async () => {
    try {
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
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="pb-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                register={register}
                schema={schema}
                name="search"
                label="Buscar producto"
                placeholder="Buscar..."
                variant="primary-search"
                button={{
                  variant: "primary",
                  type: "submit",
                  children: "Buscar",
                  icon: "SearchIcon",
                }}
              />
            </form>
          </div>
          <div className="overflow-auto grid grid-cols-1 gap-y-2">
            {searchedProducts.length > 0 ? (
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
              <div>Debes buscar un producto</div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-2">
          <div className="bg-gray-200 border border-slate-200 shadow-sm rounded text-center mb-auto">
            <p className="font-mono font-semibold">
              Total:{" "}
              <span className="font-normal text-slate-800">
                {moneyFormat(total)}
              </span>
            </p>
          </div>
          <div className="overflow-auto grid grid-cols-1 gap-y-2">
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
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3 h-auto">
        <div className="p-2">
          <UncontrolledInput
            name="voucher"
            label="Ingrese el número de comprobante"
            placeholder="Ingrese el número de comprobante"
            variant="primary-search"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
          />
        </div>
        <Button
          disabled={products.length <= 0 || !voucher}
          onClick={handleCreateSale}
          fullWidth
        >
          Agregar venta
        </Button>
      </div>
    </div>
  );
};
