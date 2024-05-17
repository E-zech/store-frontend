import React from 'react';
import { TextField, Button, Grid, Container, Typography, Tooltip } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { GeneralContext } from "../../../App";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { initialFormDataNoPassword, handleChange, useInputsFormColors } from '../../../utils/utils'
import { ClientStructureNoPassword, SchemaNoPassword } from '../../../utils/FormValidation';
import { addressBtnsWrapper, addressContainer, avatarIcon, avatarStyle, confirmationBox, confirmationBoxWrapper, confirmationText } from './Address.style';

export default function Address({ errors, setErrors, setCurrentStep, handleSubmit }) {
    const { user, setUser, mode } = useContext(GeneralContext);
    const [formData, setFormData] = useState(initialFormDataNoPassword);
    const [isFormValid, setIsFormValid] = useState(false);
    const [showAddressConfirmation, setShowAddressConfirmation] = useState(true);
    const { sx } = useInputsFormColors();

    const whiteColor = {
        color: mode === 'dark' ? 'white' : 'black'
    };

    const btnsStyle = {
        ...whiteColor,
        fontWeight: 'bold'
    };

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
                email: user.email || '',
                city: user.city || '',
                street: user.street || '',
                houseNumber: user.houseNumber || 0,
                zip: user.zip || '',
                imgSrc: user.imgSrc || '',
                imgAlt: user.imgAlt || ''
            });
        }
    }, [user]);

    const handleAddress = (ev) => {
        handleChange(ev, formData, setFormData, errors, setErrors, SchemaNoPassword, setIsFormValid);
    };

    const handleYes = () => {
        setIsFormValid(true);
        setShowAddressConfirmation(false);
    }

    const handleNo = () => {
        setFormData(initialFormDataNoPassword);
        setShowAddressConfirmation(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={addressContainer}>

                <Avatar sx={{ ...avatarStyle, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white' }} src={user?.imgSrc}>
                    <AssignmentIndIcon sx={avatarIcon} />
                </Avatar>

                <Typography component="h1" variant="h5">Address</Typography>
                {showAddressConfirmation && (
                    <Box sx={{ ...confirmationBoxWrapper, ...whiteColor }}>
                        <Box sx={confirmationBox}>
                            <Typography sx={confirmationText}>Is this your current details?</Typography>

                            <Box sx={addressBtnsWrapper}>
                                <Tooltip title="Keep details" arrow >
                                    <Button onClick={handleYes} sx={btnsStyle}>Yes</Button>
                                </Tooltip>

                                <Tooltip title="Clear details" arrow >
                                    <Button onClick={handleNo} sx={btnsStyle} >No</Button>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Box>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        {ClientStructureNoPassword.map(s =>
                            <Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
                                <TextField
                                    margin="normal"
                                    required={s.required}
                                    fullWidth
                                    id={s.name}
                                    label={s.label}
                                    name={s.name}
                                    type={s.type}
                                    autoComplete={s.name}
                                    error={Boolean(errors[s.name])}
                                    helperText={errors[s.name]}
                                    onChange={handleAddress}
                                    value={formData[s.name]}
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{ min: 0 }}
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
                            disabled={!isFormValid}
                            onClick={() => setCurrentStep(currentStep => currentStep + 1)}
                            sx={{
                                mt: 3, mb: 2, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white',
                                '&:hover': {
                                    backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2',
                                }
                            }}>
                            Next
                        </Button>
                    </Grid>
                </Box>
            </Box>
        </Container >
    );
}

