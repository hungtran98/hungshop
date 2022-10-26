import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios"


import { popularProducts } from "../data";
import Product from "./Product";


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProduct] = useState([])

  useEffect( () => {
    const getProducts = async () => {
      try {
        const res = await axios.get(cat ? `http://localhost:5000/products?category=${cat}`
        : 'http://localhost:5000/products')
        setProducts(res.data)  
      } catch (error) {
        console.log(error)
      }
    }
    getProducts()
  }, [cat])

  useEffect( () => {
    cat && setFilteredProduct(
      products.filter( item => Object.entries(filters).every( ([key, value]) => 
        item[key].includes(value)
        ))
    )
  }, [products, cat, filters])


  useEffect( () => {
    if(sort === "newest"){
      setFilteredProduct((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt))
    } else if(sort === "asc"){
      setFilteredProduct((prev) => [...prev].sort((a, b) => a.price - b.price))
    }else {
      setFilteredProduct((prev) => [...prev].sort((a, b) => b.price - a.price))
    }
      
  },[sort])

  console.log(filteredProducts)
  return (
    <Container>
      {cat ? filteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      )) : 
      products.map((item) => (
        <Product item={item} key={item.id} />
      ))
      }
    </Container>
  );
};

export default Products;