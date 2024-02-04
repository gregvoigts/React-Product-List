import {
  ListItem,
  Avatar,
  ListItemAvatar,
  Typography,
  ListItemText,
} from "@mui/material";
import { IProduct } from "./product";

const ProductDetails = (props: any) => {
  const product: IProduct = props.product;

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <ListItem key={product.id}>
      <ListItemAvatar>
        <Avatar alt={product.title} src={product.thumbnail} />
      </ListItemAvatar>
      <ListItemText
        primary={product.title}
        secondary={
          <>
            <Typography variant="body2" color="textSecondary">
              {product.description}
            </Typography>
            <Typography variant="body2" color="primary">
              ${discountedPrice.toFixed(2)}
              <span
                style={{ textDecoration: "line-through", marginLeft: "0.5rem" }}
              >
                ${product.price.toFixed(2)}
              </span>
              <span style={{ marginLeft: "0.5rem" }}>
                ({product.discountPercentage}% off)
              </span>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Rating: {product.rating} | Stock: {product.stock}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default ProductDetails;
