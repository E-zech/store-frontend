import React, { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../App';
import ProductComponent from '../../components/product component/ProductComponent';
import Cart from '../../components/cart/Cart';
import '../../css/grid.css';
import Loader from '../../components/loader/Loader';
import './FavProduct.css';
import ResultResultNotFound from '../../utils/ResultNotFound';

export default function FavProducts() {
    const { user, snackbar, loader, setLoader, products, selectedCategory, favProducts, setFavProducts, mainTitleMode } = useContext(GeneralContext);

    useEffect(() => {
        setLoader(true);
        fetch(`http://localhost:5000/products/my-faves-products`, {
            credentials: 'include',
            headers: {
                'Authorization': localStorage.token,
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.text().then(x => {
                        return snackbar(x);
                    });
                }
            })
            .then(data => {
                setFavProducts(data);
                setLoader(false);
            });
    }, []);

    return (
        <>
            <header>
                <h1 className='main-title' style={mainTitleMode}> My Favorites Products</h1>
                <br />
            </header>

            <div className='cartWrapper'>
                {
                    user &&
                    <Cart />
                }
            </div>

            <section className='favContainer'>
                {loader ? (
                    <Loader />
                ) : (
                    <div className="grid-cards">
                        {products.length > 0 ? (
                            products
                                .filter(product => product.category === selectedCategory || selectedCategory === "All")
                                .filter(product => favProducts?.some(favProduct => favProduct._id === product._id))
                                .map((product, index) => <ProductComponent key={index} product={product} setFavProducts={setFavProducts} />)
                        ) : (
                            <ResultResultNotFound />
                        )
                        }
                    </div>
                )}
            </section>
        </>
    )
}
