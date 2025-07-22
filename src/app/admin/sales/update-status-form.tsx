
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from 'lucide-react';

import { getFirebaseApp } from '@/lib/firebase';
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateShipmentStatus } from '@firebasegen/default-2-connector';

interface UpdateStatusFormProps {
    shipmentId: string;
    currentStatus: string;
}

export default function UpdateStatusForm({ shipmentId, currentStatus }: UpdateStatusFormProps) {
    const [status, setStatus] = useState(currentStatus);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const app = getFirebaseApp();
            const dataConnect = getDataConnect(connectorConfig, { app });
            await updateShipmentStatus(dataConnect, { id: shipmentId, status });
            
            toast({
                title: "¡Éxito!",
                description: "El estado del pedido ha sido actualizado.",
            });
            router.refresh();

        } catch (error) {
            console.error("Error updating status:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo actualizar el estado del pedido.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Select value={status} onValueChange={setStatus} disabled={isLoading}>
                <SelectTrigger>
                    <SelectValue placeholder="Cambiar estado..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="shipped">Enviado</SelectItem>
                    <SelectItem value="delivered">Entregado</SelectItem>
                </SelectContent>
            </Select>
            <Button type="submit" disabled={isLoading || status === currentStatus}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Guardar
            </Button>
        </form>
    )
}
