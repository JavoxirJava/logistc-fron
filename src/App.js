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
import i18n from "i18next"
import { initReactI18next } from "react-i18next";
import translateEn from "./locale/translateEn"
import translateRu from "./locale/translateRu"
import Select from "./locale/Select";
import UserDashboard from "./components/user/Dashboard";

i18n.use(initReactI18next).init({
    resources: {
        en: {translation: translateEn},
        ru: {translation: translateRu}
    }, 
    lng: "en",
    fallbackLng: "en"
})

function App() {
    AOS.init();

    const changeLang = (value) => {
        i18n.changeLanguage(value)
    }

    
    return (
        <div className="relative">
            <Select className={`absolute`} changeLang={changeLang} />
            <Routes>
                <Route path='/' element={<Loader/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/user-dashboard' element={<UserDashboard/>}/>
                <Route path='/product' element={<Product/>}/>
                <Route path='/client' element={<Clients/>}/>
                <Route path='/history' element={<History/>}/>
                <Route path='/footer' element={<HomeFooter/>}/>
            </Routes>
        </div>
    );
}

export default App;
