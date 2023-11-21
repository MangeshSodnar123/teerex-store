import { Grid, Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Products.css";
import ProductCard from "./ProductCard";
import FilterPanal from "./FilterPanal";
import Header from "./Header";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import { useSnackbar } from "notistack";


const Products = ({ cartItems, setCartItems, products, setProducts }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [searchedProducts, setSearchedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [searchedProducts, filteredProducts]);

  const performAddToCart = (item) => {
    // console.log("insie perfomAddToCart function.");
    //check if item is present in the products array
    console.log("item from product page: ", item);
    const isAvailable = products.find(
      (prod) => prod.id === item.id && prod.quantity > 0
    );
    console.log("prod.quantity :", item.quantity);
    console.log("isAvailable :", isAvailable);

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
    } else {
      enqueueSnackbar("Sorry! Required product is not available!", {
        variant: "warning",
      });
    }
  };

  /**
   * It filters t-shirts data based on the search criteria and store it into filteredData state variable.
   * @param {string} searchText
   * searchText is a string passed to function to filter out t-shirts based on matching names, colors, or types.
   */
  const performSearch = (searchText = "some text") => {
    try {
      const searchTerms = searchText.toLowerCase().split(" ");

      const searchedProductsArray = products.filter((product) => {
        // Check if any of the search terms match Name, Colour, or Type
        return searchTerms.some((term) => {
          return product.name.toLowerCase().includes(term);
        });
      });

      console.log("searchedProductsArray: ", searchedProductsArray);
      setSearchedProducts(searchedProductsArray);
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * This function performs debouncing to limit the number of times performSearch function runs as it will run for each keystroke.
   * @param {string} name
   * name is the search criteria for finding t-shirts
   */
  const performDebouncing = (name) => {
    clearTimeout(debounceTimer);
    const timerId = setTimeout(() => {
      performSearch(name);
      // console.log("event form debouncing: ",event);
    }, 500);

    setDebounceTimer(timerId);
  };

  /**
   * This function is used for selectively pass product array to get product cards.
   * @returns {Array}
   */
  const getProductsArray = () => {
    if (filteredProducts.length) {
      return filteredProducts;
    } else if (searchedProducts.length) {
      return searchedProducts;
    } else {
      return products;
    }
  };

  /**
   * This function takes produArr array as input and show product cards on screen.
   * @param {Array} prodArr
   * @returns {Array}
   */
  const iterateToShowProductsCards = (prodArr) => {
    // console.log("prodArr: ", prodArr);
    try {
      return prodArr.map((item) => (
        <ProductCard
          // product={{ ...item }}
          product={item}
          key={item.id}
          cartItems={cartItems}
          handleAddToCart={() => {
            performAddToCart(item);
          }}
        />
      ));
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  //mobile view for filter panal
  const filterPanalView = (
    <AccordionGroup sx={{ maxWidth: "100%" }}>
      <Accordion>
        <AccordionSummary>Filters</AccordionSummary>
        <AccordionDetails>
          <FilterPanal
            productsData={
              searchedProducts && searchedProducts.length
                ? searchedProducts
                : products
            }
            productsChangeHandler={setFilteredProducts}
          />
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );

  const MobileView = (
    <Box sx={{ overflowX: "hidden" }}>
      <Box>
        <Header cartItemsArray={cartItems} />
      </Box>
      <Grid container spacing={2} m={0}>
        {/* FilterPanal */}
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            backgroundColor: "white",
            position: "sticky",
            top: "0",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {/* Search box */}
          <Box>
            <TextField
              id="outlined-basic"
              label="search for items"
              variant="outlined"
              size="small"
              sx={{ marginLeft: "1rem", marginBottom: "0.5rem" }}
              onChange={(event) => {
                setFilteredProducts([]);
                performDebouncing(event.target.value);
              }}
            />
          </Box>
          {/* Filter panel content */}
          <Box>{filterPanalView}</Box>
        </Grid>
        {/* Products */}
        <Grid
          item
          xs={12}
          md={10}
          sx={{
            backgroundColor: "white",
            overflowY: "auto",
            maxHeight: "100vh",
          }}
        >
          {/* products  */}
          <Grid container spacing={2} sx={{ paddingRight: "1rem" }}>
            {/* logic to handle filtered product view on screen */}
            {iterateToShowProductsCards(getProductsArray())}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );

  const DesktopView = (
    <Box sx={{ overflowX: "hidden" }}>
      <Box>
        <Header cartItemsArray={cartItems} />
      </Box>
      <Grid container spacing={2} m={0}>
        {/* FilterPanal */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            backgroundColor: "white",
            position: "sticky",
            top: "0",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            // Add a fixed height and overflow-y property for the scrollbar
            height: "90vh", // Adjust the height as needed
            overflowY: "auto",
          }}
        >
          {/* Search box */}
          <Box>
            <TextField
              id="outlined-basic"
              label="search for items"
              variant="outlined"
              size="small"
              sx={{ marginLeft: "1rem", marginBottom: "0.5rem" }}
              onChange={(event) => {
                setFilteredProducts([]);
                performDebouncing(event.target.value);
              }}
            />
          </Box>
          {/* Filter panel content */}
          <Box>{filterPanalView}</Box>
        </Grid>
        {/* Products */}
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            backgroundColor: "white",
            maxHeight: "90vh", // Adjust the max height to match the FilterPanal height
            overflowY: "auto",
          }}
        >
          {/* products  */}
          <Grid container spacing={2} sx={{ paddingRight: "1rem" }}>
            {/* logic to handle filtered product view on screen */}
            {iterateToShowProductsCards(getProductsArray())}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );

  return <div>{windowWidth <= 768 ? MobileView : DesktopView}</div>;
};

export default Products;
