import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../App';
import { ClientStructureNoPassword, SchemaNoPassword } from '../utils/FormValidation';
import { initialFormDataNoPassword, handleChange, useInputsFormColors } from '../utils/utils'
import { accountAvatar, accountContainer } from './auth.style';

export default function Account() {
    const [formData, setFormData] = useState(initialFormDataNoPassword);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();
    const { sx } = useInputsFormColors();
    const { user, setUser, setLoader, snackbar, mode } = useContext(GeneralContext);

    const btnStyle = {
        mt: 3, mb: 2,
        backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white',
        '&:hover': {
            backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2',
        }
    };

    useEffect(() => {
        setLoader(true);
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
                email: user.email || '',
                city: user.city || '',
                street: user.street || '',
                houseNumber: user.houseNumber || 0,
                zip: user.zip || 0,
                imgSrc: user.imgSrc || '',
                imgAlt: user.imgAlt || ''
            });
        }
        setLoader(false);
    }, [user]);

    const handleAccountChange = (ev) => {
        handleChange(ev, formData, setFormData, errors, setErrors, SchemaNoPassword, setIsFormValid);
    };

    const handleSubmit = ev => {
        ev.preventDefault();
        setLoader(true);
        const obj = {};
        const elements = ev.target.elements;

        ClientStructureNoPassword.forEach((s) => {
            obj[s.name] = elements[s.name].value;
        });

        fetch(`http://localhost:5000/users/${user._id}`, {
            credentials: 'include',
            method: 'PUT',
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
                setUser(data);
                setLoader(false);
                snackbar("User details updated successfully");
                navigate('/');
            })
            .catch(error => {
                console.error('Error updating user:', error);
                setLoader(false);
            });
    };
    return (
        <>
            {user ?
                <Container component="main" maxWidth="xs">
                    <Box sx={accountContainer}>

                        <Avatar sx={{
                            ...accountAvatar,
                            backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white'
                        }}
                            src={user.imgSrc} alt="User Avatar" />

                        <Typography component="h1" variant="h5">Edit Details</Typography>

                        <Box component="form" onSubmit={handleSubmit} noValidate mt={1}>
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
                                            onChange={handleAccountChange}
                                            value={formData[s.name]}
                                            InputLabelProps={{ shrink: true }}
                                            sx={sx}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={!isFormValid}
                                sx={btnStyle}>
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Container> : ''
            }
        </>
    );
}
