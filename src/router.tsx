import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loading } from "./views/Loading/Loading";
import { Layout } from "./layout/Layout";
import { LandingPage } from "./views/LandingPage/LandingPage";
import { LoginAthlete, LoginTrainer } from "./views/Login";


export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route path="/welcome" element={<LandingPage />} index />
          <Route path="/" element={<Loading />} />
          <Route path="/login/trainer" element={<LoginTrainer />} />
          <Route path="/login/athlete" element={<LoginAthlete />} />
  
          {/* <Route path="/singup" element={} index /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}