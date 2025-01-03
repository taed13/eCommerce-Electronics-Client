import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Store from "./pages/Store";
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import SingleBlog from "./pages/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermAndCondition from "./pages/TermAndCondition";
import RefundPolicy from "./pages/RefundPolicy";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { PrivateRoutes } from "./routing/PrivateRoutes";
import { OpenRoutes } from "./routing/OpenRoutes";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import Chat from "./pages/Chat/Chat";
import SetAvatar from "./pages/SetAvatar";
import OrderDetails from "./pages/OrderDetails";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="product" element={<Store />} />
                    <Route path="product/:id" element={<SingleProduct />} />
                    <Route path="blogs" element={<Blog />} />
                    <Route path="blog/:id" element={<SingleBlog />} />
                    <Route
                        path="cart"
                        element={
                            <PrivateRoutes>
                                <Cart />
                            </PrivateRoutes>
                        }
                    />
                    <Route
                        path="my-orders"
                        element={
                            <PrivateRoutes>
                                <Orders />
                            </PrivateRoutes>
                        }
                    />
                    <Route
                        path="order/:id"
                        element={
                            <PrivateRoutes>
                                <OrderDetails />
                            </PrivateRoutes>
                        }
                    />
                    <Route
                        path="my-profile"
                        element={
                            <PrivateRoutes>
                                <Profile />
                            </PrivateRoutes>
                        }
                    />
                    <Route
                        path="checkout"
                        element={
                            <PrivateRoutes>
                                <Checkout />
                            </PrivateRoutes>
                        }
                    />
                    <Route
                        path="order/success"
                        element={
                            <PrivateRoutes>
                                <OrderSuccess />
                            </PrivateRoutes>
                        }
                    />
                    <Route path="compare-product" element={<CompareProduct />} />
                    <Route
                        path="wishlist"
                        element={
                            <PrivateRoutes>
                                <Wishlist />
                            </PrivateRoutes>
                        }
                    />
                    <Route
                        path="login"
                        element={
                            <OpenRoutes>
                                <Login />
                            </OpenRoutes>
                        }
                    />
                    <Route
                        path="signup"
                        element={
                            <OpenRoutes>
                                <Signup />
                            </OpenRoutes>
                        }
                    />
                    <Route
                        path="chat"
                        element={
                            <PrivateRoutes>
                                <Chat />
                            </PrivateRoutes>
                        }
                    />
                    <Route
                        path="setAvatar"
                        element={
                            <PrivateRoutes>
                                <SetAvatar />
                            </PrivateRoutes>
                        }
                    />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="reset-password/:token" element={<ResetPassword />} />
                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="shipping-policy" element={<ShippingPolicy />} />
                    <Route path="refund-policy" element={<RefundPolicy />} />
                    <Route path="term-and-condition" element={<TermAndCondition />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
