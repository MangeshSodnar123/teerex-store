import React from "react";
import { Box, Typography, Button, List, Paper, Stack } from "@mui/material";
import Header from "./Header";
import { useSnackbar } from "notistack";

const Cart = ({ cartItems, setCartItems, products, setProducts }) => {

  const { enqueueSnackbar } = useSnackbar();

    /**
   * Increases quantity of item from cart and decreases that quantity in the products array.
   * @param {obj} item 
   */
  const performAddToCart = (item) => {
    //check if item is present in the products array
    const isAvailable = products.find(
      (prod) => prod.id === item.id && prod.quantity > 0
    );

    //check if product is present in the cart
    const isPresentInCart = cartItems.find((prod) => prod.id === item.id);

    //if yes then add that product to the cart
    //reduce product quantity by 1
    if (isAvailable) {
      //if product present in cart then just increase it's quantity by 1
      if (isPresentInCart) {
        const updatedCartProducts = cartItems.map((prod) => {
          if (prod.id === item.id) {
            return { ...prod, quantity: prod.quantity + 1 };
          }
          return prod;
        });

        setCartItems(updatedCartProducts);
      } else {
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }

      const updatedProducts = products.map((prod) => {
        if (prod.id === item.id) {
          return { ...prod, quantity: prod.quantity - 1 };
        }
        return prod;
      });
      setProducts(updatedProducts);
    }else {
      enqueueSnackbar("Sorry! Required product is not available!", {
        variant: "warning",
      });
    }
  };


  /**
   * Decrease quantity of item from cart and increases that quantity in the products array.
   * @param {obj} item 
   */
  const performRemoveFromCart = (item) => {
    //get product from cart and remove it's quantity by 1
    const newCartItems = cartItems.filter((prod) => {
      return prod.id !== item.id;
    });
    if (item.quantity - 1 === 0) {
      console.log("newCartItems : ", newCartItems);
      setCartItems(newCartItems);
    } else {
      setCartItems([...newCartItems, { ...item, quantity: item.quantity - 1 }]);
    }
    //get same product from products array and increase it's quantity by 1

    const newProdArray = products.map((prod) => {
      if (prod.id === item.id) {
        return { ...prod, quantity: prod.quantity + 1 };
      }
      return { ...prod };
    });

    setProducts(newProdArray);
  };

  /**
   *
   * This function removes the item from the cart.
   * @param {int} itemId
   */
  const removeCartItem = (itemId) => {
    // Filter out the item with the specified ID
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  /**
   * This function get combined quantity of all products present in the cart.
   * @returns {int} 
   */
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <Box
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Header cartItemsArray={cartItems} />
      <Box mt={3} p={3} sx={{ maxWidth: "500px" }}>
        <Typography variant="h5" gutterBottom>
          Shopping Cart
        </Typography>
        <Paper elevation={3}>
          {cartItems.length === 0 ? (
            <Typography variant="body1" align="center" p={3}>
              Your cart is empty.
            </Typography>
          ) : (
            <List>
              {cartItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    border: 1,
                    margin: "1rem",
                    borderColor: "primary.main",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    padding: "1rem",
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "10px",
                      }}
                    >
                      <Typography>{item.name}</Typography>
                      <Typography>Qty: {item.quantity}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "10px",
                      }}
                    >
                      <Box>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            // updateCartItemQuantity(item.id, item.quantity - 1)
                            performRemoveFromCart(item)
                          }
                          disabled={item.quantity <= 1}
                        >
                          -1
                        </Button>

                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            // updateCartItemQuantity(item.id, item.quantity + 1)
                            performAddToCart(item)
                          }
                        >
                          +1
                        </Button>
                      </Box>

                      <Button
                        variant="contained"
                        edge="end"
                        aria-label="delete"
                        onClick={() => removeCartItem(item.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </List>
          )}
          {cartItems.length > 0 && (
            <Box mt={2} p={2} bgcolor="primary.main" color="white">
              <Typography variant="h6" align="center">
                Total Price: ${getTotalPrice()}
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Cart;
