import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { useSnackbar } from "notistack";

export default function FilterPanal({ productsData, productsChangeHandler }) {

  const [filters, setFilters] = useState({
    gender: "All",
    type: "All",
    color: "All",
    priceRange: "All",
  });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    performSearchUsingSearchParams(productsData, filters);
  }, [filters]);

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const extractDistinctValuesParams = (productsData, key) => {
    let ansSet = new Set();
    productsData.forEach(element => {
      ansSet.add(element[key])
    });

    return Array.from(ansSet);
    
  }


  const performSearchUsingSearchParams = (productsData, filters) => {
    try {
      productsChangeHandler([]);
      let filteredProducts = [...productsData];
  
      if (filters.gender !== "All") {
        filteredProducts = filteredProducts.filter(
          (product) => product.gender.toLowerCase() === filters.gender.toLowerCase()
        );
      }
  
      if (filters.type !== "All") {
        filteredProducts = filteredProducts.filter(
          (product) => product.type.toLowerCase() === filters.type.toLowerCase()
        );
      }
  
      if (filters.color !== "All") {
        filteredProducts = filteredProducts.filter(
          (product) => product.color.toLowerCase() === filters.color.toLowerCase()
        );
      }
  
      if (filters.priceRange === "0-250") {
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= 0 && product.price <= 250
        );
      } else if (filters.priceRange === "251-450") {
        filteredProducts = filteredProducts.filter(
          (product) => product.price > 250 && product.price <= 450
        );
      } else if (filters.priceRange === "450 onwards") {
        filteredProducts = filteredProducts.filter(
          (product) => product.price > 450
        );
      }
  
      if(filteredProducts.length===0){
        // console.log("not found.............................................")
        enqueueSnackbar("Sorry! Required product not found!", { variant: "warning" });
      }
      productsChangeHandler(filteredProducts);
    } catch (e) {
      console.log(e);
    }
  };
  

  // const genderOptions = ["All", "Men", "Women"];
  const genderOptions = ["All", ...extractDistinctValuesParams(productsData,"gender")];
  // const typeOptions = ["All", "Polo", "Hoodie", "Basic"];
  const typeOptions = ["All", ...extractDistinctValuesParams(productsData,"type")];
  // const colorOptions = ["All", "Red", "Blue", "Green","Black","Pink","Grey","Purple"];
  const colorOptions = ["All", ...extractDistinctValuesParams(productsData,"color")];
  const priceRangeOptions = ["All", "0-250", "251-450", "450 onwards"];

  return (
    <Stack>
      <FormControl sx={{ m: 3 }}>
        <FormLabel component="legend" sx={{ fontSize: "1.2rem", textAlign: "initial" }}>
          Gender
        </FormLabel>
        <Select
          value={filters.gender}
          onChange={handleFilterChange}
          name="gender"
          sx={{ width: 150 }}
        >
          {genderOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 3 }}>
        <FormLabel component="legend" sx={{ fontSize: "1.2rem", textAlign: "initial" }}>
          Type
        </FormLabel>
        <Select
          value={filters.type}
          onChange={handleFilterChange}
          name="type"
          sx={{ width: 150 }}
        >
          {typeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 3 }}>
        <FormLabel component="legend" sx={{ fontSize: "1.2rem", textAlign: "initial" }}>
          Color
        </FormLabel>
        <Select
          value={filters.color}
          onChange={handleFilterChange}
          name="color"
          sx={{ width: 150 }}
        >
          {colorOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 3 }}>
        <FormLabel component="legend" sx={{ fontSize: "1.2rem", textAlign: "initial" }}>
          Price Range
        </FormLabel>
        <Select
          value={filters.priceRange}
          onChange={handleFilterChange}
          name="priceRange"
          sx={{ width: 150 }}
        >
          {priceRangeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
