import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  LoadingSpinner,
  UncontrolledInput,
  modalTypesKeys,
} from "../ui/shared";
import { useDispatch } from "react-redux";
import { useProducts } from "./hooks/use-products";
import { AddProduct } from "./add-product";
import { EditProduct } from "./edit-prduct";
import { ProductsTable } from "./productsTable";
import {
  openModal,
  productList,
  productReset,
  useProductsStore,
} from "../../store";

export const Products = () => {
  const dispatch = useDispatch();
  const { data, isLoading, refetch } = useProducts();
  const { productCreated } = useProductsStore((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(productList(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (productCreated) {
      refetch();
      dispatch(productReset());
    }
  }, [productCreated, dispatch]);

  const handleOpenModal = () => {
    dispatch(
      openModal({
        modalType: modalTypesKeys.addProduct,
        modalProps: {
          title: "Crear Producto",
          size: "s",
        },
        ModalContent: AddProduct,
      })
    );
  };

  const handleOpenEditModal = (product) => {
    dispatch(
      openModal({
        modalType: modalTypesKeys.editProduct,
        modalProps: {
          title: "Editar Producto",
          size: "s",
          data: product,
        },
        ModalContent: EditProduct,
      })
    );
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container title="Ventas" className="flex flex-col sm:flex-row">
      <div className="pb-3 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full">
        <div className="flex-grow">
          <UncontrolledInput
            variant="primary-search"
            placeholder="Buscar producto"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="w-full sm:w-auto self-center">
          <Button onClick={handleOpenModal} variant="primary" fullWidth>
            Agregar Producto
          </Button>
        </div>
      </div>

      <div className="flex-grow overflow-x-auto">
        {isLoading ? (
          <LoadingSpinner variant="default" />
        ) : (
          <ProductsTable
            handleOpenEditModal={handleOpenEditModal}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </Container>
  );
};
