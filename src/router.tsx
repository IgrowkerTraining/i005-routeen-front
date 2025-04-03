import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./views/Welcome/Welcome";
// import App from "./App";
import { Layout } from "./layout/Layout";
import { LoginAthlete, LoginTrainer } from "./views/Login";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/welcome" element={<Welcome/>} index />
          <Route path="/login/trainer" element={<LoginTrainer />} index/>
          <Route path="/login/athlete" element={<LoginAthlete />} index/>

          {/* <Route path="/singup" element={} index /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}