
import { getFirebaseApp } from '@/lib/firebase';
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSales } from '@firebasegen/default-2-connector';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import AdminNav from '../admin-nav';

async function getSales() {
  try {
    const app = getFirebaseApp();
    const dataConnect = getDataConnect(connectorConfig, { app });
    const { data } = await listSales(dataConnect);
    
    if (!data || !data.sales) {
      return [];
    }
    return data.sales;
  } catch (error) {
    console.error("Error fetching sales:", error);
    return [];
  }
}

export default async function SalesAdminPage() {
  const sales = await getSales();

  const getStatusVariant = (status: string | null | undefined) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'shipped':
        return 'default';
      case 'delivered':
        return 'outline'; // Success-like variant
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container mx-auto py-10">
      <AdminNav />
      <Card>
        <CardHeader>
          <CardTitle>Ventas y Pedidos</CardTitle>
          <CardDescription>
            Una lista de todas las ventas realizadas en la tienda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Venta</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado Envío</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No se encontraron ventas.
                  </TableCell>
                </TableRow>
              ) : (
                sales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-mono text-xs">{sale.id}</TableCell>
                    <TableCell className="font-medium">{sale.user?.name || 'N/A'}</TableCell>
                    <TableCell>{sale.user?.email}</TableCell>
                    <TableCell>
                      {format(new Date(sale.saleDate), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>S/ {sale.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(sale.shipment?.status)}>
                        {sale.shipment?.status || 'No enviado'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
