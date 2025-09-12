import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import './index.css'
import App from './App.tsx'
import { store } from "./store/index";
import {BrowserRouter} from "react-router-dom";
import { supabase } from "./lib/supabaseClient";
import { setUser } from "./features/auth/authSlice";
import { restoreSession } from "./features/auth/authSlice";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
store.dispatch(restoreSession());

// subscribe to auth changes
supabase.auth.onAuthStateChange((_event, session) => {
  // session?.user may be undefined when signed out
  store.dispatch(setUser(session?.user ?? null));
});
