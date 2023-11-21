import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";
import { Grid } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useEffect} from "react";


const ProductCard = ({product,cartItems,handleAddToCart}) => {

    useEffect(()=>{
        // console.log("product :",product);
        // console.log("product.name :",product.name);
        // console.log("product.price :",product.price);
    })

  return (
    <Grid item xs={6} md={3}>
      {/* card start */}
      <Card className="card">
        <CardMedia
          component="img"
          height="140"
          image={product.imageURL}
          alt={product.name}
        ></CardMedia>
        <CardContent>
          <Typography component="div" color="text.secondary">
            {product.name}
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>${product.price}</Typography>
        </CardContent>

        <CardActions className="card-actions">
          <Button
            className="card-button"
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
            fullWidth
            onClick={(e) => {
              handleAddToCart({...product});
            }}
          > 
            ADD TO CART
          </Button>
        </CardActions>
      </Card>
      {/* card end */}
    </Grid>
  );
};

export default ProductCard;
