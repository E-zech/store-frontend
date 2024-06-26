import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '100%',
    },
    '@media (max-width: 560px)': {
        position: 'absolute',
        top: '70px',
        left: '-15px',
        right: 0,
        zIndex: 999,
        width: '106.5%',
    },
    '@media (max-width: 450px)': {
        position: 'absolute',
        top: '70px',
        left: 0,
        right: 0,
        zIndex: 999,
        width: '100%'
    },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    display: 'flex',
    '& .MuiInputBase-input': {
        width: '100%',
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '100%',
        },
    },
}));

export const searchWrapper = {
    flexGrow: 0.5, '@media (max-width: 900px)': {
        flexGrow: 10
    }, '@media (max-width: 600px)': {
        flexGrow: 0.5
    }
}