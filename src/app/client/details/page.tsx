"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface SoftwareVersion {
  name: string
  currentVersion: string
  latestVersion: string
}

interface DeviceInfo {
  id: string
  serialNumber: string
  operatingSystem: string
  softwareVersions: SoftwareVersion[]
  isUpdating: boolean
}

export default function DeviceInfoPage() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    id: "7e0efe28e710a775596d3b93c8c26509",
    serialNumber: "NHQ59AL00H9480D4F83400",
    operatingSystem: "NixOS",
    softwareVersions: [
      { name: "zellij", currentVersion: "8.0.1", latestVersion: "8.2.1" },
      { name: "neovim", currentVersion: "2.3.0", latestVersion: "2.3.11" },
      { name: "alacritty", currentVersion: "4.3.22", latestVersion: "4.3.23" },
      { name: "firefox", currentVersion: "1.2.33", latestVersion: "1.2.34" },
      { name: "chromium", currentVersion: "3.4.5", latestVersion: "4.0.1" },
    ],
    isUpdating: true,
  })

  const pendingUpdatesCount = deviceInfo.softwareVersions.filter(
    (software) => software.currentVersion !== software.latestVersion,
  ).length
  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">Equipo {deviceInfo.serialNumber}</h1>

      <Card>
        <CardHeader>
          <CardTitle>ID del equipo</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{deviceInfo.id}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Numero de serial</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{deviceInfo.serialNumber}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sistema operativo</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{deviceInfo.operatingSystem}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Estado actualizaciones</CardTitle>
          {pendingUpdatesCount > 0 && (
            <Badge variant="warning" className="bg-[#fbbf24] hover:bg-[#f59e0b]">
              {pendingUpdatesCount} actualizaciones pendientes
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre del programa</TableHead>
                <TableHead>Version actual</TableHead>
                <TableHead>Version mas reciente</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deviceInfo.softwareVersions.map((software, index) => (
                <TableRow key={software.name}>
                  <TableCell className="w-full">{software.name}</TableCell>
                  <TableCell className="w-1/3 text-right">{software.currentVersion}</TableCell>
                  <TableCell className="w-1/3 text-right">{software.latestVersion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estado</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Badge
            variant="warning"
            className={`${deviceInfo.isUpdating ? "bg-[#fbbf24]" : "bg-green-500"} hover:bg-[#f59e0b]`}
          >
            {deviceInfo.isUpdating ? "Actualizando" : "Actualizado"}
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}

