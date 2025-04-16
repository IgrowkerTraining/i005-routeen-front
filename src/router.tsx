import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Loading } from './views/Loading/Loading'
import { Layout } from './layout/Layout'
import { LandingPage } from './views/LandingPage/LandingPage'
import Home from './views/Home/Home'
import Profile from './views/Profile/Profile'
import { SignUp } from './views/SingUp/Singup'
import { AddAthlete } from './views/AddAthlete/AddAthlete'
import { AddAthleteSuccess } from './views/AddAthleteSuccess/AddAthleteSuccess'
import { Login } from './views/Login/'
import CompleteProfile from "./views/SingUp/CompleteProfile";
import { ExcerciseDetail } from "./views/ExcerciseDetail/ExcerciseDetail";



export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Loading />} index />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/welcome" element={<LandingPage />} index />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/add-athlete" element={<AddAthlete />} />
          <Route path="/add-athlete-success" element={<AddAthleteSuccess />} />
          <Route path="/excercise-detail/:id" element={<ExcerciseDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
