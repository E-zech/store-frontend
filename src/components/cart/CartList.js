import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useContext } from 'react';
import { GeneralContext } from "../../App";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from "@mui/material/IconButton";
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { listStyle, bigBoxStyle, counterWrapper, counterBtn, bottomBtnWrapper, imgTitleWrapper, totalWrapper, cartListItem, cartImg, cartSpanText, cartText, cartRemoveBTN, emptyCartMSG, img, dividerStyle, listWrapper } from './Cart.style'
import { mainColor } from '../../css/Main.style';

export default function CartList({ toggleDrawer, incrementQuantity,
    decrementQuantity, removeFromCart }) {
    const { productsInCart, snackbar, mode } = useContext(GeneralContext);
    const navigate = useNavigate();

    const colorMode = {
        color: mode === 'dark' ? 'white' : 'black',
    };

    const backgroundMode = {
        backgroundColor: mode === 'dark' ? 'white' : 'black',
    };

    const backgroundGray = {
        backgroundColor: mode === 'dark' ? '#9c9191' : 'white',
    }

    const btnStyle = {
        ...counterBtn,
        color: mode === 'dark' ? 'black' : mainColor,
        ...backgroundMode,
        '&:hover': {
            ...backgroundGray
        }
    }

    const RemoveBTNStyle = {
        ...cartRemoveBTN,
        ...colorMode,
        backgroundColor: mode === 'dark' ? 'transparent' : 'transparent',
        "&:hover": {
            ...backgroundGray
        }
    }

    const handleChekoutClick = () => {
        if (productsInCart.length === 0) {
            snackbar("You don't have products in cart");
        } else {
            navigate('/checkout');
        }
    }

    const deleteIconStyle = {
        width: '150px', backgroundColor: mode === 'dark' ? '#f700003d' : '#ff7f7f'
    }

    const handleClearCart = () => {
        if (productsInCart.length === 0) {
            snackbar("You don't have products in cart");
        } else {
            removeFromCart(null);
        }
    }
    return (
        <>
            {
                productsInCart.length !== 0 ? (
                    <Box
                        sx={listWrapper}
                        role="presentation"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={toggleDrawer}>

                        <List
                            sx={{ ...listStyle, backgroundColor: mode === 'dark' ? 'black' : '#75a59f' }}>
                            {productsInCart?.map((p, index) => (
                                <Box
                                    onClick={(e) => e.stopPropagation()}
                                    key={index}
                                    sx={bigBoxStyle}>

                                    <ListItem sx={cartListItem}>

                                        <Box sx={imgTitleWrapper}>
                                            <ListItemIcon sx={{ ...cartImg, ...colorMode }}>
                                                <img src={p.imgUrl} alt={p.imgAlt} style={img} />
                                            </ListItemIcon>

                                            <ListItemText
                                                primary={<Typography sx={{ ...cartSpanText, ...colorMode }}>{p.title}</Typography>}
                                                sx={cartText} />
                                        </Box>

                                        <Box sx={counterWrapper}>

                                            <IconButton aria-label="Add quantity" onClick={() => incrementQuantity(p._id, p.price)}
                                                sx={btnStyle}><AddIcon />
                                            </IconButton>

                                            <Typography sx={{ ...cartSpanText, ...colorMode }}>{p.quantity}</Typography>

                                            <IconButton aria-label="Decrease quantity" onClick={() => decrementQuantity(p._id, p.price)}
                                                sx={btnStyle}><RemoveIcon />
                                            </IconButton>
                                        </Box>

                                        <Box sx={totalWrapper}>

                                            <ListItemText primary={
                                                <Typography sx={{ ...cartSpanText, ...colorMode }}>
                                                    Total: {parseFloat((((p.price - p.discount) * p.quantity) * 100) / 100).toFixed(2)}$
                                                </Typography>
                                            } />

                                            <Button sx={RemoveBTNStyle} onClick={() => removeFromCart(p._id)}>
                                                <RemoveShoppingCartIcon />
                                            </Button>
                                        </Box>
                                        <Box sx={dividerStyle}></Box>

                                    </ListItem>
                                </Box>
                            ))}

                        </List>

                        <Box sx={{ ...bottomBtnWrapper, backgroundColor: mode === 'dark' ? 'black' : mainColor }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Box sx={{ width: '350px' }}>
                                <Button onClick={handleChekoutClick}
                                    sx={colorMode}
                                >Go To Checkout</Button>
                            </Box>

                            <Box sx={deleteIconStyle}>
                                <Button onClick={handleClearCart}
                                    sx={{ ...colorMode, "&:hover": { ...colorMode } }}
                                ><DeleteIcon /></Button>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={emptyCartMSG}>
                        <Typography variant="body1">You don't have any products in your cart.</Typography>
                    </Box>
                )
            }
        </>
    )
}


