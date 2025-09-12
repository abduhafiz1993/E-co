import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Products from './pages/Product'
import Cart from './pages/Cart'
import Account from './pages/Account'
import Checkout from './pages/Checkout'
import NotFound from './pages/Notfound'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'




function App() {
 

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={
          <ProtectedRoute> 
            <Cart />
          </ProtectedRoute>} />
        <Route path="/account" element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute> 
          } />
        <Route path="/checkout" element={
          <ProtectedRoute>
          <Checkout />
          </ProtectedRoute>
          } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
