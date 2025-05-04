"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {usePrivy} from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import './styles.css';

interface Equipment {
  id: string;
  serial: string;
  os: string;
  pendingUpdates: number;
  status: string;
}

export default function EquipmentDashboard() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { login, logout, authenticated, user } = usePrivy();

  useEffect(() => {
    if (authenticated) {
      fetchEquipmentData();
    }
  }, [authenticated]);

  const fetchEquipmentData = async () => {
    try {
      setIsLoading(true);
      // Simulando una llamada a la API con un retraso de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Datos placeholder
      const placeholderData: Equipment[] = [
        {
          id: "7e0efe28e710a775596d3b93c8c26509",
          serial: "NHQ59AL00H9480D4F83400",
          os: "NixOS",
          pendingUpdates: 13,
          status: "Actualizando",
        },
        {
          id: "7e0efe28e710a775596d3b93c8c26510",
          serial: "NHQ59AL00H9480D4F83401",
          os: "Ubuntu",
          pendingUpdates: 2,
          status: "Actualizando",
        },
        {
          id: "7e0efe28e710a775596d3b93c8c26511",
          serial: "NHQ59AL00H9480D4F83402",
          os: "Alpine",
          pendingUpdates: 9,
          status: "Actualizando",
        },
        {
          id: "7e0efe28e710a775596d3b93c8c26512",
          serial: "NHQ59AL00H9480D4F83403",
          os: "Manjaro",
          pendingUpdates: 2,
          status: "Actualizando",
        },
        {
          id: "7e0efe28e710a775596d3b93c8c26513",
          serial: "NHQ59AL00H9480D4F83404",
          os: "NixOS",
          pendingUpdates: 13,
          status: "Actualizando",
        },
      ];

      setEquipments(placeholderData);
    } catch (error) {
      console.error('Error fetching equipment data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!authenticated) {
    return <button onClick={login}>Conectar Wallet</button>;
  }

  const address = user?.wallet?.address;
  const getUpdateBadgeVariant = (count: number) => {
    if (count >= 10) return "green";
    if (count >= 5) return "green";
    return "green"
  }

  return (
    <div className="p-6 max-w-full">
      {/* Contenedor de conexión y botones */}
      <div className="connection-container mb-8">
        <div className="button-row">
          <button onClick={() => fetchBalance(address!)} className="btn">Consultar balance</button>
          <button onClick={logout} className="btn">Desconectar</button>
        </div>
      </div>
    
      {/* Contenedor de la tabla */}
      <div className="table-container">
        <h1 className="text-4xl font-bold mb-4">Estado de los equipos</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-500">
              Cargando datos...
            </div>
          </div>
        ) : (
          <Table className="custom-table">
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">ID del equipo</TableHead>
                <TableHead className="font-medium">Número de serial</TableHead>
                <TableHead className="font-medium">Sistema operativo</TableHead>
                <TableHead className="font-medium">Estado actualizaciones</TableHead>
                <TableHead className="font-medium">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipments.map((equipment) => (
                <TableRow key={equipment.id}>
                  <TableCell className="font-mono">{equipment.id}</TableCell>
                  <TableCell className="font-mono">{equipment.serial}</TableCell>
                  <TableCell className="font-mono">{equipment.os}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`bg-${getUpdateBadgeVariant(equipment.pendingUpdates)}-400 text-black border-none px-3 py-1 font-mono`}
                    >
                      {equipment.pendingUpdates} actualizaciones pendientes
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`bg-${equipment.status.toLowerCase() === "actualizando" ? "amber" : "green"}-400 hover:bg-${equipment.status.toLowerCase() === "actualizando" ? "amber" : "green"}-500 text-black border-none font-mono px-3 py-1`}
                    >
                      {equipment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <p>Cuenta como Administrador</p>
      </div>
    </div>
  )
}

async function fetchBalance(address: string) {
  const body = JSON.stringify({ address });
  console.log(body);
  const res = await fetch('/api/balance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  });
  const data = await res.json();
  console.log('Balance:', data);
}