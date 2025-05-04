"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {usePrivy} from '@privy-io/react-auth';
import Nav from '@/components/ui/nav'
export default function EquipmentDashboard() {
  const equipments = [
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
  ]

  const { login, logout, authenticated, user } = usePrivy();
  if (!authenticated) {
    return (
        <div>
          <p className="text-center text-white">Need to login with  your wallet</p>
          <button type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={login}
          >
            Login
          </button>
        </div>
    )
        ;
  }
  const address = user?.wallet?.address;
  const getUpdateBadgeVariant = (count: number) => {
    if (count >= 10) return "green";
    if (count >= 5) return "green";
    return "green"
  }

  return (
      <div className="p-6 max-w-full">
        <h1 className="text-4xl font-bold mb-8">Estado de los equipos</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">ID del equipo</TableHead>
              <TableHead className="font-medium">Numero de serial</TableHead>
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
                        className={`
                    bg-${getUpdateBadgeVariant(equipment.pendingUpdates)}-400
                    text-black border-none px-3 py-1 font-mono
                  `}
                    >{equipment.pendingUpdates} actualizaciones pendientes</Badge>
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