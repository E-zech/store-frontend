import React from 'react';
import { TextField, Button, Grid, Container, Typography, Tooltip } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { GeneralContext } from "../../../App";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { PaymentStructure, SchemaPayment } from '../../../utils/FormValidation';
import { handleChange, useInputsFormColors } from '../../../utils/utils'
import { addressContainer, avatarIcon, avatarStyle } from '../address/Address.style';


export default function Payment({ formPayment, setFormPayment, errors, setErrors, setCurrentStep }) {
    const { user, mode } = useContext(GeneralContext);
    const [isFormPaymentValid, setIsFormPaymentValid] = useState(false);
    const { sx } = useInputsFormColors();

    const paymentBtnStyle = {
        mt: 3, mb: 2, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white',
        '&:hover': {
            backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2',
        }
    };

    const handlePayment = (ev) => {
        handleChange(ev, formPayment, setFormPayment, errors, setErrors, SchemaPayment, setIsFormPaymentValid);
    };


    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box sx={addressContainer}>

                    <Avatar sx={avatarStyle} src={user.imgSrc}>
                        <AssignmentIndIcon sx={avatarIcon} />
                    </Avatar>

                    <Typography component="h1" variant="h5">Payment</Typography>
                    <Box component="form" noValidate mt={1}>
                        <Grid container spacing={2}>
                            {PaymentStructure.map(s =>
                                <Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
                                    <TextField
                                        margin="normal"
                                        required={s.required}
                                        fullWidth
                                        id={s.name}
                                        label={s.label}
                                        name={s.name}
                                        type={s.type}
                                        autoComplete="off"
                                        error={Boolean(errors[s.name])}
                                        helperText={errors[s.name]}
                                        onChange={handlePayment}
                                        value={formPayment[s.name]}
                                        InputLabelProps={{ shrink: true }}
                                        sx={sx}
                                    />
                                </Grid>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={!isFormPaymentValid}
                                onClick={() => setCurrentStep(currentStep => currentStep + 1)}
                                sx={paymentBtnStyle}>
                                Next
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={() => setCurrentStep(currentStep => Math.max(currentStep - 1, 1))}
                                sx={paymentBtnStyle}>
                                Back
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

