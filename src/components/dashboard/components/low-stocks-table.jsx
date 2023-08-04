import React from "react";
import { moneyFormat } from "../../../utils/utils";
import { Alert, LoadingSpinner, TD, TR, Table } from "../../ui/shared";
import { useDashboardStocks } from "../hooks/use-dashboard-stocks";

const tableTitles = [
  "#",
  "SKU",
  "Nombre",
  "Marca",
  "Tamaño",
  "Precio",
  "Stock",
];

export const LowStockTable = () => {
  const { data, isLoading, refetch, isError, isRefetching, error } =
    useDashboardStocks();

  return (
    <div className="flex flex-col overflow-x-auto">
      {isLoading && isRefetching ? (
        <LoadingSpinner variant="default" />
      ) : data?.length > 0 ? (
        <Table titles={tableTitles}>
          {data?.map((product, index) => (
            <TR key={product.id}>
              <TD className="text-center">{index + 1}</TD>
              <TD className="text-left">{product.sku}</TD>
              <TD className="text-left">{product.name}</TD>
              <TD className="text-left">{product.brand}</TD>
              <TD className="text-center">{product.size}ml</TD>
              <TD className="text-right">{moneyFormat(product.price)}</TD>
              <TD className="text-right">{product.stock}</TD>
            </TR>
          ))}
        </Table>
      ) : (
        <Alert
          variant={"success"}
          text={"No hay productos fuera de stock."}
          icon={"CheckIcon"}
        />
      )}
    </div>
  );
};
