import React, { useState } from "react";
import { Button, Container, TD, TR, Table, modalTypesKeys } from "../ui/shared";
import { useSales } from "./hooks/use-sales";
import { useDispatch } from "react-redux";
import { openModal } from "../../store";

export const Sales = () => {
  const dispatch = useDispatch();
  const { data, isLoading, refetch, isError, isRefetching, error } = useSales();

  const handleOpenModal = () => {
    dispatch(openModal({ modalType: modalTypesKeys.addSale, modalProps: {} }));
  };

  const tableTitles = [
    "#",
    "Nro compra",
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
              <TD>{sale.date}</TD>
              <TD>{sale.total}</TD>
              <TD>{sale.seller.name}</TD>
              <TD>Eliminar</TD>
            </TR>
          ))}
        </Table>
      </div>
    </Container>
  );
};
