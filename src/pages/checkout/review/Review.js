import React from 'react';
import { Button, Grid, ListItemIcon, Typography } from '@mui/material';
import { useContext } from 'react';
import { GeneralContext } from "../../../App";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useNavigate } from 'react-router-dom';
import {
    reviewContainer, reviewGridHead, reviewGridBody, reviewGridWrapper, reviewImgGrid, reviewImgGridWrapper, removeBtn, reviewAddressPaymentWrapper, reviewAddress, reviewTitles, bold, reviewBtnWrapper, reviewBtnLeft,
    reviewBtnRight,
    noProductsWrapper,
    noProductsText,
    gridHeadBodyWrapper
} from './Review.style.js';
import { avatarIcon, avatarStyle } from '../address/Address.style.js';


export default function Review({ formPayment, setCurrentStep, }) {
    const { user, productsInCart, setProductsInCart, products, setOrder, snackbar, mode, setLoader } = useContext(GeneralContext);
    const navigate = useNavigate();
    const fullAddress = `${user?.houseNumber} ${user?.street} St, ${user?.city}`;

    const backgroundColorGrid = {
        backgroundColor: mode === 'dark' ? 'black' : '#99c8c2'
    }

    const btnStyle = {
        backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', '&:hover': { backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2' }
    }

    const reviewTitlesStyle = {
        ...reviewAddress,
        ...backgroundColorGrid,
        color: mode === 'dark' ? 'white' : 'black'
    }

    function removeOne(productId) {
        const confirmed = window.confirm("Are you sure you want to remove this product from the cart?");
        if (confirmed) {
            fetch(`http://localhost:5000/cart/delete/${productId}`, {
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
                .then(data => {
                    console.log(data.addToCart)
                    setProductsInCart(productsInCart.filter(p => p._id !== productId));
                })
                .catch(error => {
                    console.error('Error fetching cart items:', error);
                });
        }
    }

    function emptyCart() {
        fetch(`http://localhost:5000/cart/delete-all`, {
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
            .then(data => {
                console.log(data.addToCart)
                setProductsInCart([]);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }

    const placeOrder = () => {
        setLoader(true)
        const totalPrice = productsInCart
            .map(p => (p.price - p.discount) * p.quantity)
            .reduce((acc, curr) => acc + curr, 0)
            .toFixed(2);

        const combinedProducts = productsInCart.map(cartItem => ({
            productId: cartItem._id,
            quantity: cartItem.quantity,
            price: cartItem.price,
            ...products.find(product => product._id === cartItem._id)
        }));

        const obj = {
            user: user._id,
            fullName: user.firstName + ' ' + user.lastName,
            products: combinedProducts,
            paymentDetails: {
                nameOnCard: formPayment.nameOnCard,
                cardLast4Digits: formPayment.cardNumber.slice(-4)
            },
            fullAddress: fullAddress,
            totalPrice: parseFloat(totalPrice)
        };

        fetch(`http://localhost:5000/create/order`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Authorization': localStorage.token },
            body: JSON.stringify(obj),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setOrder(data);
                emptyCart();
            })
            .catch(error => {
                console.error('Error updating user:', error);
            }).finally(() => {
                setLoader(false);
                setCurrentStep(currentStep => currentStep + 1);
                snackbar("Thank you for your purchase");
            });
    }

    return (
        <>
            {
                productsInCart.length !== 0 ? (
                    <Box sx={reviewContainer}>
                        <Avatar sx={avatarStyle} src={user.imgSrc}>
                            <AssignmentIndIcon sx={avatarIcon} />
                        </Avatar>

                        <Typography component="h1" variant="h5">Review</Typography>
                        <Box sx={{ ...reviewGridWrapper, backgroundColor: mode === 'dark' ? 'dark' : 'transparent' }}>
                            <Box sx={gridHeadBodyWrapper}>
                                <Box sx={{ ...reviewGridHead, ...backgroundColorGrid }}>
                                    <Box>Image</Box>
                                    <Box>Title</Box>
                                    <Box>Price</Box>
                                    <Box>Dis</Box>
                                    <Box>QTY</Box>
                                    <Box>Total </Box>
                                    <Box>Remove</Box>
                                </Box>

                                {productsInCart.map((p) => (
                                    <Box onClick={(e) => e.stopPropagation()} key={p._id} sx={{ ...reviewGridBody, ...backgroundColorGrid }}>
                                        <ListItemIcon sx={reviewImgGridWrapper}>
                                            <img src={p.imgUrl} alt={p.imgAlt} style={reviewImgGrid} />
                                        </ListItemIcon>
                                        <Box>{p.title}</Box>
                                        <Box>{p.price}$</Box>
                                        <Box>{p.discount}$</Box>
                                        <Box>{p.quantity}</Box>
                                        <Box>{((p.price - p.discount) * p.quantity).toFixed(2)}$</Box>
                                        <Box onClick={() => removeOne(p._id)} sx={removeBtn}>❌</Box>
                                    </Box>
                                ))}
                            </Box>
                            <Box sx={reviewAddressPaymentWrapper}>
                                <Box sx={reviewTitlesStyle}>
                                    <Box sx={reviewTitles}>
                                        Address Details
                                    </Box>
                                    <Box>
                                        <Typography sx={bold}>Full Name:</Typography>
                                        {` ${user.firstName + ' ' + user.lastName}`}
                                    </Box>
                                    <Box>
                                        <Typography sx={bold}>Address:</Typography>
                                        {` ${fullAddress}`}
                                    </Box>
                                    <Box>
                                        <Typography sx={bold}>Zip Code:</Typography>
                                        {` ${user.zip}`}
                                    </Box>
                                </Box>

                                <Box sx={reviewTitlesStyle}>
                                    <Box >
                                        <Box sx={reviewTitles}>
                                            Payment Details
                                        </Box>
                                        <Box>
                                            <Typography sx={bold}>Name On Card:</Typography>
                                            {` ${formPayment.nameOnCard}`}
                                        </Box>
                                        <Box>
                                            <Typography sx={bold}>Last 4 Digits:</Typography> {` ${formPayment.cardNumber.slice(-4)}`}
                                        </Box>
                                        <Box>
                                            <Typography sx={bold}>Expiry Date:</Typography>
                                            {` ${formPayment.expiryDate}`}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Grid item xs={12} sm={12} sx={reviewBtnWrapper}>
                            <Button onClick={placeOrder} fullWidth variant="contained" sx={{ ...reviewBtnLeft, ...btnStyle }}>
                                Place Order
                            </Button>

                            <Button type="submit" fullWidth variant="contained" onClick={() => setCurrentStep(currentStep => Math.max(currentStep - 1, 1))} sx={{ ...reviewBtnRight, ...btnStyle }}>
                                Back
                            </Button>
                        </Grid>
                    </Box>
                ) : (
                    <Box sx={noProductsWrapper}>
                        <Typography sx={noProductsText}>You dont have Product In Cart.</Typography>
                        <Button
                            onClick={() => navigate('/')}
                            variant="contained"
                            sx={{ mt: 3, width: '220px', ...btnStyle }}>
                            Back To Home Page
                        </Button>
                    </Box>
                )
            }
        </>
    );
}
