import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { LoginAthlete, LoginTrainer } from "./views/Login";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route path="/" element={<Home/>} index /> */}
          <Route path="/login/trainer" element={<LoginTrainer />} index/>
          <Route path="/login/athlete" element={<LoginAthlete />} index/>

          {/* <Route path="/singup" element={} index /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}