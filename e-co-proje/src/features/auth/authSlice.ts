// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "../../../src/lib/supabaseClient";

type User = {
  id: string;
  email?: string | null;
  app_metadata?: any;
  user_metadata?: any;
};

type AuthState = {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
};

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

// Signup with email + password
export const signup = createAsyncThunk(
  "auth/signup",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await supabase.auth.signUp({ email, password });
      if (res.error) throw res.error;
      // res.data.user may be null for magic-link flows; using session if present
      return res.data.user ?? null;
    } catch (err: any) {
      return rejectWithValue(err.message || "Signup failed");
    }
  }
);

// Login with email + password
export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await supabase.auth.signInWithPassword({ email, password });
      if (res.error) throw res.error;
      return res.data.user ?? null;
    } catch (err: any) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await supabase.auth.signOut();
  return null;
});

// Restore session on app start
export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      return session?.user ?? null;
    } catch (err: any) {
      return rejectWithValue(err.message || "Could not restore session");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // used by onAuthStateChange listener to keep store in sync
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.status = action.payload ? "succeeded" : "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(signup.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.user = a.payload;
      })
      .addCase(signup.rejected, (s, a) => {
        s.status = "failed";
        s.error = (a.payload as string) || a.error.message || "Error";
      })

      .addCase(login.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(login.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.user = a.payload;
      })
      .addCase(login.rejected, (s, a) => {
        s.status = "failed";
        s.error = (a.payload as string) || a.error.message || "Error";
      })

      .addCase(logout.fulfilled, (s) => {
        s.status = "idle";
        s.user = null;
      })

      .addCase(restoreSession.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.user = a.payload;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
