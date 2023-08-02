import '../App.css';
import SideTop from './Sidebar/SideTop';
import SideBot from './Sidebar/SideBot';


function Sidebar({isSearch, setIsSearch}) {

    return(
        <div className='sidebar'>
            <SideTop 
            isSearch={isSearch}
            setIsSearch={setIsSearch}/>
            <SideBot />
        </div>
    );
}

export default Sidebar;