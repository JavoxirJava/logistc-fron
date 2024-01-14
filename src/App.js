import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import NavBar from "./components/navbar/NavBar";
import Product from "./components/product/Product";
import Clients from "./components/clients/Clients";
import Home from "./components/home page/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/login/Login";

function App() {
    return (
        <div>
            <NavBar />
            <Dashboard />
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Home />} />
                {/* <Route path='/' element={<Login/>}/> */}
                <Route path='/product' element={<Product />} />
                <Route path='/client' element={<Clients/>}/>
            </Routes>
        </div>
    );
}

export default App;
