import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { GeneralContext } from '../App';
import { schema, clientStructure } from '../utils/FormValidation';
import { initialFormData, handleChange, useInputsFormColors } from '../utils/utils'
import { signupConatiner } from './auth.style';
import '../css/App.css';


export default function Signup() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const { sx } = useInputsFormColors();
  const { setLoader, snackbar, mode, mainTitleMode } = useContext(GeneralContext);

  const handleSignupChange = (ev) => {
    handleChange(ev, formData, setFormData, errors, setErrors, schema, setIsFormValid);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setLoader(true);
    const obj = {};
    const elements = ev.target.elements;

    clientStructure.forEach((s) => {
      obj[s.name] = elements[s.name].value;
    });


    fetch(`http://localhost:5000/signup`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((x) => {
            snackbar(x);
            throw new Error(x);
          });
        }
      })
      .then(() => {
        navigate('/login');
        snackbar("Sign-up successful");
      })
      .catch((err) => snackbar(err.message))
      .finally(() => setLoader(false));
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={signupConatiner}>

          <Avatar sx={{ m: 1, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white' }}>
            <AssignmentIndIcon />
          </Avatar>

          <h1 className='form-title' style={mainTitleMode}>Sign Up</h1>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <Grid container spacing={2}>
              {clientStructure.map(s =>
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
                    onChange={handleSignupChange}
                    value={formData[s.name]}
                    sx={sx} />
                </Grid>)}
            </Grid>

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
              Signup
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Button
                  sx={{ color: mode === 'dark' ? 'white' : 'black' }}
                  onClick={() => { navigate('/login') }}>
                  Already have an account? Sign In
                </Button>

              </Grid>
            </Grid>

          </Box>
        </Box>
      </Container>
    </>
  );
}

