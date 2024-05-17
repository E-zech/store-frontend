import { useContext } from 'react';
import { AppBar, Toolbar, Button, } from '@mui/material';
import { GeneralContext } from '../../App';
import { appBarStyle, toolbarStyle, btnStyle } from './SecondNavbar.style'
import { black, gray, mainColor, transparent, white } from '../../css/Main.style';

function SecondNavbar({ openMenu }) {
    const { mode, setSelectedCategory } = useContext(GeneralContext);

    return (
        <>
            <AppBar sx={appBarStyle}>
                <Toolbar sx={{
                    ...toolbarStyle,
                    backgroundColor: mode === 'dark' ? black : mainColor,
                    color: mode === 'dark' ? white : gray,
                }}
                    onClick={() => openMenu()}
                >
                    <Button color="inherit" onClick={() => setSelectedCategory('All')} sx={btnStyle}>All</Button>
                    <Button color="inherit" onClick={() => setSelectedCategory('Face')} sx={btnStyle}>Face</Button>
                    <Button color="inherit" onClick={() => setSelectedCategory('Eyes')} sx={btnStyle}>Eyes</Button>
                    <Button color="inherit" onClick={() => setSelectedCategory('Body')} sx={btnStyle}>Body</Button>
                    <Button color="inherit" onClick={() => setSelectedCategory('Hands')} sx={btnStyle}>Hands</Button>
                    <Button color="inherit" onClick={() => setSelectedCategory('Feet')} sx={btnStyle}>Feet</Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default SecondNavbar
