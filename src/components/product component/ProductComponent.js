import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useContext, useState, useEffect } from "react";
import { GeneralContext } from "../../App";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { btnBgcGray, btnBgcTransparent, btnBgcWhite, btnWrapper, cardContentStyle, cardStyle, cartMediaStyle, containerCardStyle, discountBtnStyle, priceWrapper, titleStyle, priceStyle } from './ProductComponent.style';
import { black, mainColor, white } from "../../css/Main.style";

export default function ProductComponent({ product }) {
  const [isDiscount, setIsDiscount] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const path = useResolvedPath().pathname;
  const navigate = useNavigate();
  const { user, mode, products, setProducts, productsInCart, snackbar, favProducts, setFavProducts, add2Cart, setLoader, setPopUpLogin } = useContext(GeneralContext);

  const isAdded = productsInCart?.some(item => item._id === product._id);
  const isFavorite = favProducts?.some(item => item._id === product._id);

  const btnBgcMode = {
    backgroundColor: mode === 'light' ? btnBgcWhite : btnBgcGray
  };

  useEffect(() => {
    setIsDiscount(product.discount !== 0);
  }, [product.discount])


  const handleClick = () => {
    if (user) {
      if (isAdded) {
        snackbar("Item already in cart");
      } else {
        // here i want to add a loader (small loader) that will be inside the card instead of (and in the size of) the ShoppingCartIcon
        add2Cart(product._id, product.title, product.price);
        // anf here after the add2Cart function is finish i want to stop the loader 
      }
    } else {
      setPopUpLogin(true);
    }
    setIsSaving(false);
  };


  const toggleFavOrNot = (id) => {
    if (user) {
      const snackbarMessage = isFavorite ? 'Removed from Favorites' : 'Added to Favorites';

      fetch(`http://localhost:5000/products/faves/${id}`, {
        credentials: 'include',
        method: 'PATCH',
        headers: {
          'Authorization': localStorage.token,
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          if (!res.ok) {
            return snackbar('Network response was not ok : product Component "toggleFavOrNot"');
          }
          return res.json();
        })
        .then(data => {
          setProducts(products => products.map(p => p._id === id ? { ...p, faves: data.faves } : p));
          setFavProducts(favProducts => {
            if (!favProducts) favProducts = [];
            return isFavorite ? favProducts.filter(p => p._id !== id) : [...favProducts, product];
          });
          snackbar(snackbarMessage);
        });
    } else {
      setPopUpLogin(true);
    }

  };


  const deleteProduct = (id) => {
    setLoader(true);
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (isConfirmed) {
      fetch(`http://localhost:5000/products/${id}`, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Authorization': localStorage.token,
          'Content-Type': 'application/json',
        },
      })
        .then((data) => {
          const updatedProducts = products.filter(product => product._id !== id);
          setProducts(updatedProducts);
          setLoader(false);
          snackbar(data.message);
        });
    }
    setLoader(false);
  }

  return (
    <>
      <Container sx={containerCardStyle}>
        <Card key={product._id} sx={{ ...cardStyle, color: mode === 'light' ? black : white, backgroundColor: mode === 'light' ? white : black, }}>

          {isDiscount && (
            <IconButton aria-label="discount"
              sx={{
                ...discountBtnStyle, ...priceStyle,
                backgroundColor: mode === 'light' ? mainColor : black,
              }}>
              -{product.discount.toFixed(2)}$
            </IconButton>
          )}

          <CardMedia sx={cartMediaStyle}
            component="img"
            image={product.imgUrl}
            alt={product.imgAlt}
            onClick={() => { navigate(`/product/${product._id}`) }} />

          <CardContent sx={cardContentStyle}>
            <Box>
              <Typography sx={titleStyle}>
                {product.title}
              </Typography>
            </Box>

            <Box sx={priceWrapper}>
              {isDiscount &&
                <IconButton aria-label="total-price" sx={{ ...btnBgcTransparent, ...priceStyle }}>
                  {`${(Math.floor((product.price - product.discount) * 10) / 10).toFixed(1)}0$`}
                </IconButton>
              }

              <IconButton aria-label="price" sx={{
                textDecoration: isDiscount ? 'line-through' : 'none', ...btnBgcTransparent, ...priceStyle
              }}>
                {product.price.toFixed(2)}$
              </IconButton>

            </Box>

            {path === '/product-management' &&
              <>
                <Box>
                  <Typography sx={{ textAlign: 'center' }}>
                    {product.totalQuantity === 0 ? 'Out of Stock' : `In-Stock: ${product.totalQuantity} Units`}
                  </Typography>
                </Box>
              </>
            }
          </CardContent>

          {
            <CardActions disableSpacing
              sx={btnWrapper}>
              {(path === '/' || path === '/faves') && (
                <>
                  <Tooltip title={isAdded ? "Already In Cart" : "Add to Cart"} arrow>

                    <IconButton
                      aria-label="Add or Remove from cart"
                      onClick={() => { setIsSaving(true); handleClick(); }}
                      disabled={isSaving}
                      sx={btnBgcMode}>
                      {isAdded ? <ShoppingCartIcon /> : <AddShoppingCartIcon />}
                    </IconButton>
                  </Tooltip>


                  <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"} arrow >
                    <IconButton id='favoriteBtn' aria-label="add to favorites"
                      onClick={() => toggleFavOrNot(product._id,)}
                      sx={btnBgcMode}>
                      <FavoriteIcon color={isFavorite ? "error" : ""} />
                    </IconButton>
                  </Tooltip>
                </>
              )}

              {path === '/product-management' && (
                <>
                  <Tooltip title="Edit Product" arrow>
                    <IconButton aria-label="Edit"
                      sx={btnBgcMode}
                      onClick={() => { navigate(`/product/add-edit/${product._id}`) }}><EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete Product" arrow>
                    <IconButton aria-label="Delete"
                      sx={btnBgcMode}
                      onClick={() => deleteProduct(product._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </CardActions>
          }
        </Card>
      </Container>
    </>
  );
}
