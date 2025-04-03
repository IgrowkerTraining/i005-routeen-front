import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./views/Welcome/Welcome";
import { Layout } from "./layout/Layout";
import { LoginAthlete, LoginTrainer } from "./views/Login";
import HomeTrainer from "./views/Home/HomeTrainer";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          {/*<Route path="/" element={<Welcome />} index />*/}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login/trainer" element={<LoginTrainer />} />
          <Route path="/login/athlete" element={<LoginAthlete />} />
          <Route path="/home" element={<HomeTrainer />} />
          {/* <Route path="/singup" element={} index /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}