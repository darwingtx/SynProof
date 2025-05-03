"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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

  const updateSoftware = (index: number) => {
    const updatedVersions = [...deviceInfo.softwareVersions]
    updatedVersions[index] = {
      ...updatedVersions[index],
      currentVersion: updatedVersions[index].latestVersion,
    }

    setDeviceInfo({
      ...deviceInfo,
      softwareVersions: updatedVersions,
    })
  }

  const updateAllSoftware = () => {
    const updatedVersions = deviceInfo.softwareVersions.map((software) => ({
      ...software,
      currentVersion: software.latestVersion,
    }))

    setDeviceInfo({
      ...deviceInfo,
      softwareVersions: updatedVersions,
      isUpdating: false,
    })
  }

  const toggleUpdateStatus = () => {
    setDeviceInfo({
      ...deviceInfo,
      isUpdating: !deviceInfo.isUpdating,
    })
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
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
                <TableHead className="text-right">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deviceInfo.softwareVersions.map((software, index) => (
                <TableRow key={software.name}>
                  <TableCell>{software.name}</TableCell>
                  <TableCell>{software.currentVersion}</TableCell>
                  <TableCell>{software.latestVersion}</TableCell>
                  <TableCell className="text-right">
                    {software.currentVersion !== software.latestVersion && (
                      <Button variant="outline" size="sm" onClick={() => updateSoftware(index)}>
                        Actualizar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {pendingUpdatesCount > 0 && (
            <div className="mt-4 flex justify-end">
              <Button onClick={updateAllSoftware}>Actualizar todo</Button>
            </div>
          )}
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
          <Button variant="outline" size="sm" onClick={toggleUpdateStatus}>
            {deviceInfo.isUpdating ? "Marcar como actualizado" : "Marcar como actualizando"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

