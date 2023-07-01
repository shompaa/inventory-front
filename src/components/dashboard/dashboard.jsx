import { moneyFormat } from "../../utils/utils";
import { Container, TD, TR, Table } from "../ui/shared";
import { useDashboardStocks } from "./hooks/use-dashboard-stocks";

const tableTitles = [
  "#",
  "SKU",
  "Nombre",
  "Marca",
  "Tamaño",
  "Precio",
  "Stock",
];

export const Dashboard = () => {
  const { data, isLoading, refetch, isError, isRefetching, error } =
    useDashboardStocks();

  return (
    <Container title="Tablero">
      <div className="grid grid-flow-row auto-cols-max gap-4">
        <div>
          <div className="w-full">
            <Table titles={tableTitles}>
              {data?.map((product, index) => (
                <TR key={product.id}>
                  <TD>{index + 1}</TD>
                  <TD>{product.sku}</TD>
                  <TD>{product.name}</TD>
                  <TD>{product.brand}</TD>
                  <TD>{product.size}ml</TD>
                  <TD>{moneyFormat(product.price)}</TD>
                  <TD>{product.stock}</TD>
                </TR>
              ))}
            </Table>
          </div>
        </div>
      </div>
    </Container>
  );
};
