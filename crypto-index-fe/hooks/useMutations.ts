import { useMutation, useQueryClient } from "react-query";
import useSnackbar from "./useSnackbar";

type Query = (...params: any) => Promise<{}>;

export const useMutations = (query: Query, invalidateQueries?: string[]) => {
  const { snackBarError, snackBarSuccess } = useSnackbar();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(query, {
    onSuccess: () => {
      if (invalidateQueries?.length) {
        invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
      }
      snackBarSuccess("Success...");
    },
    onError: () => {
      snackBarError("Error...");
    },
  });

  return mutate;
};
