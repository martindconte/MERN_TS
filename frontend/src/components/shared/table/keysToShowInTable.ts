interface KeyLabel<T> {
  key: keyof T & string;
  label: string;
}

  export const keyToShowInTable: Record<string, KeyLabel<any>[]> = {
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
      { key: 'boardName', label: 'Nombre' },
      { key: 'partNumber', label: 'Numero de Parte' },
      { key: 'description', label: 'Descripcion' },
      { key: 'vendor', label: 'Vendor' },
      { key: 'slotSize', label: 'Cant. Slot Ocupa' },
      { key: 'quantityPorts', label: 'Cant. Ports Serv.' },
      { key: 'observations', label: 'Obs.' },
      { key: 'status', label: 'Estado' }
    ],
    catalogTransceiver: [
      { key: 'vendor', label: 'Vendor' },
      { key: 'partNumber', label: 'No. Parte' },
      { key: 'model', label: 'Model' },
      { key: 'type', label: 'Tipo' },
      { key: 'technology', label: 'Tecnologia' },
      { key: 'description', label: 'Descripcion' },
      { key: 'observations', label: 'Obs.' },
      // { key: 'bitsRate', label: 'Velocidades' },
      { key: 'status', label: 'Estado' },
      { key: 'createdAt', label: 'Creado' },
      { key: 'updatedAt', label: 'Modificado' },
    ],
    catalogSignal: [
      { key: 'type', label: 'Tipo' },
      { key: 'subType', label: 'SubTipo' },
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