import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// Utility to add JWT
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", user);
      //   Axios envuelve en otra propiedad data la respuesta del servidor
      // console.log(response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await axios.post("/users/login", user);

    // console.log(response.data);

    const token = response.data.data.token;
    setAuthHeader(token);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");

    clearAuthHeader();

    // ⚠️No hace falta return porque vamos a resetear el estado inicial
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// ⚠️⚠️⚠️SUPER IMPORTANTE REFRESH
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    // 1. Leemos el estado actual para sacar el token que está guardado
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    // 2. Si no hay token, cancelamos la operación
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      // 3. Si hay token, lo ponemos en los headers de Axios
      setAuthHeader(persistedToken);

      // 4. Le preguntamos al servidor "¿Quién soy?"
      const response = await axios.get("/users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
