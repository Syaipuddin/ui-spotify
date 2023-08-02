import MainTop from "./Main/MainTop";
import MainBot from "./Main/MainBot";
import { useState } from "react";

import '../App.css';


function Main({isSearch}) {
    const [searchData, setSearchData] = useState(null);

    return(
        <div className="main">
            <MainTop 
                isSearch={isSearch}
                setSearchData={setSearchData} />
            <MainBot 
                isSearch={isSearch}
                searchData={searchData}/>
        </div>
    )
}

export default Main;