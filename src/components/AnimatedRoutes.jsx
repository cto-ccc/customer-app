
import { Routes, Route, BrowserRouter as Router, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Profile from '../pages/Profile';
import Delivery from '../pages/Delivery';
import OrderSummary from '../pages/OrderSummary';
import MakePayment from '../pages/MakePayment';
import { AnimatePresence } from "framer-motion"
import OrderStatus from '../pages/OrderStatus';
import Authentication from '../pages/Authentication';
import FullPageLoader from '../components/FullPageLoader';
import AlertBox from '../components/AlertBox';
import OrderDetails from '../pages/OrderDetails';
import Categories from '../pages/Categories';
import ItemDetail from '../pages/ItemDetail';
import Header from './Header';
import CartHolder from './CartHolder';
import AboutUs from '../pages/AboutUs';
import Recipies from '../pages/Recipies';
import ContactUs from '../pages/ContactUs';
import TermsAndConditions from '../pages/TermsAndConditions';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import RefundPolicy from '../pages/RefundPolicy';
import ApplyCoupon from '../pages/ApplyCoupon';
import Blog from '../pages/Blog';
import AllBlogs from '../pages/AllBlogs';
import Landing from '../pages/Landing';
import { useContext } from 'react';
import { CommonContext } from '../contexts/CommonContext';
import Stores from '../pages/Stores';
import RecipieDetail from '../pages/RecipieDetail';
import AllCategories from '../pages/AllCategories';

function AnimatedRoutes() {
  
  const location = useLocation()
  const {isDesktop}  = useContext(CommonContext)

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>

        <Route element={<FullPageLoader /> } >

          <Route element={<AlertBox />}>

  
            <Route element={<Header />}>
              <Route element={<CartHolder />}>
                <Route path="/" element={isDesktop ? < Landing /> : <Home />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/categories/:id" element={<Categories />}/>
                <Route path="/products/:id" element={<ItemDetail />}/>
              </Route>

              <Route path="/cart" element={<Cart />}/>
              <Route path="/profile" element={<Profile />}/>
              <Route path="/delivery" element={<Delivery />}/>
              <Route path="/orderSummary" element={<OrderSummary />}/>
              <Route path="/makePayment" element={<MakePayment />}/>
              <Route path="/orderStatus" element={<OrderStatus />}/>
              <Route path="/auth" element={<Authentication />}/>
              <Route path="/orderDetails" element={<OrderDetails />}/>
              <Route path="/applyCoupon" element={<ApplyCoupon />}/>
              <Route path="/blog/:id" element={<Blog />}/>
              <Route path="/ccc-blogs/" element={<AllBlogs />}/>
              <Route path="/recipieDetails/:id" element={<RecipieDetail />}/>

              <Route path="/aboutUs" element={<AboutUs />}/>
              <Route path="/allCategories" element={<AllCategories />}/>
              <Route path="/stores" element={<Stores />}/>
              <Route path="/recipies" element={<Recipies />}/>
              <Route path="/contactUs" element={<ContactUs />}/>
              <Route path="/termsAndConditions" element={<TermsAndConditions />}/>
              <Route path="/privacyPolicy" element={<PrivacyPolicy />}/>
              <Route path="/refundPolicy" element={<RefundPolicy />}/>
            </Route>
          </Route>
          </Route>
        
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes;
