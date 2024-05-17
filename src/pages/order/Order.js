import React, { useEffect } from 'react';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Container, ListItemIcon } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useContext } from 'react';
import { GeneralContext } from "../../App";
import Box from '@mui/material/Box';
import { mainColor } from '../../css/Main.style';
import { fontBig, fontMedium, fontSmall, orderGrid, tableFirstWrapper, productTitle, tableSeconedWrapper, tableThirdWrapper, tableGrid, center, orderMessage, orderImgWrapper, orderImg, accordionPadding } from './Order.style';

export default function Order() {
    const { order, setOrder, snackbar, mode, setLoader, mainTitleMode } = useContext(GeneralContext);

    const backgroundColorMode = {
        backgroundColor: mode === 'dark' ? 'black' : mainColor
    };

    useEffect(() => {
        setLoader(true);
        fetch(`http://localhost:5000/my-orders`, {
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
                setOrder(data);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            }).finally(() => setLoader(false))
    }, [])

    return (
        <>
            <h1 className="main-title" style={mainTitleMode}>
                My Orders
            </h1>
            <Box minHeight={'70vh'}>
                {order.length > 0 ? (
                    <>
                        <Grid container spacing={2} sx={orderGrid}>
                            {order.map((orderItem, index) => (
                                <Grid item xs={12} key={index}>
                                    <Accordion>
                                        <AccordionSummary sx={backgroundColorMode}
                                            expandIcon={<ExpandMoreIcon />}
                                        >
                                            <Typography sx={fontBig}><strong>Order ID:</strong> {orderItem._id}
                                                <Typography sx={fontMedium}><strong>Created At:</strong> {new Date(orderItem.createdAt).toLocaleString()}</Typography>
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box fullWidth>

                                                <Accordion>
                                                    <AccordionSummary mt={1} sx={backgroundColorMode}
                                                        expandIcon={<ExpandMoreIcon />}
                                                    >
                                                        <Typography sx={fontMedium}><strong>Products:</strong></Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Box fullWidth>
                                                            {orderItem.products.map((product, idx) => (

                                                                <Accordion key={idx}>
                                                                    <AccordionSummary mt={1} sx={backgroundColorMode} expandIcon={<ExpandMoreIcon />}>
                                                                        <Typography sx={productTitle}>{product.title}</Typography>
                                                                    </AccordionSummary>
                                                                    <AccordionDetails sx={accordionPadding}>
                                                                        <Box sx={tableFirstWrapper}>
                                                                            <Box sx={{ ...tableSeconedWrapper, backgroundColor: mode === 'dark' ? '#2c2d2d' : mainColor }}>
                                                                                <Box sx={tableThirdWrapper}>
                                                                                    <Box>Image</Box>
                                                                                    <Box>QTY</Box>
                                                                                    <Box>Price</Box>
                                                                                    <Box>Discount</Box>
                                                                                    <Box>Total </Box>
                                                                                </Box>

                                                                                <Box key={product._id} sx={{ ...tableGrid, color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? 'black' : 'white' }}>
                                                                                    <ListItemIcon sx={orderImgWrapper}>
                                                                                        <img src={product.imgUrl} alt={product.imgAlt} style={orderImg} />
                                                                                    </ListItemIcon>

                                                                                    <Box className='reviewQTY' sx={center}>{product.quantity}</Box>
                                                                                    <Box className='reviePrice' sx={center}>{product.price}$</Box>
                                                                                    <Box className='revieDiscount' sx={center}>{product.discount}$</Box>
                                                                                    <Box className='reviewTotal' sx={center}>{((product.price - product.discount) * product.quantity).toFixed(2)}$</Box>
                                                                                </Box>
                                                                            </Box>
                                                                        </Box>
                                                                    </AccordionDetails>
                                                                </Accordion>

                                                            ))}
                                                        </Box>
                                                    </AccordionDetails>
                                                </Accordion>

                                                <Accordion>
                                                    <AccordionSummary sx={backgroundColorMode}
                                                        expandIcon={<ExpandMoreIcon />}
                                                    >
                                                        <Typography sx={fontBig}><strong>Payment Details:</strong></Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography mt={1} sx={fontSmall}><strong>Name on Card:</strong> {orderItem.paymentDetails.nameOnCard}</Typography>
                                                        <Typography mt={1} sx={fontSmall}><strong>Last 4 Digits:</strong> {orderItem.paymentDetails.cardLast4Digits}</Typography>
                                                    </AccordionDetails>
                                                </Accordion>

                                                <AccordionDetails>
                                                    <Box >
                                                        <Typography sx={fontBig}><strong>Full Address:</strong> {orderItem.fullAddress}</Typography>
                                                        <Typography mt={1} sx={fontBig}><strong>Total Order:</strong> {orderItem.totalPrice}$</Typography>

                                                    </Box>
                                                </AccordionDetails>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                ) : (
                    <>
                        <Box sx={orderMessage}>
                            <Box>
                                You Dont Have Orders Yet
                            </Box>
                        </Box>
                    </>

                )
                }
            </Box>
        </>
    );
}
