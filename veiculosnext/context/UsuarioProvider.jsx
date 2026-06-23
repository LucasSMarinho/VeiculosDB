'use client'

import { useEffect, useState } from "react";
import { UsuarioContext } from "./UsuarioContext";
import { jwtDecode } from "jwt-decode";

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenStorage = window.localStorage.getItem("token");

      if (tokenStorage && tokenStorage !== "undefined") {
    setToken(tokenStorage);

    const decoded = jwtDecode(tokenStorage);
    setUsuario(decoded);
    }
  }, []);


      useEffect(() => {
      const timer = setTimeout(() => {
          localStorage.removeItem("token")
          setToken(null)
      }, 120000);
      
            return () => clearTimeout(timer);
    }, [token]);
  

  return (
    <UsuarioContext.Provider
      value={{ usuario, setUsuario, token, setToken }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};