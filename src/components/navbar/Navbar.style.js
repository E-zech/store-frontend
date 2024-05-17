export const mainAppbarStyle = {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '2000px',
    height: '75px',
    margin: '0 auto',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    paddingRight: '0 !important',
};

export const mainConatiner = {
    maxWidth: "2000px !important",
    paddingLeft: '16px',
};

export const homeIconStyle = {
    mr: 2,
    display: { xs: 'none', md: 'flex' },
    textDecoration: 'none',
    cursor: 'pointer',
    userSelect: 'none',
};

export const logoImgStyle = {
    width: '50px',
    height: '50px',
    filter: 'grayscale(0.9)',
};

export const logoSpanStyleBig = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginLeft: '-28px',
    marginTop: '23px',
    color: 'black',
};
export const logoSpanStyleSmall = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginLeft: '-28px',
    marginTop: '26px',
    color: 'black',
};

export const menuIconStyleXs = {
    flexGrow: 1,
    display: { xs: 'flex', md: 'none' }
};

export const menuIconStyleMd = {
    flexGrow: 1,
    display: { xs: 'none', md: 'flex' }
};

export const menuBTN = {
    display: 'block',
    textTransform: 'none',
    fontSize: "1.1rem",
};

export const menuStyle = {
    display: { xs: 'block', md: 'none' },
    body: {
        paddingRight: "0 !important",
        overflow: 'visible !important'
    }
};

export const menuItemStyle = {
    textTransform: 'none', fontSize: "1.1rem",
};

export const homeIconStyleSmall = {
    flexGrow: 12,
    mr: 2,
    display: { xs: 'flex', md: 'none' },
    textDecoration: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    color: 'inherit'
};

export const darkModeBTN = {
    ml: 1, '@media screen and (max-width: 600px)': {
        padding: 0
    }
};

export const userBTN = {
    flexGrow: 0, color: 'black'
};

export const userMenuStyle = {
    mt: '59px',
    left: '0px',
};