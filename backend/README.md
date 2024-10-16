# API de Catálogo de Transceptores

Esta API permite gestionar un catálogo de transceptores, permitiendo crear, listar, actualizar y eliminar transceptores. El proyecto está desarrollado utilizando **Node.js**, **Express**, **TypeScript**, y documentado utilizando **Swagger AUN PENDIENTE DE IMPLEMENTACION**.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Scripts](#scripts)
- [Configuración](#configuración)
- [Endpoints](#endpoints)
  - [Catalogo](#catalog)
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

# <p style="color: red;">Endpoints</p>

## <p style="color: blue">Catalog</p>

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
| `bitsRates`    | `string      | Tasa de bits soportada                          | `["OCH", "OTU4"]`                           | No          |
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





