
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { format } from 'date-fns';
import AdminNav from '../admin-nav';
import UpdateStatusForm from './update-status-form';


async function getSales() {
  try {
    const app = getFirebaseApp();
    const dataConnect = getDataConnect(connectorConfig, { app });
    const { data } = await listSales(dataConnect);
    
    if (!data || !data.saless) {
      return [];
    }
    return data.saless;
  } catch (error) {
    console.error("Error fetching sales:", error);
    return [];
  }
}

export default async function SalesAdminPage() {
  const sales = await getSales();

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
          <Accordion type="single" collapsible className="w-full">
            {sales.length === 0 ? (
              <div className="text-center py-12">
                No se encontraron ventas.
              </div>
            ) : (
              sales.map((sale) => (
                <AccordionItem value={sale.id} key={sale.id}>
                  <AccordionTrigger>
                    <div className="flex justify-between w-full pr-4 text-sm">
                        <span className="font-mono text-xs">{sale.id}</span>
                        <span>{sale.user?.name || 'N/A'}</span>
                        <span>{format(new Date(sale.saleDate), "dd/MM/yyyy")}</span>
                        <span className='font-bold'>S/ {sale.total.toFixed(2)}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 bg-muted/50 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Detalles del Pedido</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Producto</TableHead>
                                <TableHead>Cant.</TableHead>
                                <TableHead className="text-right">Subtotal</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {sale.saleDetailss_on_sale.map(detail => (
                                <TableRow key={detail.id}>
                                  <TableCell>{detail.product.name}</TableCell>
                                  <TableCell>{detail.quantity}</TableCell>
                                  <TableCell className="text-right">S/ {detail.subtotal.toFixed(2)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                         <div>
                          <h4 className="font-semibold mb-2">Envío</h4>
                           <div className="text-sm space-y-2">
                              <p><span className="font-medium">Dirección: </span>{sale.shipments_on_sale?.address || 'No especificada'}</p>
                              <p><span className="font-medium">Ciudad: </span>{sale.shipments_on_sale?.city || 'No especificada'}</p>
                               <div className="pt-2">
                                {sale.shipments_on_sale ? (
                                    <UpdateStatusForm 
                                        shipmentId={sale.shipments_on_sale.id} 
                                        currentStatus={sale.shipments_on_sale.status} 
                                    />
                                 ) : <p>Sin información de envío.</p>}
                               </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            )}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
