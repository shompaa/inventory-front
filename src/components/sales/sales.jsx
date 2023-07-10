import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  LoadingSpinner,
  TD,
  TR,
  Table,
  modalTypesKeys,
} from "../ui/shared";
import { useDeleteSale, useSales } from "./hooks/use-sales";
import { useDispatch, useSelector } from "react-redux";
import { openModal, saleReset } from "../../store";
import { dateFormat, moneyFormat } from "../../utils/utils";
import { AddSale } from "./add-sale";
import { InfiniteScroll } from "../ui/shared/pagination/pagination";

const tableTitles = [
  "#",
  "N° compra",
  "N° boleta",
  "Fecha compra",
  "Monto",
  "Vendedor",
  "",
];

export const Sales = () => {
  const dispatch = useDispatch();
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useSales();
  const sales = data?.pages.flatMap((page) => page.data) || [];
  const saleCreated = useSelector((state) => state.sales.saleCreated);
  const { mutateAsync: deleteSaleMutate } = useDeleteSale();

  useEffect(() => {
    if (saleCreated) {
      refetch();
      dispatch(saleReset());
    }
  }, [saleCreated, dispatch]);
  const handleOpenModal = () => {
    dispatch(
      openModal({
        modalType: modalTypesKeys.addSale,
        modalProps: {
          title: "Crear Venta",
        },
        ModalContent: AddSale,
      })
    );
  };

  const handleDeleteSale = async (saleId) => {
    try {
      await deleteSaleMutate(saleId);
      console.log("Venta eliminada con éxito");
      refetch();
    } catch (error) {
      console.error("Error al eliminar la venta", error);
    }
  };

  return (
    <Container title="Ventas" className="flex flex-col sm:flex-row">
      <div className="pb-3 flex-grow">
        <Button onClick={handleOpenModal} variant="primary">
          Agregar Venta
        </Button>
      </div>
      <div className="flex-grow overflow-x-auto">
        {isLoading ? (
          <LoadingSpinner variant="default" />
        ) : (
          <>
            <Table titles={tableTitles}>
              {sales.map((sale, index) => (
                <TR key={sale.id} className="text-xs sm:text-base">
                  <TD>{index + 1}</TD>
                  <TD>{sale.orderId}</TD>
                  <TD>{sale.voucher}</TD>
                  <TD>{dateFormat(sale.date)}</TD>
                  <TD>{moneyFormat(sale.total)}</TD>
                  <TD>{sale.seller.name}</TD>
                  <TD>
                    <Button
                      variant="link-danger"
                      onClick={() => handleDeleteSale(sale.id)}
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
