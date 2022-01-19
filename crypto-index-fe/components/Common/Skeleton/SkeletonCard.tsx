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
          <Box sx={{ pt: 0.5 }} width={345}>
            <Skeleton variant="rectangular" height={220} />
            <Skeleton width="100%%" />
            <Skeleton width="70%" />
            <Skeleton width="95%" />
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default SkeletonCard;
