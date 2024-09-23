export const buildURL = ( baseURL: string, params: { [key: string]: any } ) => {
    const URLparams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      // Codificar valor para URL
      const encodedValue = encodeURIComponent(value);
  
      // Omitir parámetros con valores vacíos
      if (value !== "" && value !== null && value !== undefined) {
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