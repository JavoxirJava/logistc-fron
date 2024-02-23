import NavBar from "../navbar/NavBar"
import { useTranslation } from "react-i18next";


const Cassir = ({changeLanguage, lang}) => {
  const { t } = useTranslation();

  return (
    <div>
      <NavBar changeLang={changeLanguage} cassier={'border-b-red-600 border-b text-slate-900'} lang={lang}/>
    </div>
  )
}

export default Cassir
