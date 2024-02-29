import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Product from "./components/product/Product";
import Clients from "./components/clients/Clients";
import Dashboard from "./components/Dashboard";
import History from "./components/history/History";
import "./Globallcss/style.css";
import HomeFooter from "./components/home page/HomeFooter";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "./components/home page/Loader";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translateEn from "./locale/translateEn";
import translateRu from "./locale/translateRu";
import Select from "./locale/Select";
import UserDashboard from "./components/user/Dashboard";
import { useEffect, useState } from "react";
import Werhouse from "./components/werHouse/Werhouse";
import Managers from "./components/managers/Clients";
import ViewMore from "./components/product/ViewMore";
import Cassir from "./components/casser/Cassir";
import ViewMoreW from "./components/werHouse/ViewMore";


i18n.use(initReactI18next).init({
    resources: {
        en: { translation: translateEn },
        ru: { translation: translateRu },
    },
    lng: "en",
    fallbackLng: "en",
});

function App() {
    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        // localStorage dan tanlangan tilni olish
        return localStorage.getItem("selectedLanguage") || "en";
    });
    const role = sessionStorage.getItem('role') ? sessionStorage.getItem('role') : ''

    const [lang, setLang] = useState("en");
    const [projectId, setProjectId] = useState("");
    const [werHouseId, setWerHouseId] = useState("");
    const [cashierUrl, setCashierUrl] = useState(`${role}`);

    const changeLanguage = (e) => {
        const newLanguage = e.target.value;
        setSelectedLanguage(newLanguage);
        localStorage.setItem("selectedLanguage", newLanguage); // Tanlangan tilni localStorage ga saqlash
    };

    // Component ilk render bo'lganda ishlaydigan useEffect
    useEffect(() => {
        i18n.changeLanguage(selectedLanguage);
        setLang(selectedLanguage);
    }, [selectedLanguage]);

    AOS.init();

    return (
        <div className="relative">
            <Select
                className={`absolute`}
                changeLang={changeLanguage}
                value={selectedLanguage}
                setLang={setLang}
            />
            <Routes>
                <Route path="/" element={<Loader />} />
                <Route path="/login" element={<Login setCashierUrl={setCashierUrl} />} />
                <Route path="/dashboard" element={<Dashboard lang={lang} />} />
                <Route path="/user-dashboard" element={<UserDashboard lang={lang} />} />
                <Route
                    path={`/${cashierUrl === 'ROLE_CASHIER' ? 'cashier-dashboard' : 'cassier'}`}
                    element={
                        <Cassir
                            lang={lang}
                            cashierUrl={cashierUrl}
                        />
                    }
                />
                <Route
                    path="/project"
                    element={
                        <Product
                            lang={lang}
                            projectId={projectId}
                            setProjectId={setProjectId}
                        />
                    }
                />
                <Route path="/users" element={<Clients lang={lang} />} />
                {/* <Route path="/history" element={<History lang={lang} />} /> */}
                <Route path="/view more" element={<ViewMore lang={lang} />} />
                <Route path="/view_more" element={<ViewMoreW lang={lang} />} />
                <Route
                    path="/warehouse"
                    element={
                        <Werhouse
                            lang={lang}
                            werHouseId={werHouseId}
                            setWerHouseId={setWerHouseId}
                        />
                    }
                />
                <Route path="/footer" element={<HomeFooter />} />
            </Routes>
        </div>
    );
}

export default App;
