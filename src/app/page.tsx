"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
