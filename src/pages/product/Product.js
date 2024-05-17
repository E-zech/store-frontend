import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import './Product.css';
import Cart from "../../components/cart/Cart";
import { GiBarefoot } from "react-icons/gi";
import { FaHandSparkles } from "react-icons/fa";
import { IoBody } from "react-icons/io5";
import { MdOutlineFaceRetouchingNatural } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { Tooltip } from "@mui/material";
import { font } from "../../css/Main.style";
import '../../css/App.css';

export default function Product() {
    const [product, setProduct] = useState({});
    const [isInCart, setIsInCart] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, setLoader, snackbar, productsInCart, add2Cart, mainTitleMode, mode } = useContext(GeneralContext);

    const icons = {
        Feet: <GiBarefoot size={50} />,
        Hands: <FaHandSparkles size={50} />,
        Body: <IoBody size={50} />,
        Face: <MdOutlineFaceRetouchingNatural size={50} />,
        Eyes: <IoEyeSharp size={50} />
    };

    const renderIcon = (category) => {
        return icons[category] || null;
    };

    const handleAdd2Cart = () => {
        if (!isInCart) {
            add2Cart(product._id, product.title, product.price);
        } else {
            snackbar('Product already in cart');
        }
    }

    useEffect(() => {
        const index = productsInCart.findIndex(p => p._id === product._id);
        setIsInCart(index !== -1);
    }, [productsInCart, product])


    useEffect(() => {
        setLoader(true);
        fetch(`http://localhost:5000/products/${id}`, {
            credentials: 'include',
            headers: {
                'Authorization': localStorage.token,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
            }).finally(() => {
                setLoader(false);
            })
    }, [id]);

    const buyNow = async () => {
        if (!isInCart) {
            await add2Cart(product._id, product.title, product.price);
            navigate('/checkout');
        } else {
            navigate('/checkout');
        }
    };


    return (
        <>
            <main className="productWrapper" style={{ background: mode === 'dark' ? 'black' : '' }} >
                <header className="header" >
                    <h1 className="main-title" style={mainTitleMode}>{product.title}
                        <div className="icon">{renderIcon(product.category)}
                        </div>
                    </h1>
                </header>

                <section className="first-wrapper" >
                    <div className="img-container">
                        <img className="img" src={product.imgUrl} alt={product.imgAlt} />
                    </div>

                    <div className="btnsPrice-wrapper">
                        <div className="priceDiscount-container">
                            <span className="category">Category: {product.category} </span> <br />
                            <span className="price">Price: {product.price}$</span> <br />
                            <span className="discount">Discount: {product.discount}$</span><br />

                            <span className="totalPrice">Total Price: {parseFloat((((product.price - product.discount)) * 100) / 100).toFixed(2)}$</span>
                        </div>
                        {
                            user &&
                            <div className="btns-container">
                                <button className="btn" onClick={handleAdd2Cart}>
                                    {isInCart ? 'Already in cart' : 'Add to cart'}
                                </button>
                                <button onClick={buyNow} className="btn">Buy now</button>
                            </div>
                        }

                    </div>

                </section>

                <section className="second-wrapper" >
                    <div >
                        <h2>Description</h2>
                        {product.description}
                    </div>
                    <div >
                        <h2>How To Use</h2>
                        {product.howToUse}
                    </div>
                    <div >
                        <h2>Ingredients</h2>
                        {product.Ingredients}
                    </div>

                    <div className="cartWrapper">
                        {
                            user &&
                            <Cart />
                        }
                    </div>
                </section>
            </main>
        </>
    )
}


