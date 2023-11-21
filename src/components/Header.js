import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";


export default function Header({cartItemsArray}) {
  const navigate = useNavigate();
  const [cartItemsQuantity, setCartItemsQuantity] = useState(0)

  useEffect(()=>{
    getTotalCartItemsQuantity(cartItemsArray);
    // console.log("cartItemsQuantity: ",cartItemsQuantity)
  })

  const getTotalCartItemsQuantity = (cartItemsArray=[])=>{

    const itemQty = cartItemsArray.reduce((total,prod)=>{
      return total + prod.quantity;
    },0)

    // console.log("itemQty: ",itemQty);
    setCartItemsQuantity(itemQty);

    return cartItemsArray.length;
  }

  return (
    <Box sx={{ flexGrow: 1, width: "100%", position: "sticky", top: "0", zIndex: 2 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => {
                navigate("/");
              }}
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer"
            }}
          >
            TEEREX STORE
          </Typography>
          <Badge badgeContent={cartItemsQuantity || 0} color="error">
            <ShoppingCartIcon
              fontSize="large"
              onClick={() => {
                navigate("/cart");
              }}
              sx={{cursor: "pointer"}}
            />
          </Badge>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
