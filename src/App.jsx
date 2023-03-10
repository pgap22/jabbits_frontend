import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ErrorPage from "./ErrorPage";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import NewPassword from "./pages/NewPassword";
import Projects from "./pages/Projects";
import ConfirmAccount from "./pages/ConfirmAccount";
import AcceptProject from "./pages/AceptInvitation";
import Contact from "./pages/Contact";

import ProtectedRoute from "./layout/ProtectedRoute";

import theme from "./helper/theme";

import { AuthProvider } from "./context/AuthProvider";
import { ProyectProvider } from "./context/ProyectProvider";
import ProjectBoard from "./pages/ProjectBoard";
import { AnimatePresence } from "framer-motion";
import MyTask from "./pages/MyTask";
import { TaskProvider } from "./context/TaskProvider";

const App = () => {
  useEffect(() => {
    theme("system");
  }, []);
  return (
    <>
      <AuthProvider>
        <ProyectProvider>
          <TaskProvider>
            <AnimatePresence>
              <Routes>
                <Route path="*" element={<Navigate to={"/404"} />} />
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route
                  path="/forget-password/:token"
                  element={<NewPassword />}
                />
                <Route path="/confirm/:id" element={<ConfirmAccount />} />
                <Route path="/accept-proyect/:id" element={<AcceptProject />} />
                <Route path="/404" element={<ErrorPage />} />

                <Route path="/projects" element={<ProtectedRoute />}>
                  <Route index element={<Projects />} />
                  <Route path=":id" element={<ProjectBoard />} />
                  <Route path=":id/teamates" element={<h1>Hola Colaboradores</h1>}></Route>
                </Route>

                <Route path="/mytasks" element={<ProtectedRoute />}>
                  <Route index element={<MyTask />} />
                </Route>
              </Routes>
            </AnimatePresence>
          </TaskProvider>
        </ProyectProvider>
      </AuthProvider>
    </>
  );
};

export default App;
