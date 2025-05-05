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

export default function EquipmentDashboard() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true); // Estado para verificar si el usuario es admin
  const [adminChecking, setAdminChecking] = useState(true); // Estado para controlar la carga de la verificación
  const { login, logout, authenticated, user } = usePrivy();

  useEffect(() => {
    if (authenticated) {
      checkAdminStatus();
    }
  }, [authenticated]);

  useEffect(() => {
    if (authenticated && isAdmin) {
      fetchEquipmentData();
    }
  }, [authenticated, isAdmin]);

  // Función para verificar si el usuario es administrador
  const checkAdminStatus = async () => {
    try {
      setAdminChecking(true);

      // Realizar petición al backend para verificar si es admin
      const response = await fetch('/api/checkAdmin', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setIsAdmin(data.isAdmin); // data.isAdmin será true o false según la respuesta del backend
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(true);
    } finally {
      setAdminChecking(false);
    }
  };

  const fetchEquipmentData = async () => {
    try {
      setIsLoading(true);
      // Simulando una llamada a la API con un retraso de 1 segundo
      const response = await fetch('/api/getData', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        const data = await response.json();
        setEquipments(data);
      } else {


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
      }
    } catch (error) {
      console.error('Error fetching equipment data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Si no está autenticado, mostrar botón de login
  if (!authenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button onClick={login} className="btn">Conectar Wallet</button>
      </div>
    );
  }

  // Si está autenticado pero está verificando si es admin
  if (adminChecking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-white">
          Verificando permisos...
        </div>
      </div>
    );
  }

  // Si está autenticado pero no es admin
  if (!isAdmin) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <div className="text-white text-xl">
          No tienes permisos de administrador para acceder a esta página.
        </div>
        <button onClick={logout} className="btn">Desconectar</button>
      </div>
    );
  }

  const address = user?.wallet?.address;
  const getUpdateBadgeVariant = (count: number) => {
    if (count >= 10) return "green";
    if (count >= 5) return "green";
    return "green"
  }

  // Si está autenticado y es admin, mostrar el dashboard
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
        <h1 className="text-4xl font-bold mb-4 text-white">Estado de los equipos</h1>

        {isLoading ? (
          <Loading />
        ) : (
          <Table className="custom-table border-solid" >
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium text-white">ID del equipo</TableHead>
                <TableHead className="font-medium text-white">Número de serial</TableHead>
                <TableHead className="font-medium text-white">Sistema operativo</TableHead>
                <TableHead className="font-medium text-white">Estado actualizaciones</TableHead>
                <TableHead className="font-medium text-white">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipments.map((equipment) => (
                <TableRow key={equipment.id}>
                  <TableCell className="font-mono text-white">{equipment.id}</TableCell>
                  <TableCell className="font-mono text-white">{equipment.serial}</TableCell>
                  <TableCell className="font-mono text-white">{equipment.os}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`bg-${getUpdateBadgeVariant(equipment.pendingUpdates)}-400 text-white border-none px-3 py-1 font-mono`}
                    >
                      {equipment.pendingUpdates} actualizaciones pendientes
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`bg-${equipment.status.toLowerCase() === "actualizando" ? "amber" : "green"}-400 hover:bg-${equipment.status.toLowerCase() === "actualizando" ? "amber" : "green"}-500 text-white border-none font-mono px-3 py-1`}
                    >
                      {equipment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <p className="text-white">Cuenta como Administrador</p>
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