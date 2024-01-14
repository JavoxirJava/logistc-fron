import Login from "./components/login/Login";
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Product from "./components/product/Product";
import Clients from "./components/clients/Clients";

function App() {
    return (
        <div>
            <NavBar/>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/product' element={<Product/>}/>
                <Route path='/client' element={<Clients/>}/>
            </Routes>
        </div>
    );
}

export default App;
