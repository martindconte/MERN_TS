export const flattenObj = ( obj: { [key: string]: any } ): string => {
    
    const params: URLSearchParams = new URLSearchParams()

    for( const [key, value] of Object.entries(obj) ) {

        if( obj.hasOwnProperty( key ) && value !== '' && value !== undefined && value !== null && !Number.isNaN(value) ) {
            if( Array.isArray( value )) {
                for( const valueInArray of value ) {
                    if( typeof valueInArray === 'string' ) {
                        params.append( key, encodeURIComponent( valueInArray ) )
                    } else {
                        flattenObj
                    }
                }
            } else {
                params.append( key, encodeURIComponent( value ) )
            }
        }
    }

    return params.toString()
}

// export const  buildURL = (obj, parentKey = '', result = {}) => {
//     for (const key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             const propName = parentKey ? `${parentKey}[${key}]` : key;
//             if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
//                 buildURL(obj[key], propName, result);
//             } else if (Array.isArray(obj[key])) {
//                 obj[key].forEach((value, index) => {
//                     result[`${propName}[${index}]`] = value;
//                 });
//             } else {
//                 result[propName] = obj[key];
//             }
//         }
//     }
//     return result;
// }

// export const objectToQueryString = (data) => {
//     const flattenedData = buildURL(data);
//     const searchParams = new URLSearchParams(flattenedData);
//     return searchParams.toString();
// }

export const buildURL = ( baseURL: string, params: { [key: string]: any } ) => {
    const URLparams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {

      // if( Array.isArray( value ) ) {
      //   const prueba = buildURL( baseURL + '?' + key , value )
      //   console.log(prueba);
      // }


      // Codificar valor para URL
      const encodedValue = encodeURIComponent(value);
  
      // Omitir parámetros con valores vacíos
      if (value !== "" && value !== null && value !== undefined && !Number.isNaN(value)) {
        // Manejar arrays (opcional)
        if (Array.isArray(value)) {
          for (const item of value) {
            URLparams.append(key, encodeURIComponent(item));
          }
        } else {
            URLparams.append(key, encodedValue);
        }
      }
    }
  
    // Unir parámetros a la URL
    return baseURL + "?" + URLparams.toString();
}