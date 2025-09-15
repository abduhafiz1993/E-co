import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Products from './pages/Product'
import Cart from './pages/Cart'
import ProfilePage from './pages/Account'
import Checkout from './pages/Checkout'
import NotFound from './pages/Notfound'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VerifyEmail from './pages/VerifyEmail'
import ProductDetail from "./pages/ProductDetail";
import CheckoutPage from './pages/Checkout'
import OrderSuccess from './pages/Order-Success'
import OrdersPage from './pages/Orders'





function App() {
 

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/orders" element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute> 
            <Cart />
          </ProtectedRoute>} />
        <Route path="/account" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute> 
          } />
        <Route path="/checkout" element={
          <ProtectedRoute>
          <Checkout />
          </ProtectedRoute>
          } />
        <Route path="/checkout" element={
         <ProtectedRoute> 
          <CheckoutPage />
         </ProtectedRoute> 
          } />

        <Route path="/order-success" element={
          <ProtectedRoute>
          <OrderSuccess />
          </ProtectedRoute>
          } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
