import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Fab from '@mui/material/Fab';
import { useState, useContext } from 'react';
import { GeneralContext } from "../../App";
import { boxShadowLight, boxShadowDark, hoverBoxShadowLight, hoverBoxShadowDark } from './Cart.style'
import { mainColor, white } from '../../css/Main.style';
import CartList from './CartList';
import { cartIcon } from './Cart.style';

export default function Cart() {
    const { productsInCart, setProductsInCart, snackbar, mode } = useContext(GeneralContext);
    const [isOpen, setIsOpen] = useState(false);

    const incrementQuantity = (productId, price) => {
        const productIndex = productsInCart.findIndex(p => p._id === productId);

        if (productIndex !== -1) {
            const updatedproductsInCart = [...productsInCart];
            const product = updatedproductsInCart[productIndex];

            if (product.quantity + 1 <= product.totalQuantity) {
                product.quantity += 1;
                setProductsInCart(updatedproductsInCart);
            } else {
                snackbar("Max quantity stock");
            }
        }
    }

    const decrementQuantity = (productId, price) => {
        const productIndex = productsInCart.findIndex(p => p._id === productId);
        if (productIndex !== -1) {
            const updatedproductsInCart = [...productsInCart];
            if (updatedproductsInCart[productIndex].quantity > 1) {
                updatedproductsInCart[productIndex].quantity -= 1;
                setProductsInCart(updatedproductsInCart);
            } else {
                removeFromCart(productId);
            }
        }
    };

    const saveChanges = () => {
        fetch(`http://localhost:5000/cart/add`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token,
            },
            body: JSON.stringify({
                products: productsInCart.map(product => ({
                    productId: product._id,
                    quantity: product.quantity,
                    price: product.price,
                })),
            }),
        })
            .then(res => res.json())
            .then(data => {
                setProductsInCart(data);
            })
            .catch(error => {
                console.error('Error saving changes:', error);
            });
    };

    const toggleDrawer = () => {
        if (isOpen) {
            saveChanges();
        }
        setIsOpen(!isOpen);
    };

    const removeFromCart = (id) => {
        if (window.confirm(`Are you sure you want to delete ${id ? 'this product' : 'all products'} ?`)) {
            const url = id ? `http://localhost:5000/cart/delete/${id}` : `http://localhost:5000/cart/delete-all`;
            fetch(url, {
                method: 'DELETE',
                credentials: 'include',
                headers: { "Content-Type": "application/json", 'Authorization': localStorage.token, }
            })
                .then(res => {
                    if (!res.ok) {
                        snackbar('Network response was not ok');
                    }
                    return res.json();
                })
                .then(() => {
                    if (id) {
                        setProductsInCart(productsInCart.filter(p => p._id !== id));
                    } else {
                        setProductsInCart([]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching cart items:', error);
                });
        }
    }

    return (
        <>
            <div>
                <Box onClick={toggleDrawer} sx={{ '& > :not(style)': { m: 2 } }}>
                    <Fab
                        aria-label="add"
                        sx={{
                            ...cartIcon,
                            color: mode === 'light' ? mainColor : white,
                            backgroundColor: mode === 'light' ? 'white' : 'black',
                            boxShadow: mode === 'light' ? boxShadowLight : boxShadowDark,
                            '&:hover': {
                                transform: 'scale(1.1)',
                                boxShadow: mode === 'light' ? hoverBoxShadowLight : hoverBoxShadowDark,
                                backgroundColor: mode === 'light' ? 'white' : 'black',
                            },
                        }} >
                        <ShoppingCartIcon />
                    </Fab>
                </Box>
                <Drawer
                    anchor="right"
                    open={isOpen}
                    onClose={toggleDrawer}
                    transitionDuration={300}>
                    {<CartList toggleDrawer={toggleDrawer} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} removeFromCart={removeFromCart} />}
                </Drawer>
            </div>
        </>
    );
}
