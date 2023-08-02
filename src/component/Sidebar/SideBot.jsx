import '../../App.css'
import Playlist from './Playlist';
import Footer from './Footer';

function SideBot() {

    return(
            <div className="side-bot">
                <div className="library">
                    <a href="#" className="library"><span className="fa fa-rectangle-list"></span>Your library</a>
                    <a href="#" className="plus"><span className="fa-solid fa-plus"></span></a>
                </div>
                <Playlist />
                <Footer />
            </div>
    );
}

export default SideBot;