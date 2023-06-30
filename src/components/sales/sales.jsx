import React, { useEffect, useState } from "react";
import { Button, Container, TD, TR, Table, modalTypesKeys } from "../ui/shared";
import { useSales } from "./hooks/use-sales";
import { useDispatch, useSelector } from "react-redux";
import { openModal, saleReset } from "../../store";
import { dateFormat, moneyFormat } from "../../utils/utils";

export const Sales = () => {
  const dispatch = useDispatch();
  const { data, isLoading, refetch, isError, isRefetching, error } = useSales();
  const saleCreated = useSelector((state) => state.sales.saleCreated);

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
      })
    );
  };

  const tableTitles = [
    "#",
    "N° compra",
    "N° boleta",
    "Fecha compra",
    "Monto",
    "Vendedor",
    "",
  ];
  return (
    <Container title="Ventas">
      <div className="pb-3">
        <Button onClick={handleOpenModal} variant="primary">
          Agregar Venta
        </Button>
      </div>
      <div>
        <Table titles={tableTitles}>
          {data?.map((sale, index) => (
            <TR key={sale.id}>
              <TD>{index + 1}</TD>
              <TD>{sale.orderId}</TD>
              <TD>{sale.voucher}</TD>
              <TD>{dateFormat(sale.date)}</TD>
              <TD>{moneyFormat(sale.total)}</TD>
              <TD>{sale.seller.name}</TD>
              <TD>Eliminar</TD>
            </TR>
          ))}
        </Table>
      </div>
    </Container>
  );
};
