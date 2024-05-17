import { Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Account from './auth/Account';
import UsersMenagment from './pages/customer management (CRM)/CustomerMenagment';
import About from './pages/about/About';
import FavProducts from './pages/favorites/FavProduct';
import ProductMangement from './pages/product managment (PRM)/ProductMangement';
import AddOrEditProduct from './pages/add or edit product/AddOrEditProduct';
import Product from './pages/product/Product';
import Checkout from './pages/checkout/Checkout';
import Order from './pages/order/Order';
import Home from './pages/home/Home';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/product-management" element={<ProductMangement />} />
            <Route path="/faves" element={<FavProducts />} />
            <Route path="/product/add-edit/:id?" element={<AddOrEditProduct />} />
            <Route path="/user-management" element={<UsersMenagment />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
            <Route path="/my-orders" element={<Order />} />
        </Routes>
    )
}
