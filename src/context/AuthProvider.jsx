import { useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/axiosClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  
  const Logout = ()=>{
    localStorage.setItem("token", '');
    setAuth({});
    navigate("/")
  }

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await clientAxios.get("/usuarios/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAuth(data);
      } catch (error) {
        
      }
      setLoading(false);
    };

    authUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setAuth,
        auth,
        loading,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
