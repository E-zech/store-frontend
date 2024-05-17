import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GeneralContext } from "../../../App";
import { mainColor } from '../../../css/Main.style';
import { Box, Button, Grid, Typography } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { orderSumContainer, orderSumContainerWrapper, orderSum, thanksMessage, orderSumGrid, orderSumBtn, orderSumTitle, orderSumText } from './OrderSum.style';

export default function OrderSum() {
    const navigate = useNavigate();
    const { order, mode } = useContext(GeneralContext);

    const btnStyle = {
        ...orderSumBtn,
        backgroundColor: mode === 'dark' ? 'black' : '#99c8c2',
        color: 'white',
        '&:hover': { backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2' }
    }

    return (
        <>
            <Box sx={orderSumContainerWrapper}>
                <Box sx={{ ...orderSumContainer, backgroundColor: mode === 'dark' ? '#3e3e3e' : 'transparent' }}>

                    <Box sx={{
                        ...orderSum, backgroundColor: mode === 'dark' ? 'black' : mainColor
                    }}>
                        <Typography sx={orderSumTitle} >Your order has been placed </Typography>
                        <br />
                        <Box sx={orderSumText} > <strong>Order Number :</strong>{` ${order._id}`}</Box>
                        <br />
                        <Box sx={thanksMessage}>
                            Thank you for your purchase
                            <SentimentSatisfiedAltIcon sx={{ marginLeft: '5px' }} />
                        </Box>
                    </Box>

                    <Grid item xs={6} sm={6} sx={orderSumGrid}>
                        <Button variant="contained"
                            onClick={() => { navigate('/') }}
                            sx={btnStyle}>
                            Home Page
                        </Button>

                        <Button variant="contained"
                            onClick={() => { navigate('/my-orders') }}
                            sx={btnStyle}>
                            My Orders
                        </Button>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}


