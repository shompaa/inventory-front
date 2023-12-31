const { VITE_API_URL: baseURL } = import.meta.env;

const getEndpoints = (baseURL) => {
  return {
    LOGIN_URL: `${baseURL}/auth/login`,
    SALES_URL: `${baseURL}/sales`,
    PRODUCTS_URL: `${baseURL}/products`,
    PRODUCTS_SEARCH_URL: (search) => `${baseURL}/products/search/${search}`,
    // REGISTER_URL: `${baseURL}/auth/register`,
    // REFRESH_URL: `${baseURL}/auth/refresh`,
    // PLATES_URL: (plate) => `${baseURL}/cars/plate/${plate}`,
    // PLATES_FILES_URL: `${baseURL}/images/detect`,
  };
};

const ENDPOINTS = getEndpoints(baseURL);

export const enviroment = {
  ...ENDPOINTS,
};
