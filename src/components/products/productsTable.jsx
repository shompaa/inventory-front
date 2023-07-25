import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  Button,
  LoadingSpinner,
  Pagination,
  TD,
  TR,
  Table,
} from "../ui/shared";
import { productCreated, useProductsStore } from "../../store";
import { moneyFormat } from "../../utils/utils";
import { useDeleteProduct } from "./hooks/use-products";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const tableTitles = [
  "#",
  "Imagen",
  "Nombre",
  "Marca",
  "ml",
  "stock",
  "Precio",
  "",
];

export const ProductsTable = ({ handleOpenEditModal, searchTerm }) => {
  const dispatch = useDispatch();
  const productsStore = useProductsStore((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const { mutateAsync: deleteProductMutate } = useDeleteProduct();
  const productsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (!productsStore || !productsStore.data) {
    return <LoadingSpinner variant="default" />;
  }

  const products = productsStore.data;
  const filteredProducts = products.filter((product) =>
    product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProductMutate(id);
      toast.success("Producto eliminado exitosamente");
      dispatch(productCreated());
    } catch (error) {
      console.log(error);
    }
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const selectedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <>
      <Table titles={tableTitles}>
        {selectedProducts.map((product, index) => (
          <TR key={product.id} className="text-xs sm:text-base">
            <TD>{startIndex + index + 1}</TD>
            <TD>
              <LazyLoadImage
                src={product.imageUrl}
                alt={product.name}
                className="h-16 w-16"
                loading="lazy"
                placeholderSrc={"src/assets/images/noImage.png"}
              />
            </TD>
            <TD>{product.name}</TD>
            <TD>{product.brand}</TD>
            <TD>{product.size}ml</TD>
            <TD>{product.stock}</TD>
            <TD>{moneyFormat(product.price)}</TD>
            <TD className={"flex justify-center"}>
              <Button
                variant="link-warning"
                icon="EditIcon"
                onClick={() => handleOpenEditModal(product)}
              >
                Editar
              </Button>
              <Button
                variant="link-danger"
                icon="DeleteIcon"
                onClick={() => handleDeleteProduct(product.id)}
              >
                Eliminar
              </Button>
            </TD>
          </TR>
        ))}
      </Table>

      <div className="text-center">
        <Pagination
          total={filteredProducts.length}
          current={currentPage}
          onPageChange={handlePageChange}
          productsPerPage={productsPerPage}
        />
      </div>
    </>
  );
};
