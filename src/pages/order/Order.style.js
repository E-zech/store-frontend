export const orderGrid = {
    width: '90vw',
    margin: '35px auto',
    maxWidth: '2000px',

    justifyContent: 'center',
    '@media (max-width: 700px)': {
        width: '96vw',
        paddingLeft: '0px'
    }
};

export const fontBig = {
    fontSize: '1.4rem',
    '@media (max-width: 700px)': {
        fontSize: '1.1rem',
    }
};

export const fontMedium = {
    fontSize: '1.3rem',
    '@media (max-width: 700px)': {
        fontSize: '1rem',
    }
};

export const fontSmall = {
    fontSize: '1.1rem',
    '@media (max-width: 700px)': {
        fontSize: '0.9rem',
    }
};

export const center = {
    textAlign: 'center',
};

export const orderImgWrapper = {
    textAlign: 'center',
    minWidth: 0,
    width: '70px',
    height: '70px',
    margin: '0 auto',
    paddingLeft: '5px',
    '@media (max-width: 600px)': {
        width: '60px',
        height: '60px',
    },
    '@media (max-width: 450px)': {
        width: '50px',
        height: '50px',
    }
};

export const orderImg = {
    borderRadius: '15px'
};

export const productTitle = {
    fontSize: '1.1rem', fontWeight: 'bold',
    '@media (max-width: 700px)': {
        fontSize: '1rem',
    }
};

export const accordionPadding = {
    '@media (max-width: 600px)': {
        padding: '8px 1px 14px',
    }
};

export const tableFirstWrapper = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

export const tableSeconedWrapper = {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    justifyContent: 'center',
    alignItems: 'center',
};

export const tableThirdWrapper = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '5px',
    fontSize: '1.2rem',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '0px',
    border: '2px solid black',
    borderBottom: 'none',
    textAlign: 'center',
    '@media (max-width: 600px)': {
        fontSize: '0.9rem',
        gap: '0px',
    },
    '@media (max-width: 450px)': {
        fontSize: '0.7rem',
        fontWeight: 'bold'
    }
};

export const tableGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)', backgroundColor: 'white',
    fontSize: '1.2rem',
    alignItems: 'center',
    padding: '10px 0',
    border: '2px solid black',
    textAlign: 'center',
    '@media (max-width: 600px)': {
        fontSize: '0.9rem',
    },
    '@media (max-width: 450px)': {
        fontSize: '0.7rem',
        fontWeight: 'bold'
    }
};

export const orderMessage = {
    minHeight: '56vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};