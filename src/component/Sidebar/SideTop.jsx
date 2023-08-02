import '../../App.css';

function SideTop({isSearch, setIsSearch}) {

    if(isSearch){
        return(
            <>
                <div className="side-top">
                    <a href="" className="search"onClick={(e) => { e.preventDefault(); return setIsSearch(false)}}><span className="fa fa-home"></span>Home</a>
                    <a href="" className="home-btn" onClick={(e)=> {e.preventDefault(); return setIsSearch(true)}}><span className="fa fa-magnifying-glass"></span>Search</a>
                </div>
            </>
    
        );
    } else {
        return(
            <>
                <div className="side-top">
                    <a href="" className="home-btn"onClick={(e) => { e.preventDefault(); return setIsSearch(false)}}><span className="fa fa-home"></span>Home</a>
                    <a href="" className="search" onClick={(e)=> {e.preventDefault(); return setIsSearch(true)}}><span className="fa fa-magnifying-glass"></span>Search</a>
                </div>
            </>
    
        );
    }


}

export default SideTop;