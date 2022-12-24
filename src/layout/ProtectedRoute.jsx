import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import HeaderHome from "../componentes/Header/HeaderHome";
import AsideHome from "../componentes/Aside/AsideHome";

import theme from "../helper/theme";
const ProtectedRoute = () => {
  const { auth, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  theme('light');
  return (
    <>
      {auth._id ? (
        <>
          <style>
            {`
              @media (min-width: 768px){
                body{
                  height: 100dvh;
                };
              }
              body{
                  background-color: #f0f0f0;
              }`}
          </style>
          <div className="grid h-[100dvh] md:h-auto md:grid-cols-[max-content_1fr]">
            <div className="hidden md:block h-full">
              <AsideHome />
            </div>

            <div className="grid grid-rows-[max-content_1fr] w-full">
              <HeaderHome />

              <div className="w-full flex justify-center">
                <Outlet />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default ProtectedRoute;
