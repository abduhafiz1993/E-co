import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, User} from "lucide-react";
import { useAppSelector } from "../store/hooks";


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector((s) => s.auth.user);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          E-co
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
                <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-blue-600">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/Account" className="hover:text-blue-600">
              Account
            </Link>
          </li>
        </ul>

        {/* Cart + Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
          >
            <ShoppingCart size={20} />
          </Link>
          {/* Auth Section */}
          {user ? (
            <Link
              to="/account"
              className="flex items-center gap-2 border px-3 py-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <User size={20} />
              <span>{user.email ?? ""}</span>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="px-3 py-2 border rounded-lg hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-4 text-gray-700 font-medium">
          <li>
            <Link
              to="/products"
              className="block hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
