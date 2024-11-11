# API de Catálogo de Transceptores

Esta API permite gestionar un catálogo de transceptores, permitiendo crear, listar, actualizar y eliminar transceptores. El proyecto está desarrollado utilizando **Node.js**, **Express**, **TypeScript**, y documentado utilizando **Swagger AUN PENDIENTE DE IMPLEMENTACION**.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Scripts](#scripts)
- [Configuración](#configuración)
- [Endpoints](#endpoints)
  - [Centrales](#centrals)
    - [Crear una Central](#crear-una-central)
    - [Buscar Centrales](#buscar-centrales)
  - [Catalogo](#catalog)
    - [Placas](#placas)
        - [Crear Catalogo de una Placa](#crear-un-catalogo-de-una-placa)
        - [Buscar Transceivers](#buscar-transceivers)
        - [Buscar Transceivers por ID](#buscar-transceiver-por-id)
        - [Modificar Datos de Transceivers](#modificar-datos-de-un-transceiver)
        - [Eliminar un Transceivers](#eliminar-un-transceiver)
    - [Transdceivers](#transceivers)
        - [Crear un Transceiver](#crear-un-transceiver)
        - [Buscar Transceivers](#buscar-transceivers)
        - [Buscar Transceivers por ID](#buscar-transceiver-por-id)
        - [Modificar Datos de Transceivers](#modificar-datos-de-un-transceiver)
        - [Eliminar un Transceivers](#eliminar-un-transceiver)

- [Documentación de la API](#documentación-de-la-api) <!-- TODO: Crear utilizando Swagger -->
- [Licencia](#licencia)

## Requisitos

Antes de empezar, asegúrate de tener los siguientes requisitos instalados en tu sistema:

- [Node.js](https://nodejs.org/en/) v14 o superior
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

1. Clona este repositorio:
    ```bash
    git clone https://github.com/martindconte/MERN_TS.git
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd backend
    ```

3. Instala las dependencias del proyecto en cada una de las carpetas:
    ```bash
    npm install
    ```
    o si usas Yarn:
    ```bash
    yarn install
    ```

4. Configura las variables de entorno (crea un archivo `.env` basado en `.env.example`):
    ```bash
    cp .env.example .env
    ```

5. Inicia el servidor:
    ```bash
    npm run dev
    ```

## Scripts

- `npm run build`: Compila el proyecto TypeScript.
- `npm run dev`: Inicia el servidor en modo desarrollo utilizando `nodemon`.
- `npm run start`: Inicia el servidor en producción.

## Configuración

Las variables de entorno necesarias para el funcionamiento de la aplicación se encuentran en el archivo `.env`. Un ejemplo de estas variables está en el archivo `.env.example`.

<hr style="border: 3px solid red; margin-bottom: 20px;">

# <p style="color: red;">Endpoints</p>

## <p style="color: blue">Centrals</p>

## Crear una Central

**URL:** `/api/central`  
**Método:** `POST`
**Descripción:** Este endpoint permite ***CREAR*** una **Central**

**Cuerpo del request:**

| Campo | Tipo | Descripción | Obligatorio | Validaciones | Valor Default | Ejemplo |
|-------|------|-------------|-------------|--------------|---------|---------|
| `centralName` | `String` | Nombre de la Central | Sí | Se Verifica que se ingrese el valor del tipo String | Obligatorio | "Barracas" |
| `codeName` | `String` | Codigo de Centro (Asociado a IU) | Si | Valor Unico | Obligatorio | "B.BRR" |
| `siteCode` | `String` | Codigo de Emplazamiento | Si | Valor Unico | Obligatorio | "ARCF0281" |
| `provinceName` | `String` | Provincia | No | Debe ser String | `''` | Buenos Aires |
| `districtName` | `String` | Localidad | No | Debe ser String | `''` | CABA |
| `localityName` | `String` | Localidad | No | Debe ser String | `''` | CABA |
| `address` | `String`| Domicilio | No | Debe ser String | `''` | Isabel la Católica No. 1374 |
| `latitude` | `float`| Latitud | No | Debe ser Numero | 0 | -34.644789577920875 |
| `longitude` | `float`| Longitud | No | Debe ser Numero | 0 | -58.37194540022318 |
| `description` | `String` | Descripción de la Central | No |  Debe ser String | `''` | Central Barracas TASA 
| `observations`| `String` | Observaciones adicionales sobre la central | No |  Debe ser String | `''` | "Centro CORE TASA" |
| `owner`| `String` | Propietario de la central | No | Valores permitidos `enum CentralOwnerEnum [ 'TASA', 'MVS', 'OTHER' ]` | 'TASA' | "MVS" |
| `status`  | `Boolean` | Estado de la Central (true = Activa / false = Desafectada) | No | Debe ser boolean | `true` | true |
| `isDeleted`  | `Boolean` | Estado de la Central es la BASE DE DATOS. Si una central es ELIMINADA isDeleted pasa a true. Se utiliza este valor para no perder referencias | No | Debe ser boolean. Cuando se crea, modifica una central no se podra modificar el valor. Solo pasara a false con el **Método:** `DELETE` | `false` | true |

### Example Request
```json
{
  "centralName": "Barracas",
  "codeName": "B.BRR",
  "siteCode": "ARCF0281",
  "provinceName": "Buenos Aires",
  "districtName": "CABA",
  "localityName": "CABA",
  "address": "Isabel la Católica No. 1374",
  "latitude": -34.644789577920875,
  "longitude": -58.37194540022318,
  "description": "Central Barracas TASA ",
  "observations": "Centro CORE TASA",
  "owner": "TASA",
  "status": true
}
```

### Example Response
```json
{
    "status": "success",
    "msg": "The Central has been successfully created",
    "payload": {
        "id": "672c2aa09360616006a8c13d",
        "centralName": "Barracas",
        "codeName": "B.BRR",
        "siteCode": "ARCF0281",
        "owner": "TASA",
        "status": true,
        "provinceName": "BUENOS AIRES",
        "districtName": "CABA",
        "localityName": "CABA",
        "address": "Isabel la Católica No. 1374",
        "latitude": -34.644789577920875,
        "longitude": -58.37194540022318,
        "description": "Central Barracas TASA",
        "observations": "Centro CORE TASA",
        "createdAt": "2024-11-07T02:49:04.109Z",
        "updatedAt": "2024-11-07T02:49:04.109Z"
    }
}
```
_________________________

## Buscar Centrales

**URL:** `/api/central`  
**Método:** `GET`  
**Descripción:** Este endpoint permite obtener la lista de ***Centrales*** almacenados en base de daots. Puede utilizar parámetros de paginación opcionales para limitar la cantidad de registros retornados y navegar por páginas.

**Parametros de Consulta**

| Parámetro      | Tipo de Dato | Descripción                                     | Ejemplo              | Tipo de Busqueda | Obligatorio |
|----------------|--------------|-------------------------------------------------|----------------------|------------------|-------------|
| `limit`        | `int`        | Cantidad de registros a devolver por página     | `10`                 | Exacta           | No          |
| `page`         | `int`        | Número de la página a consultar                 | `2`                  | Exacta           | No          |
| `centralName`  | `string`     | Nombre de la Central                            | `Cuyo`               | Parcial          | No          |
| `codeName`     | `string`     | Codigo de la Central (IU)                       | `B.CYO`              | Parcial          | No          |
| `siteCode`     | `string`     | Codigo Emplazamiento                            | `ARCF0080`           | Parcial          | No          |
| `provinceName` | `string`     | Nombre de la Provincia                          | `Buenos Aires`       | Parcial          | No          |
| `districtName` | `string`     | Nombre del Districto                            | `CABA`               | Parcial          | No          |
| `localityName` | `string`     | Nombre de la Localidad                          | `CABA`               | Parcial          | No          |
| `address`      | `string`     | Domicilio de la Central                         | `Azcuenaga No. 249`  | Parcial          | No          |
| `latitude`     | `float`      | Latitud                                         | `-34.60663350844643` | Exacta           | No          |
| `longitude`    | `float`      | Longitud                                        | `-34.60663350844643` | Exacta           | No          |
| `description`  | `string`     | Descripcion de la Central                       | `Centro CORE TASA`   | Parcial          | No          |
| `observations` | `string`     | Observaciones                                   | `Centro CORE TASA`   | Parcial          | No          |
| `owner`        | `string`     | Propietario de la Central                       | `InService`          | Exacta           | No          |
| `status`       | `boolean`    | Estado de la Central (Habilitada o Desafectada) | `InService`          | Exacta           | No          |

### Respuestas:

#### Respuesta Sin Paginacion

Cuando NO se envian datos de PAGINACION (limit y page) se retorna `Central[]` (Array con Objectos de Centrales)

```json
[
    { /* datos de una central */ },
    { /* datos de otra central */ },
    { /* datos de otra central */ },
    { /* datos de otra central */ },
]
```

#### Respuesta Con Paginacion

Cuando se envian datos de PAGINACION (limit y page) se retorna un Objeto con los datos:
```json
{
  "payload": [ 
    { /* datos de una central */ },
    { /* datos de otra central */ }
  ],
  "pagination": {
    "totalDocs": Number,        // Número total de documentos
    "totalResults": Number,     // Número total de documentos (igual que totalDocs)
    "totalPages": Number,       // Total de páginas calculadas
    "prevPage": "Link | null",  // Link hacia la página anterior o null si no existe
    "nextPage": "Link | null",  // Link hacia la página siguiente o null si no existe
    "page": Number,             // Página actual
    "hasPrevPage": Boolean,     // Indica si hay o no página anterior
    "hasNextPage": Boolean      // Indica si hay o no página siguiente
  }
}
```

#### URL Ejemplo *SIN* Paginacion:

`api/central?codeName=B.&districtName=CABA`

#### Ejemplo de Respuesta Sin Paginacion

```json
[
    {
        "id": "672c31e567ceb7be3a6787d9",
        "centralName": "BARRACAS",
        "codeName": "B.BRR",
        "siteCode": "ARCF0281",
        "owner": "TASA",
        "status": true,
        "provinceName": "BUENOS AIRES",
        "districtName": "CABA",
        "localityName": "CABA",
        "address": "Isabel la Católica No. 1374",
        "latitude": -34.644789577920875,
        "longitude": -58.37194540022318,
        "description": "Central Barracas TASA",
        "observations": "Centro CORE TASA",
        "createdAt": "2024-11-07T03:20:05.153Z",
        "updatedAt": "2024-11-07T03:20:05.153Z"
    },
    {
        "id": "672c2b4c9360616006a8c140",
        "centralName": "CUYO",
        "codeName": "B.CYO",
        "siteCode": "ARCF0080",
        "owner": "TASA",
        "status": true,
        "provinceName": "BUENOS AIRES",
        "districtName": "CABA",
        "localityName": "CABA",
        "address": "Azcuenaga No. 249",
        "latitude": -34.60663350844643,
        "longitude": -58.400605924176155,
        "description": "Central Cuyo TASA",
        "observations": "Centro CORE TASA",
        "createdAt": "2024-11-07T02:51:56.295Z",
        "updatedAt": "2024-11-07T02:51:56.295Z"
    }
]
```
#### URL Ejemplo *CON* Paginacion (se envia valores para `limit` y `page`):

`api/central?limit=1&page=2&codeName=SRS&owner=OTHER`

#### Example Response CON Pagination (se envia valores para `limit` y `page`)
```json
{
    "payload": [
        {
            "id": "672c39f32e8cb7470678f8a2",
            "centralName": "UNIVERSIDAD NACIONAL DE LA PAMPA",
            "codeName": "SRS.03",
            "siteCode": "UNLPAM",
            "owner": "OTHER",
            "status": true,
            "provinceName": "LA PAMPA",
            "districtName": "SANTA ROSA",
            "localityName": "SANTA ROSA",
            "address": "Cnel. Gil, L6300 Santa Rosa, La Pampa",
            "latitude": -36.6203485189302,
            "longitude": -64.28982543611876,
            "description": "UNIVERSIDAD NACIONAL DE LA PAMPA",
            "observations": "Sitio de Cliente",
            "createdAt": "2024-11-07T03:54:27.813Z",
            "updatedAt": "2024-11-07T03:54:27.813Z"
        }
    ],
    "pagination": {
        "totalDocs": 3,
        "totalResults": 1,
        "totalPages": 3,
        "prevPage": "api/central?limit=1&isDeleted=false&codeName=%5Bobject+Object%5D&owner=%5Bobject+Object%5D&page=1",
        "nextPage": "api/central?limit=1&isDeleted=false&codeName=%5Bobject+Object%5D&owner=%5Bobject+Object%5D&page=3",
        "page": 2,
        "hasPrevPage": true,
        "hasNextPage": true
    }
}
```
________



## <p style="color: blue">Catalog</p>

### <p style="color: yellow">Placas</p>

### Crear un Catalogo de una Placa

**URL:** `/api/catalog/board`  
**Método:** `POST`


<h1 style="color:red; font-size: 50px" >TODO: TERMINAR!!!!</h1>

**Cuerpo del request:**

| Campo | Tipo | Descripción | Obligatorio | Validaciones | Ejemplo |
|-------|------|-------------|-------------|--------------|---------|
| `boardName` | `string` | Número de parte del Transceiver | Sí | Valor Unico | "TNG1M520SM06" |
| `partNumber` | `string` | Modelo del Transceiver | No | Ninguna | "03033YQD" |
| `signals` | `ObjectId[]` | Array con IDs de las señales que puede brindar señales. Debe referenciar a un catalogo de señal existente | No | Debe ser un ObjectId válido de MongoDB | [ "6716eb2514ccfa43c448ecf9", "67170b2695ba1f3f74cb48b2" ] |
| `vendor` | `ObjectId`| ID Vendor al que pertenece el transceiver. Debe referenciar un vendor  existente. | Sí | Debe ser un ObjectId válido de MongoDB | "66dbaf195a040c6dc6868f8c" |
| `description` | `string` | Descripción detallada del Transceiver | No |  Ninguna | "20*10GE or 2*100GE Service Multiplexing Into 1*200G/100G Programable Wavelength Conversion Board(CFP2)(100G Line Capacity Included, RTU Extension Supported)" 
| `observations`| `string` | Observaciones adicionales sobre la placa | No |  Ninguna | "Usada en OT" |
| `technology`  | `string` | Tecnología del Transceiver. Valores permitidos: `['DWDM', 'SDH', 'RX', 'CWDM', 'IP', 'GENERICO']`. | Sí | Debe ser uno de los valores permitidos |
| `bitsRates`   | `array`  | Array de bitrates soportados por el Transceiver. Valores permitidos: `['STM-1', 'STM-4', 'STM-16', 'STM-64', 'OC-3', 'OC-12', 'OC-48', 'OC-192','FE', 'GE', '10GE WAN', '10GE LAN', '25GE', '40GE', '50GE', '100GE', '200GE', '400GE', 'FlexE 100G unaware', 'FlexE 200G unaware', 'FDDI', 'ESCON', 'FC100/FICON', 'FC200/FICON Express', 'FC400/FICON4G', 'FC800/FICON8G', 'FC1200/FICON10G', 'FC1600', 'FC3200', 'OTU1', 'OTU2', 'OTU2e', 'OTU4', 'OCH', 'DVB-ASI', 'SD-SDI', 'HD-SDI', 'HD-SDIRBR', '3G-SDI', '3G-SDIRBR']` | No | Debe ser un `Array` de `String` con valores válidos de `BitRatesValues[]` |
| `status`      | `enum`   | Estado del Transceiver. Valores permitidos: `['InService', 'EndOfSupport', 'EndOfMarketing']`.| Sí | Debe ser uno de los valores permitidos.      |


### Example Request
```json
{
"partNumber": "34060613",
"type": "SFP+",
"model": "OSX010N01",
"description": "Optical transceiver,SFP+,1310nm,8.5Gb/s-11.1Gb/s with CDR,-6.0~-1.0dBm,-14.4dBm,LC,SM,10km",
"vendor": "66dbaf195a040c6dc6868f8c",
"observations": "SFP+ Multirate 10GE",
"technology": "DWDM",
"bitsRates": ["10GE WAN", "10GE LAN", "STM-64", "OC-192", "FC800/FICON8G", "OTU2"],
"status": "InService"
}
```

### Example Response
```json
{
    "status": "success",
    "msg": "The Tranceiver has been successfully created",
    "payload": {
        "id": "670d2bb7926b58ef2b84a3fb",
        "partNumber": "34060613",
        "vendor": {
            "id": "66dbaf195a040c6dc6868f8c",
            "vendorName": "HUAWEI"
        },
        "model": "OSX010N01",
        "description": "Optical transceiver,SFP+,1310nm,8.5Gb/s-11.1Gb/s with CDR,-6.0~-1.0dBm,-14.4dBm,LC,SM,10km",
        "observations": "SFP+ Multirate 10GE",
        "technology": "DWDM",
        "bitsRates": ["10GE WAN", "10GE LAN", "STM-64", "OC-192", "FC800/FICON8G", "OTU2"],
        "status": "InService",
        "createdAt": "2024-10-14T14:33:27.955Z",
        "updatedAt": "2024-10-14T14:33:27.955Z"
    }
}
```
### <p style="color: orange">Transceivers</p>

### Crear un Transceiver

**URL:** `/api/catalog/transceiver`  
**Método:** `POST`

**Cuerpo del request:**

| Campo | Tipo | Descripción | Obligatorio | Validaciones |
|-------|------|-------------|-------------|--------------|
| `partNumber` | `string` | Número de parte del Transceiver | Sí | Valor Unico |
| `model` | `string` | Modelo del Transceiver | No | Ninguna
| `type` | `string` | Tipo de Transceiver | No | Ninguna
| `description` | `string` | Descripción detallada del Transceiver | No |  Ninguna |
| `vendor` | `ObjectId`| ID Vendor al que pertenece el transceiver. Debe referenciar un vendor  existente. | Sí | Debe ser un ObjectId válido de MongoDB |
| `observations`| `string` | Observaciones adicionales sobre el Transceiver | No |  Ninguna |
| `technology`  | `string` | Tecnología del Transceiver. Valores permitidos: `['DWDM', 'SDH', 'RX', 'CWDM', 'IP', 'GENERICO']`. | Sí | Debe ser uno de los valores permitidos |
| `bitsRates`   | `array`  | Array de bitrates soportados por el Transceiver. Valores permitidos: `['STM-1', 'STM-4', 'STM-16', 'STM-64', 'OC-3', 'OC-12', 'OC-48', 'OC-192','FE', 'GE', '10GE WAN', '10GE LAN', '25GE', '40GE', '50GE', '100GE', '200GE', '400GE', 'FlexE 100G unaware', 'FlexE 200G unaware', 'FDDI', 'ESCON', 'FC100/FICON', 'FC200/FICON Express', 'FC400/FICON4G', 'FC800/FICON8G', 'FC1200/FICON10G', 'FC1600', 'FC3200', 'OTU1', 'OTU2', 'OTU2e', 'OTU4', 'OCH', 'DVB-ASI', 'SD-SDI', 'HD-SDI', 'HD-SDIRBR', '3G-SDI', '3G-SDIRBR']` | No | Debe ser un `Array` de `String` con valores válidos de `BitRatesValues[]` |
| `status`      | `enum`   | Estado del Transceiver. Valores permitidos: `['InService', 'EndOfSupport', 'EndOfMarketing']`.| Sí | Debe ser uno de los valores permitidos.      |


### Example Request
```json
{
"partNumber": "34060613",
"type": "SFP+",
"model": "OSX010N01",
"description": "Optical transceiver,SFP+,1310nm,8.5Gb/s-11.1Gb/s with CDR,-6.0~-1.0dBm,-14.4dBm,LC,SM,10km",
"vendor": "66dbaf195a040c6dc6868f8c",
"observations": "SFP+ Multirate 10GE",
"technology": "DWDM",
"bitsRates": ["10GE WAN", "10GE LAN", "STM-64", "OC-192", "FC800/FICON8G", "OTU2"],
"status": "InService"
}
```

### Example Response
```json
{
    "status": "success",
    "msg": "The Tranceiver has been successfully created",
    "payload": {
        "id": "670d2bb7926b58ef2b84a3fb",
        "partNumber": "34060613",
        "vendor": {
            "id": "66dbaf195a040c6dc6868f8c",
            "vendorName": "HUAWEI"
        },
        "model": "OSX010N01",
        "description": "Optical transceiver,SFP+,1310nm,8.5Gb/s-11.1Gb/s with CDR,-6.0~-1.0dBm,-14.4dBm,LC,SM,10km",
        "observations": "SFP+ Multirate 10GE",
        "technology": "DWDM",
        "bitsRates": ["10GE WAN", "10GE LAN", "STM-64", "OC-192", "FC800/FICON8G", "OTU2"],
        "status": "InService",
        "createdAt": "2024-10-14T14:33:27.955Z",
        "updatedAt": "2024-10-14T14:33:27.955Z"
    }
}
```
_________________________

### Buscar Transceivers

**URL:** `/api/catalog/transceiver`  
**Método:** `GET`  
**Descripción:** Este endpoint permite obtener la lista de transceptores almacenados en el sistema. Puede utilizar parámetros de paginación opcionales para limitar la cantidad de registros retornados y navegar por páginas.

**Parametros de Consulta**

| Parámetro      | Tipo de Dato | Descripción                                     | Ejemplo                                     | Obligatorio |
|----------------|--------------|-------------------------------------------------|---------------------------------------------|-------------|
| `limit`        | `int`        | Cantidad de registros a devolver por página     | `10`                                        | No          |
| `page`         | `int`        | Número de la página a consultar                 | `2`                                         | No          |
| `partNumber`   | `string`     | Número de parte del transceptor                 | `03032BXT`                                  | No          |
| `type`         | `string`     | Tipo de transceptor                             | `Optical`                                   | No          |
| `model`        | `string`     | Modelo del transceptor                          | `TNF1C1CFPT65`                              | No          |
| `description`  | `string`     | Descripción del transceptor                     | `OptiX WDM, TNF1C1CFPT65, 100G CFPT65`      | No          |
| `vendor`       | `string`     | Proveedor del transceptor                       | `HUAWEI`                                    | No          |
| `observations` | `string`     | Observaciones adicionales                       | `Funciona adecuadamente en ambientes fríos` | No          |
| `technology`   | `string`     | Tecnología utilizada (**_Puede ser Multiple_**) | `DWDM`                                      | No          |
| `bitsRates`    | `string[]`      | Tasa de bits soportada                          | `["OCH", "OTU4"]`                           | No          |
| `status`       | `string`     | Estado del transceptor                          | `InService`                                 | No          |

### URL Ejemplo:

`/api/catalog/transceiver?vendor=66de80278a5c70b21b9a5663&bitsRates=STM-1&bitsRates=STM-4&bitsRates=STM-16&limit=5&page=1`

### Example Response SIN Pagination (sin `limit` ni `page`)
```json
[
    {
        "id": "670009bb0c1387078ae40df0",
        "partNumber": "03032BXT",
        "vendor": {
            "id": "66dbaf195a040c6dc6868f8c",
            "vendorName": "HUAWEI"
        },
        "model": "TNF1C1CFPT65",
        "description": "OptiX WDM,TNF1C1CFPT65,100G CFPT65(Metro,SDFEC2,Coherent wDCM,Tunable,expanded C Band,-3dBm-2dBm,-18dBm,50GHz,LC)",
        "observations": "OptiX WDM,TNF1C1CFPT65,100G CFPT65(Metro,SDFEC2,Coherent wDCM,Tunable,expanded C Band,-3dBm-2dBm,-18dBm,50GHz,LC)",
        "technology": "DWDM",
        "bitsRates": [],
        "signals": [
            "66f77287f9585c7719531a9d"
        ],
        "status": "InService",
        "createdAt": "2024-10-04T15:28:59.308Z",
        "updatedAt": "2024-10-04T15:28:59.308Z"
    },
    {
        "id": "670009ae0c1387078ae40deb",
        "partNumber": "03033AEA",
        "vendor": {
            "id": "66dbaf195a040c6dc6868f8c",
            "vendorName": "HUAWEI"
        },
        "model": "TNF3C1CFPT51",
        "description": "OptiX WDM,100G CFPT51(SLH,SDFEC2,Coherent,Tunable,Extended C Band,-10dBm-4dBm,-18dBm,Fixed)",
        "observations": "OptiX WDM,100G CFPT51(SLH,SDFEC2,Coherent,Tunable,Extended C Band,-10dBm-4dBm,-18dBm,Fixed)",
        "technology": "DWDM",
        "bitsRates": [
            "OCH",
            "OTU4"
        ],
        "signals": [
            "66f77287f9585c7719531a9d"
        ],
        "status": "InService",
        "createdAt": "2024-10-04T15:28:46.371Z",
        "updatedAt": "2024-10-04T15:28:46.371Z"
    }
]
```
### Example Response CON Pagination (se envia valores para `limit` y `page`)
```json
{
    "payload": [
        {
            "id": "670009bb0c1387078ae40df0",
            "partNumber": "03032BXT",
            "vendor": {
                "id": "66dbaf195a040c6dc6868f8c",
                "vendorName": "HUAWEI"
            },
            "model": "TNF1C1CFPT65",
            "description": "OptiX WDM,TNF1C1CFPT65,100G CFPT65(Metro,SDFEC2,Coherent wDCM,Tunable,expanded C Band,-3dBm-2dBm,-18dBm,50GHz,LC)",
            "observations": "OptiX WDM,TNF1C1CFPT65,100G CFPT65(Metro,SDFEC2,Coherent wDCM,Tunable,expanded C Band,-3dBm-2dBm,-18dBm,50GHz,LC)",
            "technology": "DWDM",
            "bitsRates": [],
            "signals": [
                "66f77287f9585c7719531a9d"
            ],
            "status": "InService",
            "createdAt": "2024-10-04T15:28:59.308Z",
            "updatedAt": "2024-10-04T15:28:59.308Z"
        },
        ...
    ],
    "pagination": {
        "totalDocs": 6,
        "totalResult": 6,
        "totalPages": 2,
        "prevPage": null,
        "nextPage": "api/catalog/transceiver?limit=3&page=2",
        "page": 1,
        "hasPrevPage": false,
        "hasNextPage": true
    }
}
```
### Descripción de la respuesta

- **payload**: Array de objetos, donde cada objeto representa un transceiver.
  
  **Estructura de cada objeto:**
  - **id**: `string` - ID único del transceptor.
  - **partNumber**: `string` - Número de parte del transceptor.
  - **vendor**: `object` - Información del proveedor del transceptor.
    - **id**: `string` - ID del proveedor.
    - **vendorName**: `string` - Nombre del proveedor.
  - **model**: `string` - Modelo del transceptor.
  - **description**: `string` - Descripción del transceptor.
  - **observations**: `string` - Observaciones adicionales sobre el transceptor.
  - **technology**: `string` - Tecnología utilizada por el transceptor.
  - **bitsRates**: `array` - Array de tasas de bits soportadas.
  - **signals**: `array` - Array de señales soportadas.
  - **status**: `string` - Estado del transceptor.
  - **createdAt**: `string` - Fecha de creación del transceptor.
  - **updatedAt**: `string` - Fecha de actualización del transceptor.

- **pagination**: Objeto que incluye información sobre la paginación de los resultados.
  - **totalDocs**: `number` - Total de documentos disponibles.
  - **totalResults**: `number` Total de resultados para el filtro aplicado.
  - **totalPages**: `number` - Total de páginas.
  - **prevPage**: `string` - URL de la página anterior (si existe).
  - **nextPage**: `string` - URL de la siguiente página (si existe).
  - **page**: `number` - Número de la página actual.
  - **hasPrevPage**: `boolean` - Indica si hay una página anterior.
  - **hasNextPage**: `boolean` - Indica si hay una página siguiente.
________

### Buscar Transceiver por ID

**URL:** `/api/catalog/transceiver/:transceiverid`  
**Método:** `GET`  
**Descripcion:** Permite buscar un Transceiver por el ID el cual es unico para cada elemento.   

#### Parámetros

| Parámetro      | Tipo de Dato | Descripción                                 | Ejemplo                         | Obligatorio |
|----------------|--------------|---------------------------------------------|---------------------------------|-------------|
| `transceiverid`| `ObjectId`   | ID único del Transceiver. Debe ser un ObjectId válido de MongoDB. | `670009bb0c1387078ae40df0`     | Sí          |

#### Respuesta

Si la búsqueda es exitosa, se retorna un objeto que representa el transceptor. Si no encuentra nada retorna `{}`

**Ejemplo de Respuesta Exitosa:**

```json
{
    "id": "670d2bb7926b58ef2b84a3fb",
    "partNumber": "03032BXT",
    "vendor": {
        "id": "66dbaf195a040c6dc6868f8c",
        "vendorName": "HUAWEI"
    },
    "model": "",
    "description": "PRUEBA OptiX WDM,TNF1C1CFPT65,100G CFPT65(Metro,SDFEC2,Coherent wDCM,Tunable,expanded C Band,-3dBm-2dBm,-18dBm,50GHz,LC)",
    "observations": "PRUEBA OptiX WDM,TNF1C1CFPT65,100G CFPT65(Metro,SDFEC2,Coherent wDCM,Tunable,expanded C Band,-3dBm-2dBm,-18dBm,50GHz,LC)",
    "technology": "DWDM",
    "bitsRates": [],
    "signals": [],
    "status": "InService",
    "createdAt": "2024-10-14T14:33:27.955Z",
    "updatedAt": "2024-10-14T14:33:27.955Z"
}
```
_______

### Modificar Datos de un Transceiver

**URL:** `/api/catalog/transceiver/:transceiverid`  
**Método:** `PUT`  
**Descripcion:** Permite MODIFICAR datos un Transceiver por el ID.

**Parámetros de la URL:**

| Parámetro       | Tipo   | Obligatorio | Descripción                           |
|-----------------|--------|-------------|---------------------------------------|
| `transceiverid` | String | Sí          | ID del transceptor a modificar        |

#### Parámetros (req.body)

| Parámetro | Tipo de Dato | Descripción | Ejemplo | Obligatorio | Validacion |
|-----------|--------------|-------------|---------|-------------|------------|
| `partNumber` | `String` | Valor del PartNumber | `34060613` | Sí | Se valida que no se encuentre ya registrado ese mismo valor |
| `vendor` | `ObjectId` | ID único del Vendor | `670009bb0c1387078ae40df0`| Sí | Se Valida que sea `ObjectId` valido y que se encuentre registrado |
| `type` | `String` | Tipo de Transceiver | `SFP+` | No | N/A |
| `model` | `String` | Modelo de Transceiver | `03032BXT` | No | N/A |
| `description` | `String` | Descripcion | `Optical transceiver,SFP+,1310nm,8.5Gb/s-11.1Gb/s with CDR,-6.0~-1.0dBm,-14.4dBm,LC,SM,10km` | No | N/A |
| `observations` | `String` | Observaciones | `Transceiver Multi-rate` | No | N/A |
| `technology` | `String` | Tecnología del Transceiver. Valores permitidos: `['DWDM', 'SDH', 'RX', 'CWDM', 'IP', 'GENERICO']`. | `Transceiver Multi-rate` | No | Se validara que pertenezca al `enum` `TechnologyEnum` |
| `bitsRates`   | `array`  | Array de bitrates soportados por el Transceiver. Valores permitidos: `['STM-1', 'STM-4', 'STM-16', 'STM-64', 'OC-3', 'OC-12', 'OC-48', 'OC-192','FE', 'GE', '10GE WAN', '10GE LAN', '25GE', '40GE', '50GE', '100GE', '200GE', '400GE', 'FlexE 100G unaware', 'FlexE 200G unaware', 'FDDI', 'ESCON', 'FC100/FICON', 'FC200/FICON Express', 'FC400/FICON4G', 'FC800/FICON8G', 'FC1200/FICON10G', 'FC1600', 'FC3200', 'OTU1', 'OTU2', 'OTU2e', 'OTU4', 'OCH', 'DVB-ASI', 'SD-SDI', 'HD-SDI', 'HD-SDIRBR', '3G-SDI', '3G-SDIRBR']` | `['STM-4', 'STM-16', 'STM-64']` | No | Debe ser un `Array` de `String` con valores válidos de `BitRatesValues[]` |
| `status` | `String` | Estado del Transceiver. Valores permitidos: `['InService', 'EndOfSupport', 'EndOfMarketing']`.| `InService` | No | Debe ser uno de los valores permitidos en `StatusEnum` |

#### Respuesta

**Ejemplo de Respuesta Exitosa:**

```json
{
    "msg": "Transceiver Information has been updated successfully",
    "payload": {
        "id": "670009bb0c1387078ae40df0",
        "partNumber": "03032BXT",
        "vendor": {
            "id": "66dbaf195a040c6dc6868f8c",
            "vendorName": "HUAWEI"
        },
        "model": "TNF1C1CFPT65",
        "description": "OptiX WDM,TNF1C1CFPT65,100G CFPT65(Metro,SDFEC2,Coherent wDCM,Tunable,expanded C Band,-3dBm-2dBm,-18dBm,50GHz,LC)",
        "observations": "OptiX WDM,TNF1C1CFPT65,100G CFPT65(Metro,SDFEC2,Coherent wDCM,Tunable,expanded C Band,-3dBm-2dBm,-18dBm,50GHz,LC)",
        "technology": "DWDM",
        "bitsRates": [
            "STM-64",
            "10GE LAN"
        ],
        "signals": [
            "66f77287f9585c7719531a9d"
        ],
        "status": "InService",
        "createdAt": "2024-10-04T15:28:59.308Z",
        "updatedAt": "2024-10-14T21:11:01.682Z"
    }
}
```
_______


### Eliminar un Transceiver

**URL:** `/api/catalog/transceiver/:transceiverid`  
**Método:** `DELETE`  
**Descripcion:** Permite ELIMINAR un Transceiver.

**Parámetros de la URL:**

| Parámetro       | Tipo   | Obligatorio | Descripción                           |
|-----------------|--------|-------------|---------------------------------------|
| `transceiverid` | String | Sí          | ID del transceptor a modificar        |

#### Respuesta

**Ejemplo de Respuesta Exitosa:**

```json
{
    "msg": "The Subrack has been deteled!",
    "payload": {
        "id": "670009bb0c1387078ae40df0",
        "partNumber": "03032BXT",
        "vendor": {
            "id": "66dbaf195a040c6dc6868f8c",
            "vendorName": "CIENA"
        },
        "model": "TNF1C1CFPT65",
        "description": "OptiX WDM,TNF1C1CFPT65,100G CFPT65(Metro,SDFEC2,Coherent wDCM,Tunable,expanded C Band,-3dBm-2dBm,-18dBm,50GHz,LC)",
        "observations": "OptiX WDM,TNF1C1CFPT65,100G CFPT65(Metro,SDFEC2,Coherent wDCM,Tunable,expanded C Band,-3dBm-2dBm,-18dBm,50GHz,LC)",
        "technology": "DWDM",
        "bitsRates": [
            "STM-64",
            "10GE LAN"
        ],
        "signals": [
            "66f77287f9585c7719531a9d"
        ],
        "status": "InService",
        "createdAt": "2024-10-04T15:28:59.308Z",
        "updatedAt": "2024-10-14T21:21:17.333Z"
    }
}
```
### Descripción de la respuesta

- **msg**: Mensaje de Eliminacion
- **payload**: Objeto, con los datos del Transceiver Eliminado.
  
  **Estructura de cada objeto:**
  - **id**: `string` - ID único del transceptor.
  - **partNumber**: `string` - Número de parte del transceptor.
  - **vendor**: `object` - Información del proveedor del transceptor.
    - **id**: `string` - ID del proveedor.
    - **vendorName**: `string` - Nombre del proveedor.
  - **model**: `string` - Modelo del transceptor.
  - **description**: `string` - Descripción del transceptor.
  - **observations**: `string` - Observaciones adicionales sobre el transceptor.
  - **technology**: `string` - Tecnología utilizada por el transceptor.
  - **bitsRates**: `array` - Array de tasas de bits soportadas.
  - **status**: `string` - Estado del transceptor.
  - **createdAt**: `string` - Fecha de creación del transceptor.
  - **updatedAt**: `string` - Fecha de actualización del transceptor.
_______





