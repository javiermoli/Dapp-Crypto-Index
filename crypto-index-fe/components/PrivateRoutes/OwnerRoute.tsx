import { FC, ReactNode } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import useOwner from "../../hooks/useOwner";

interface OwnerRouteProps {
  children: ReactNode;
}

const OwnerRoute: FC<OwnerRouteProps> = ({ children }) => {
  const router = useRouter();
  const { isOwner } = useOwner();

  if (isOwner === false) router.push("/");

  if (isOwner === undefined)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return <>{children}</>;
};

export default OwnerRoute;
