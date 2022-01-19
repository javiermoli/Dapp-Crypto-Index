import { Grid, Typography, Box } from "@mui/material";
import { FC, ReactNode } from "react";
import SkeletonCard from "../Skeleton/SkeletonCard";
import Item from "./Item";

interface ListProps {
  nfts: any[];
  title?: string;
  renderChildren?: (nft: any) => ReactNode;
  isLoading: boolean;
}

const List: FC<ListProps> = ({
  nfts = [],
  title,
  renderChildren,
  isLoading,
}) => {
  const content = isLoading ? (
    <SkeletonCard itemsQty={2} />
  ) : nfts.length ? (
    nfts.map((nft, index) => (
      <Grid key={index} item xs={4}>
        <Item nft={nft} renderChildren={renderChildren} />
      </Grid>
    ))
  ) : (
    <Typography sx={{ p: 2 }} component="div">
      There are no items to display.
    </Typography>
  );

  return (
    <Box component="div" sx={{ p: 2 }}>
      <Typography sx={{ marginBottom: "5px" }} variant="h4" component="div">
        {title}
      </Typography>
      <Grid container spacing={2}>
        {content}
      </Grid>
    </Box>
  );
};

export default List;
