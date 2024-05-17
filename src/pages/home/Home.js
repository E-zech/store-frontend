import React, { useContext, useEffect } from 'react';
import ProductComponent from '../../components/product component/ProductComponent';
import { GeneralContext } from '../../App';
import Cart from '../../components/cart/Cart';
import Slider from '../../components/slider/Slider';
import Loader from '../../components/loader/Loader';
import '../../css/App.css';
import '../../css/grid.css';
import './Home.css';
import ResultResultNotFound from '../../utils/ResultNotFound';

export default function Home() {
    const { user, products, setProducts, loader, selectedCategory, setLoader, mainTitleMode } = useContext(GeneralContext);

    useEffect(() => {
        setLoader(true)
        fetch(`http://localhost:5000/products`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            }).finally(() => setLoader(false))
    }, []);

    const displayLowToHigh = () => {
        setProducts([...products.sort((a, b) => (a.price - a.discount) - (b.price - b.discount))]);
    };

    const displayHighToLow = () => {
        setProducts([...products.sort((a, b) => (b.price - b.discount) - (a.price - a.discount))]);
    };

    const displayA2Z = () => {
        setProducts([...products.sort((a, b) => a.title.localeCompare(b.title))]);
    };

    const displayZ2A = () => {
        setProducts([...products.sort((a, b) => b.title.localeCompare(a.title))]);
    };

    return (
        <>

            <section className='homeContainer'>
                <Slider />

                <header className='homeHeader'>
                    <h1 className="homePage-title" style={mainTitleMode}>Skin Care Store</h1>
                </header>

                <div className='homeBtnWrapper'>
                    <button className='homeBtn' onClick={displayLowToHigh}>
                        Low to High
                    </button>

                    <button className='homeBtn' onClick={displayHighToLow}>
                        High to Low
                    </button>

                    <button className='homeBtn' onClick={displayA2Z}>
                        A - Z
                    </button>

                    <button className='homeBtn' onClick={displayZ2A}>
                        Z - A
                    </button>
                </div>

                <section >
                    {loader ? (
                        <Loader />
                    ) : (
                        <>
                            <div className='cartWrapper'>
                                {
                                    user &&
                                    <Cart />
                                }
                            </div>

                            <div className="grid-cards">
                                {products.length > 0 ? (
                                    products
                                        .filter(product => product.category === selectedCategory || selectedCategory === "All")
                                        .map((product, index) => (
                                            <ProductComponent key={index} product={product} />
                                        ))
                                ) : (
                                    <ResultResultNotFound />
                                )}
                            </div>
                        </>
                    )}
                </section>
            </section>
        </>
    );
}
