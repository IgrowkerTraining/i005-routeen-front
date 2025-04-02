import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";

export function AppRouter() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route path="/" element={<Home/>} index /> */}
          {/* <Route path="/login" element={} index /> */}
          {/* <Route path="/singup" element={} index /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}