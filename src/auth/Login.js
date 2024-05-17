import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { GeneralContext } from '../App';
import Joi from 'joi';
import { jwtDecode } from 'jwt-decode';
import { useInputsFormColors } from '../utils/utils'
import { loginAvatar, loginContainer } from './auth.style';
import '../css/App.css';


export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();
    const { setUser, setLoader, snackbar, setUserRoleType, mode, mainTitleMode } = useContext(GeneralContext);
    const { sx } = useInputsFormColors();

    const schema = Joi.object({
        email: Joi.string()
            .email({ tlds: false })
            .required()
        ,
        password: Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@%$#^&*\-_*]).{8,32}$/)
            .required().messages({
                "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one special character, and be between 8 and 32 characters in length.",
                "any.required": "Password is required",
            })
    });

    const handelChange = ev => {
        const { name, value } = ev.target;
        const obj = { ...formData, [name]: value };
        setFormData(obj);

        const validate = schema.validate(obj, { abortEarly: false });
        const tempErrors = { ...errors };
        delete tempErrors[name];

        if (validate.error) {
            const item = validate.error.details.find(e => e.context.key == name);

            if (item) {
                tempErrors[name] = item.message;
            }
        }
        setIsFormValid(!validate.error);
        setErrors(tempErrors);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setLoader(true);

        fetch(`http://localhost:5000/users/login`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password'),
            }),
        })
            .then(res => {
                if (res.ok) {
                    return res.json(); //res.text();
                } else {
                    return res.text().then(x => {
                        throw new Error(x);
                    });
                }
            })
            .then(data => {
                const token = data.token
                localStorage.token = token;
                const decodedToken = jwtDecode(token);
                const roleTypeTKN = decodedToken.roleType;

                setUser(data);
                setUserRoleType(roleTypeTKN);

                navigate('/');
                snackbar('log-in successful');
            })
            .catch(err => {
                snackbar('Username or password is incorrect');
            })
            .finally(() => setLoader(false),
            );
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={loginContainer}>

                <Avatar sx={{ ...loginAvatar, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2' }}>
                    <LockOutlinedIcon />
                </Avatar>

                <h1 className='form-title' style={mainTitleMode}>Login</h1>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handelChange}
                        value={formData.email}
                        sx={sx}
                    />

                    <TextField
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handelChange}
                        value={formData.password}
                        sx={sx}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={!isFormValid}
                        sx={{
                            mt: 3, mb: 2, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white',
                            '&:hover': {
                                backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2',
                            }
                        }}>
                        Login
                    </Button>

                    <Grid container justifyContent="center">
                        <Grid item>

                            <Button
                                sx={{ color: mode === 'dark' ? 'white' : 'black' }}
                                onClick={() => { navigate('/signup') }}>
                                Already have an account? Sign In
                            </Button>

                        </Grid>
                    </Grid>

                </Box>
            </Box>
        </Container>

    );
}