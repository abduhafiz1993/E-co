import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signup } from "../features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((s) => s.auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (auth.user) return <Navigate to="/account" />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await dispatch(signup({ email, password }));
    if (signup.fulfilled.match(res)) navigate("/account");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      {auth.error && <div className="text-red-600 mb-2">{auth.error}</div>}
      <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full mb-3 p-2 border rounded" />
      <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded" />
      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Sign Up</button>
    </form>
  );
};

export default Signup;
