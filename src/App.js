import Login from "./components/login/Login";
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Product from "./components/product/Product";
import Dashboard from "./components/Dashboard";

function App() {
    return (
        <div>
            <NavBar/>
            <Routes>
                {/* <Route path='/' element={<Login/>}/> */}
                <Dashboard/>
                <Route path='/product' element={<Product/>}/>
            </Routes>
        </div>
    );
}

export default App;
