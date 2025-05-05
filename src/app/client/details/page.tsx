"use client"

import "./style.css";
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Loading from "../components/Loanding";

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
  const [isUser, setIsUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para verificar si el usuario es User (comienza como falso)
  const [userChecking, setUserChecking] = useState(true); // Estado para controlar la carga de la verificación
  const [deviceInfo,setDeviceInfo] = useState<DeviceInfo>({
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
  });

  useEffect(() => {
    checkUserStatus();
  }, []);  

  useEffect(() => {
    if (isUser) {
      fetchData();
    }
  }, [isUser]);

  const checkUserStatus = async () => {
    try {
      setUserChecking(true);

      // Realizar petición al backend para verificar si es User
      const response = await fetch('/api/checkUser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setIsUser(data.isUser); // data.isUser será true o false según la respuesta del backend
      } else {
        setIsUser(true);
      }
    } catch (error) {
      console.error('Error checking User status:', error);
      setIsUser(true);
    } finally {
      setUserChecking(false);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // Simulando una llamada a la API con un retraso de 1 segundo
      const response = await fetch('/api/getPcData', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        const data = await response.json();
        setDeviceInfo(data)
      } else {

      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Si está verificando si es usuario
  if (userChecking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse">
          Verificando permisos...
        </div>
      </div>
    );
  }

  // Si no es usuario
  if (!isUser) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <div className="text-xl">
          No tienes permisos de usuario para acceder a esta página.
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Volver
        </button>
      </div>
    );
  }

  const pendingUpdatesCount = deviceInfo.softwareVersions.filter(
    (software) => software.currentVersion !== software.latestVersion,
  ).length

  // Si es usuario, mostrar la información del dispositivo
  return (
    <div className="container mx-auto py-10 space-y-6">
      
      <h1 className="text-3xl font-bold">Equipo <span className="font-mono">{deviceInfo.serialNumber}</span></h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ID del equipo</CardTitle>
          </CardHeader>
          <CardContent className="font-mono">
            <p>{deviceInfo.id}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Numero de serial</CardTitle>
          </CardHeader>
          <CardContent className="font-mono">
            <p>{deviceInfo.serialNumber}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sistema operativo</CardTitle>
          </CardHeader>
          <CardContent className="font-mono">
            <p>{deviceInfo.operatingSystem}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row align-center justify-between">
            <CardTitle>Estado</CardTitle>
            <Badge
              variant="warning"
              className={`${deviceInfo.isUpdating ? "bg-[#fbbf24]" : "bg-green-500"} hover:bg-[#f59e0b]`}
            >
              {deviceInfo.isUpdating ? "Actualizando" : "Actualizado"}
            </Badge>
          </CardHeader>
        </Card>
      </div>

      {/* Card de actualizaciones que ocupa toda la sección */}
      <Card className="w-full">
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
              {deviceInfo.softwareVersions.map((software) => (
                <TableRow key={software.name}>
                  <TableCell className="w-full font-mono">{software.name}</TableCell>
                  <TableCell className="w-1/3 text-right font-mono">{software.currentVersion}</TableCell>
                  <TableCell className="w-1/3 text-right font-mono">{software.latestVersion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
      
  )
}