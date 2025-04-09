import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loading } from "./views/Loading/Loading";
import { Layout } from "./layout/Layout";
import { LandingPage } from "./views/LandingPage/LandingPage";
import Home from "./views/Home/Home";
import Profile from "./views/Profile/Profile";
import { Singup } from "./views/SingUp/Singup";
import { Login } from "./views/Login/";


export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} index />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/welcome" element={<LandingPage />} index />
          <Route path="/" element={<Loading />} />
          <Route path="/singup" element={<Singup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}