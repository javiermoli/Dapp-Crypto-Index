import { ReactNode } from "react";
import { FC } from "react";
import { NFTMetadata } from "../../../types/NFT";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface ItemProps {
  nft: NFTMetadata;
  renderChildren?: (nft: NFTMetadata) => ReactNode;
}

const Item: FC<ItemProps> = ({ nft, renderChildren }) => {
  const { image, name, description } = nft;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="220"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>{renderChildren && renderChildren(nft)}</CardActions>
    </Card>
  );
};

export default Item;
