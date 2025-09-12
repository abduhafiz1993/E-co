import React from "react";
import { Link } from "react-router-dom";

const VerifyEmail: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
      <p className="text-gray-600 mb-6">
        We’ve sent a confirmation link to your email address.  
        Please check your inbox and click the link to activate your account.
      </p>

      <Link
        to="/login"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default VerifyEmail;
