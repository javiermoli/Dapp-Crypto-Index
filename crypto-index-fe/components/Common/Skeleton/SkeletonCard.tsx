import { FC } from "react";
import { Grid, Skeleton } from "@mui/material";
import { Box } from "@mui/system";

interface SkeletonCardProps {
  itemsQty: number;
}

const SkeletonCard: FC<SkeletonCardProps> = ({ itemsQty }) => {
  const skeletonItems = [...Array(itemsQty)];

  return (
    <>
      {skeletonItems.map((numb, index) => (
        <Grid key={index} item xs={4}>
          <Box
            sx={{
              pt: 0.5,
              boxShadow:
                "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            }}
            width={345}
            height={405}
          >
            <Skeleton variant="rectangular" height={220} />
            <Box sx={{ padding: "15px" }}>
              <Skeleton sx={{ marginBottom: "10px" }} width="30%" height={30} />
              <Skeleton width="100%" />
              <Skeleton width="70%" />
              <Skeleton width="90%" />
              <Box
                sx={{
                  marginTop: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Skeleton width="25%" />
                <Skeleton width="25%" />
                <Skeleton width="25%" />
              </Box>
            </Box>
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default SkeletonCard;
