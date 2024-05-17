import { useState, useContext, useEffect, useRef } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Paper } from '@mui/material';
import { Link, useLocation, useNavigate, useResolvedPath } from 'react-router-dom';
import { GeneralContext } from '../../App';
import { pathToRegexp } from 'path-to-regexp';
import SearchBar from '../searchBar/SearchBar';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import MenuIcon from '@mui/icons-material/Menu';
import NightlightIcon from '@mui/icons-material/Nightlight';
import HomeIcon from '@mui/icons-material/Home';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SecondNavbar from './SecondNavbar';
import { black, font, gray, mainColor, mainFont, selectColor, transparent, white } from '../../css/Main.style';
import { mainAppbarStyle, mainConatiner, homeIconStyle, homeIconStyleSmall, menuIconStyleXs, logoSpanStyleBig, logoSpanStyleSmall, logoImgStyle, menuStyle, menuItemStyle, menuIconStyleMd, menuBTN, darkModeBTN, userBTN, userMenuStyle } from './Navbar.style';
import { RoleTypes, pages, disable } from '../../utils/constants';

export const checkPermissions = (permissions, userRoleType) => {
    return permissions.includes(userRoleType);
}

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(false);
    const [isSearchBar, setIsSearchBar] = useState(false);
    const [visibleSecondAppBar, setVisibleSecondAppBar] = useState(false);
    const [isAppBarFixed, setIsAppBarFixed] = useState(false);
    const [toggleIcon, setToggleIcon] = useState(false);
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate();
    const path = useResolvedPath().pathname;

    const { user, userRoleType, logout, mode, setMode, selectedCategory, setSelectedCategory } = useContext(GeneralContext);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    };

    const colorGray = {
        color: mode === 'dark' ? white : gray,
    };

    useEffect(() => {
        document.body.style.paddingRight = '0';
        document.body.style.overflow = 'visible';

        return () => {
            document.body.style.paddingRight = '';
            document.body.style.overflow = '';
        };
    }, [handleOpenNavMenu]);


    useEffect(() => {
        const productPathRegex = pathToRegexp('/product/:id');
        const addEditProductPathRegex = pathToRegexp('/product/add-edit/:id?');

        setIsSearchBar(!disable.includes(pathname) && !productPathRegex.test(pathname) && !addEditProductPathRegex.test(pathname));
        setVisibleSecondAppBar(!disable.includes(pathname) && !productPathRegex.test(pathname) && !addEditProductPathRegex.test(pathname));
    }, [pathname]);

    useEffect(() => {
        const cleanup = () => {
            setSelectedCategory('All');
            setIsAppBarFixed(false);
        };
        return cleanup;
    }, [path]);

    const openMenu = () => {
        setToggleIcon(!toggleIcon);
        setIsAppBarFixed(!isAppBarFixed);
    }

    return (
        <>
            <AppBar sx={{
                ...mainAppbarStyle,
                backgroundColor: mode === 'dark' ? black : mainColor,
                ...colorGray,
                fontFamily: font,
            }}>
                <Container sx={{
                    ...mainConatiner,
                    ...colorGray,
                    '@media (max-width: 450px)': {
                        padding: '0px',
                        ...colorGray,
                    }
                }}>
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            onClick={() => { navigate('/') }}
                            sx={homeIconStyle}>
                            <Tooltip title="Home" arrow>
                                <img src="https://png.pngtree.com/png-vector/20221012/ourmid/pngtree-skincare-logo-png-image_6309022.png" alt="a logo photo" style={{
                                    ...logoImgStyle,
                                    filter: mode === 'dark' ? 'hue-rotate(30deg) brightness(191%)' : 'grayscale(90%)',
                                }} />
                            </Tooltip>
                            <span style={{
                                ...logoSpanStyleBig,
                                color: mode === 'dark' ? 'white' : 'black',
                                fontFamily: font,
                            }}>S</span>
                        </Typography>

                        <Box sx={menuIconStyleXs}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit">
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    ...menuStyle,
                                    '& .MuiMenu-paper': {
                                        backgroundColor: mode === 'dark' ? black : mainColor,
                                        color: 'white',
                                        top: "75px !important",
                                        left: '1px !important',
                                        width: '140px'
                                    },

                                }}>

                                {pages.filter(p => !p.permissions || checkPermissions(p.permissions, userRoleType)).map(p => (
                                    <Link key={p.route} to={p.route}
                                        style={{ ...colorGray, textDecoration: 'none' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center" sx={menuItemStyle}>{p.title}</Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                        </Box>

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={homeIconStyleSmall}>
                            <Tooltip title="Home" arrow>
                                <img src="https://png.pngtree.com/png-vector/20221012/ourmid/pngtree-skincare-logo-png-image_6309022.png" alt="a logo photo" style={{
                                    ...logoImgStyle,
                                    filter: mode === 'dark' ? 'hue-rotate(30deg) brightness(191%)' : 'grayscale(90%)',
                                }} />
                            </Tooltip>
                            <span style={{
                                ...logoSpanStyleSmall,
                                color: mode === 'dark' ? 'white' : 'black',
                                fontFamily: font,
                            }}>S</span>
                        </Typography>

                        <Box sx={menuIconStyleMd}>
                            {pages.filter(p => !p.permissions || checkPermissions(p.permissions, userRoleType)).map(p => (
                                <Link key={p.route} to={p.route} style={{ textDecoration: 'none' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            ...menuBTN,
                                            color: mode === 'dark' ? white : gray,
                                            backgroundColor: p.route === path ? selectColor : transparent
                                        }}>
                                        {p.title}
                                    </Button>
                                </Link>))}
                        </Box>

                        {visibleSecondAppBar &&
                            <Button color="inherit" onClick={openMenu} >
                                {selectedCategory.toUpperCase()}
                                {toggleIcon ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </Button>
                        }

                        {isSearchBar && (<SearchBar />)}

                        <Box >
                            <Tooltip title={mode === 'dark' ? 'Light Mode' : 'Dark Mode'} arrow>
                                <IconButton sx={darkModeBTN}
                                    onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} >
                                    {mode === 'dark' ? <Brightness4Icon /> : <NightlightIcon />}
                                </IconButton>
                            </Tooltip>
                        </Box>

                        {user ?
                            <Box sx={userBTN}>
                                <Tooltip title="Open settings" arrow>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar
                                            sx={{
                                                m: 1, backgroundColor: transparent,
                                                color: mode === 'dark' ? white : gray
                                            }}
                                            src={user.imgSrc} alt={user.imgAlt} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{
                                        ...userMenuStyle,
                                        '& .MuiMenu-paper': {
                                            backgroundColor: mode === 'dark' ? black : mainColor,
                                            color: mode === 'dark' ? white : gray,
                                            right: '0 !important',
                                            marginLeft: '24px',
                                            width: '130px',

                                        }
                                    }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu} >


                                    <Link to="/account" style={{
                                        textDecoration: 'none',
                                        color: mode === 'dark' ? white : gray,
                                    }}>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography align="center">My Account</Typography>
                                        </MenuItem>
                                    </Link>

                                    <MenuItem onClick={() => { navigate('/my-orders') }}>
                                        <Typography textAlign="center">My Orders</Typography>
                                    </MenuItem>

                                    <MenuItem onClick={logout}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>

                                </Menu>
                            </Box> : ''}
                    </Toolbar>
                </Container>
            </AppBar>
            {
                visibleSecondAppBar &&
                isAppBarFixed &&
                <SecondNavbar openMenu={openMenu} />
            }
        </>
    );
}