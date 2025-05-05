# SynProof

SynProof es una aplicación de vanguardia diseñada para aprovechar la blockchain de Avalanche para el monitoreo a gran escala de equipos corporativos. Este proyecto es ideal para centros de datos, universidades y corporaciones que gestionan un gran volumen de computadoras. Al integrar la tecnología blockchain, SynProof garantiza un monitoreo seguro, transparente e inalterable de los dispositivos.

## Descripción del Problema

En grandes organizaciones, como centros de datos, universidades y corporaciones, el monitoreo de miles de dispositivos puede ser un desafío. Los sistemas tradicionales de monitoreo suelen ser centralizados, lo que los hace vulnerables a fallos, manipulaciones y problemas de escalabilidad. Además, la falta de transparencia en los registros puede dificultar la auditoría y el cumplimiento normativo.

## Solución Propuesta

SynProof resuelve estos problemas utilizando la blockchain de Avalanche para proporcionar un sistema de monitoreo descentralizado, seguro y escalable. Al almacenar los datos de monitoreo en una blockchain, se garantiza la inmutabilidad y la transparencia de los registros, lo que facilita la auditoría y mejora la confianza en el sistema.

## Uso de Avalanche

SynProof utiliza la blockchain de Avalanche (L1) para almacenar los datos de monitoreo de manera descentralizada. La implementación se realizó en la red de prueba FujiNet, lo que permite realizar pruebas y validaciones antes de desplegar en la red principal. 

### Instrucciones para Configurar Avalanche

1. **Configurar una Wallet de Avalanche**:
   - Crea una wallet en Core
   - Asegúrate de cambiar a la red de prueba FujiNet.

2. **Crear L1 en la TestNet de Avalanche**:
   - Se puede crear usando el servicio AvaCloud

3. **Configurar el Proyecto**:
   - Asegúrate de que las credenciales de la wallet y la configuración de la red estén correctamente integradas en el proyecto.

4. **Desplegar Contratos**:
   - Utiliza herramientas como Hardhat o Truffle para desplegar los contratos inteligentes en FujiNet.

## Detalles Técnicos Relevantes

### Arquitectura

- **Frontend**: Construido con Next.js para una experiencia de usuario moderna y eficiente.
- **Backend**: Utiliza contratos inteligentes desplegados en la blockchain de Avalanche para gestionar los datos de monitoreo.
- **Blockchain**: Avalanche L1, implementado en la red de prueba FujiNet.

### Tecnologías Utilizadas

- **Next.js**: Framework para el desarrollo del frontend.
- **Avalanche**: Blockchain utilizada para el almacenamiento descentralizado de datos.
- **TypeScript**: Lenguaje utilizado para garantizar un código más robusto y mantenible.
- **Tailwind CSS**: Framework de estilos para un diseño moderno y responsivo.
- **Ethers.js**: Biblioteca para interactuar con la blockchain de Avalanche.

## Comenzando

### Requisitos Previos

Asegúrate de tener instalados los siguientes elementos:

- Node.js (v16 o superior)
- npm, yarn, pnpm o bun (para la gestión de paquetes)

### Instalación

1. Clona el repositorio:
   ```bash
   git clone <repository-url>
   cd SynProof
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   # o
   bun install
   ```

### Ejecutar el Servidor de Desarrollo

Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Caso de Uso

SynProof está diseñado para organizaciones que requieren:

- **Monitoreo en Tiempo Real**: Rastrear el estado y la actividad de los dispositivos en tiempo real.
- **Integridad de Datos**: Garantizar que los datos de monitoreo no puedan ser alterados.
- **Soluciones Escalables**: Gestionar miles de dispositivos de manera eficiente.

## Aprende Más

- [Blockchain de Avalanche](https://www.avax.network/) - Aprende sobre la tecnología blockchain utilizada en este proyecto.
- [Documentación de Next.js](https://nextjs.org/docs) - Explora las características y la API del framework Next.js.

## Contribuciones

Damos la bienvenida a contribuciones para mejorar SynProof. Por favor, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad o corrección de errores.
3. Envía un pull request con una descripción detallada de tus cambios.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## Agradecimientos

- [Avalanche](https://www.avax.network/) por su robusta plataforma blockchain.
- [Next.js](https://nextjs.org/) por el poderoso framework de desarrollo web.
