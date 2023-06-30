import React, { useState } from "react";
import { Button, Container, TD, TR, Table, Modal } from "../ui/shared";
import { useSales } from "./hooks/use-sales";
import { AddSale } from "./add-sale";

export const Sales = () => {
  const { data, isLoading, refetch, isError, isRefetching, error } = useSales();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        size="m"
        title="Agregar Venta"
      >
        <AddSale />
      </Modal>
    </Container>
  );
};
