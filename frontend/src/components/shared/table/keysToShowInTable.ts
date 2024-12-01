// interface Props {
//   central: Array<{ key: string, label: string }>;
//   catalogSubrack: Array<{ key: string, label: string }>;
//   catalogBoard: Array<{ key: string, label: string }>;
//   catalogTransceiver: Array<{ key: string, label: string }>;
//   catalogSignal: Array<{ key: string, label: string }>;
//   catalogVendor: Array<{ key: string, label: string }>;
// }

interface KeyLabel<T> {
  key: keyof T & string;
  label: string;
}

  export const keyToShowInTable: Record<string, KeyLabel<any>[]> = {
  // export const keyToShowInTable: Props = {
    central: [
      { key: 'centralName', label: 'Central' },
      { key: 'codeName', label: 'Sitio' },
      { key: 'siteCode', label: 'Emplazamiento' },
      { key: 'description', label: 'Descripcion' },
      { key: 'provinceName', label: 'Provincia' },
      { key: 'districtName', label: 'Partido' },
      { key: 'localityName', label: 'localidad' },
      { key: 'address', label: 'Domicilio' },
      { key: 'latitude', label: 'Latitud' },
      { key: 'longitude', label: 'Longuitud' },
      { key: 'owner', label: 'Propietario' },
      { key: 'observations', label: 'Observaciones' },
      { key: 'status', label: 'Estado' },
      { key: 'createdAt', label: 'Creado' },
      { key: 'updatedAt', label: 'Modificado' },
    ],
    catalogSubrack: [
      { key: 'subrackType', label: 'Tipo de Subrack' },
      { key: 'subrackFamily', label: 'Familia' },
      { key: 'partNumber', label: 'Numero de Parte' },
      { key: 'model', label: 'Model' },
      { key: 'description', label: 'Descripcion' },
      { key: 'totalSlot', label: 'Qty. Slot' },
      { key: 'serviceSlot', label: 'Qty. Slot Serv.' },
      { key: 'vendor', label: 'Vendor' },
      { key: 'owner', label: 'Propietario' },
      { key: 'observations', label: 'Obs.' },
      { key: 'technology', label: 'Tecnologia' },
      { key: 'status', label: 'Estado' }
    ],
    catalogBoard: [
      { key: 'vendor', label: 'Vendor' },
      { key: 'boardName', label: 'Nombre' },
      { key: 'partNumber', label: 'No de Parte' },
      { key: 'description', label: 'Descripcion' },
      { key: 'observations', label: 'Obs.' },
      { key: 'slotSize', label: 'Cant. Slot Ocupa' },
      { key: 'roadmap', label: 'ROADMAP' },
      { key: 'createdAt', label: 'Creado' },
      { key: 'updatedAt', label: 'Modificado' },
    ],
    catalogTransceiver: [
      { key: 'vendor', label: 'Vendor' },
      { key: 'partNumber', label: 'No. Parte' },
      { key: 'modelName', label: 'Model' },
      { key: 'type', label: 'Tipo' },
      { key: 'technology', label: 'Tecnologia' },
      { key: 'description', label: 'Descripcion' },
      { key: 'observations', label: 'Obs.' },
      { key: 'roadmap', label: 'ROADMAP' },
      { key: 'createdAt', label: 'Creado' },
      { key: 'updatedAt', label: 'Modificado' },
    ],
    catalogSignal: [
      { key: 'type', label: 'Tipo' },
      { key: 'subType', label: 'SubTipo' },
      { key: 'amount', label: 'BW' },
      { key: 'unit', label: 'Unidad' },
      // { key: 'description', label: 'Descripcion' },
      { key: 'observation', label: 'Observaciones' },
      { key: 'createdAt', label: 'Creado' },
      { key: 'updatedAt', label: 'Modificado' },
    ], 
    catalogVendor: [
      { key: 'vendorName', label: 'Vendor' },
      { key: 'country', label: 'Pais' },
      { key: 'observation', label: 'Observaciones' },
      { key: 'createdAt', label: 'Creado' },
      { key: 'updatedAt', label: 'Modificado' },
    ],
  };