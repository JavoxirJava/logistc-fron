import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Product from "./components/product/Product";
import Clients from "./components/clients/Clients";
import Dashboard from "./components/Dashboard";
import History from "./components/history/History";
import "./Globallcss/style.css"
import HomeFooter from "./components/home page/HomeFooter";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Loader from "./components/home page/Loader";

function App() {
    AOS.init();
    return (
        <div>
            <Routes>
                <Route path='/' element={<Loader/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/product' element={<Product/>}/>
                <Route path='/client' element={<Clients/>}/>
                <Route path='/history' element={<History/>}/>
                <Route path='/footer' element={<HomeFooter/>}/>
            </Routes>
        </div>
    );
}

export default App;
