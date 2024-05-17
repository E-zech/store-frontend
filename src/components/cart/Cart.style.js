export const boxShadowLight = '0px 0px 0px 5px #99c8c2, 0px 0px 9px 1px #99c8c2, 0px 0px 0px 7px #99c8c2';
export const boxShadowDark = '0px 0px 0px 5px #fff, 0px 0px 9px 1px #fff, 0px 0px 0px 7px #fff';

export const hoverBoxShadowLight = '0px 0px 0px 6px #99c8c2, 0px 0px 10px 2px #99c8c2, 0px 0px 0px 8px #99c8c2';
export const hoverBoxShadowDark = '0px 0px 0px 6px #fff, 0px 0px 10px 2px #fff, 0px 0px 0px 8px #fff';


export const listWrapper = {
    width: 500,
    '@media (max-width:600px)': {
        width: 400
    },
    '@media (max-width:500px)': {
        width: 300
    },
    '@media (max-width:400px)': {
        width: 250
    }
};

export const listStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '36px',
    gap: '25px',
    paddingTop: '10px',
};

export const bigBoxStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    textAlign: 'center',
};

export const cartListItem = {
    width: '100%',
    padding: '0px',
    justifyContent: 'center',
    '@media (max-width:600px)': {
        flexDirection: 'column',
        gap: '20px',
        marginTop: '20px'
    },
};

export const imgTitleWrapper = {
    width: '40%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0px, 15px',
    '@media (max-width:600px)': {
        flexDirection: 'column',
        width: '100%',
    },
};

export const cartImg = {
    width: '70px',
    height: '70px',
    '@media (max-width:600px)': {
        width: '140px',
        height: '140px',
    },
};

export const img = {
    borderRadius: '15px',
    minWidth: '70px'
}
export const cartSpanText = {
    fontSize: '17px',
    fontWeight: 'bold',
    '@media (max-width:600px)': {
        fontSize: '21px'
    },
};

export const cartText = {
    minWidth: '0px', maxWidth: '120px',
};

export const counterWrapper = {
    width: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    textAlign: 'center',
    marginLeft: '5px',
    '@media (max-width:600px)': {
        gap: '18px',
        marginLeft: '0px',
    },
};

export const counterBtn = {
    width: '28px',
    height: '28px',
    borderRadius: '25%',
};

export const totalWrapper = {
    width: '35%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    '@media (max-width:600px)': {
        flexDirection: 'column',
        width: '100%'
    },
};

export const cartRemoveBTN = {
    justifyContent: 'center',
    minWidth: '44px',
    borderRadius: '25%',
};

export const bottomBtnWrapper = {
    textAlign: 'center',
    position: "fixed",
    bottom: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 500,
    '@media (max-width:600px)': {
        width: 400
    },
    '@media (max-width:500px)': {
        width: 300
    },
    '@media (max-width:400px)': {
        width: 250
    }
};

export const emptyCartMSG = {
    width: 500,
    textAlign: 'center',
    marginTop: '20px',
    '@media (max-width:600px)': {
        width: 400
    },
    '@media (max-width:500px)': {
        width: 300
    },
    '@media (max-width:400px)': {
        width: 250
    }
};

export const cartIcon = {
    width: '50px',
    height: '50px',
    zIndex: '99',
    transition: 'all 0.3s ease',
    '@media (max-width:500px)': {
        width: '40px',
        height: '40px',
    }
};

export const dividerStyle = {
    display: 'none',
    '@media (max-width:600px)': {
        display: 'block',
        width: '95%',
        height: '2px',
        backgroundColor: '#d4d4d4',
        borderRadius: '50%',
    }
};