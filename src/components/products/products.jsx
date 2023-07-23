import React, { useEffect } from "react";
import {
  Button,
  Container,
  LoadingSpinner,
  TD,
  TR,
  Table,
  modalTypesKeys,
} from "../ui/shared";
import { InfiniteScroll } from "../ui/shared/pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { useProducts } from "./hooks/use-products";
import { AddProduct } from "./add-product";
import { moneyFormat } from "../../utils/utils";
import { openModal, productReset } from "../../store";

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

export const Products = () => {
  const dispatch = useDispatch();
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useProducts();
  const products = data?.pages.flatMap((page) => page.data) || [];
  const productCreated = useSelector((state) => state.products.productCreated);

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

  return (
    <Container title="Ventas" className="flex flex-col sm:flex-row">
      <div className="pb-3 flex-grow">
        <Button onClick={handleOpenModal} variant="primary">
          Agregar Producto
        </Button>
      </div>
      <div className="flex-grow overflow-x-auto">
        {isLoading ? (
          <LoadingSpinner variant="default" />
        ) : (
          <>
            <Table titles={tableTitles}>
              {products.map((product, index) => (
                <TR key={product.id} className="text-xs sm:text-base">
                  <TD>{index + 1}</TD>
                  <TD>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-16 w-16"
                    />
                  </TD>
                  <TD>{product.name}</TD>
                  <TD>{product.brand}</TD>
                  <TD>{product.size}ml</TD>
                  <TD>{product.stock}</TD>
                  <TD>{moneyFormat(product.price)}</TD>
                  <TD className="gap-1">
                    <Button
                      variant="link-warning"
                      // onClick={() => handleDeleteSale(sale.id)}
                      className="text-xs sm:text-base"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="link-danger"
                      // onClick={() => handleDeleteSale(sale.id)}
                      className="text-xs sm:text-base"
                    >
                      Eliminar
                    </Button>
                  </TD>
                </TR>
              ))}
            </Table>
            <InfiniteScroll
              hasMore={hasNextPage}
              onLoadMore={() => fetchNextPage()}
            />
          </>
        )}
      </div>
    </Container>
  );
};
