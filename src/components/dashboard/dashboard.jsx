import { Container } from "../ui/shared";
import { DynamicGrid, LowStockTable } from "./components";

export const Dashboard = () => {
  return (
    <Container title="Tablero" className="flex flex-col sm:flex-row">
      <DynamicGrid>
        <LowStockTable />
      </DynamicGrid>
    </Container>
  );
};
