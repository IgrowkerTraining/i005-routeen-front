import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loading } from "./views/Loading/Loading";
import { Layout } from "./layout/Layout";
import { LandingPage } from "./views/LandingPage/LandingPage";
import { LoginAthlete, LoginTrainer } from "./views/Login";
import Home from "./views/Home/Home";
import Profile from "./views/Profile/Profile";
import { SignUp } from "./views/SingUp/Singup";
import { AddAthlete } from "./views/AddAthlete/AddAthlete";
import { AddAthleteSuccess } from "./views/AddAthleteSuccess/AddAthleteSuccess";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Loading />} />
          <Route path="/login/trainer" element={<LoginTrainer />} />
          <Route path="/login/athlete" element={<LoginAthlete />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/welcome" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add-athlete" element={<AddAthlete />} />
          <Route path="/add-athlete-success" element={<AddAthleteSuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
