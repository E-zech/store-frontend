import { font } from "../../../css/Main.style";

export const orderSumContainerWrapper = {
    width: '100%',
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '100px',
    maxWidth: '2000px',
    minHeight: '45vh',
};

export const orderSumContainer = {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '15px',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50px',
    maxWidth: '2000px',
    margin: '0 auto',
    padding: '50px 0',
};

export const orderSum = {
    width: '85vw',
    gap: '5px',
    fontSize: '1.3rem',
    padding: '20px',
    borderRadius: '17px ',
    textAlign: 'center',
    maxWidth: '2000px',
    margin: '0 auto',
};

export const orderSumTitle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    fontFamily: font
};

export const orderSumText = {
    fontSize: '1.4rem',
    fontFamily: font,
    '@media (max-width: 600px)': {
        fontSize: '1.2rem',
    },
    '@media (max-width: 500px)': {
        fontSize: '1.1rem',
    },
};

export const thanksMessage = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 450px)': {
        flexDirection: 'column'
    },
};

export const orderSumGrid = {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '2000px',
    margin: '0 auto',
    width: '85vw'
};

export const orderSumBtn = {
    width: "45%", mt: 3, mb: 1, p: 1,
};