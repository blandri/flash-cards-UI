import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "../components/home"
import LoginPage from "../components/login"


export const AllRoutes=():any=>(
   <BrowserRouter>
     <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
     </Routes>
   </BrowserRouter>
)