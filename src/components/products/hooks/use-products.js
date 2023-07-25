import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProducts } from "../../../services/queries";
import {
  createProduct,
  deleteProduct,
  editProduct,
} from "../../../services/mutations/products.mutations";

export const useProducts = () => {
  return useQuery("getProducts", () => getProducts());
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => createProduct(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("createProduct");
    },
  });
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ data, id }) => {
      return editProduct(data, id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("editProduct");
      },
    }
  );
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation((id) => deleteProduct(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("deleteProduct");
    },
  });
};
