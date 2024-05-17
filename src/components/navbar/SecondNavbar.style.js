
export const appBarStyle = {
    position: 'fixed',
    top: '69px',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'none',
    width: '350px',
    maxWidth: '2000px',
    margin: '0 auto',
    backgroundColor: 'transparent',
    '@media (max-width: 560px)': {
        width: '100%',
        left: 'auto'
    },
};

export const toolbarStyle = {
    width: '80vw',
    maxWidth: '600px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px',
    '@media (max-width: 560px)': {
        width: '100%',
    },
    '@media (max-width: 450px)': {
        justifyContent: 'center',
        paddingLeft: '0px',
        paddingRight: '0px',
    }
}

export const btnStyle = {
    fontSize: '0.8rem',
    '@media (max-width: 560px)': {
        fontSize: '13px',
        padding: 0
    },
    '@media (max-width: 450px)': {
        fontSize: '12px',
    },
    '@media (max-width: 400px)': {
        minWidth: '56px'
    }
}