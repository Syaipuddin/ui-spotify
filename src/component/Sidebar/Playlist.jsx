import '../../App.css';

function Playlist() {
    return(
        <div className="playlist">
            <div className="container-playlist">
                <h2>Create your first playlist</h2>
                <p>It's Easy we'll Help you</p>
                <a href="#" className="pl-btn">Create Playlist</a>
            </div>
            <div className="container-playlist">
                <h2>Let's Find some podcasts to follow</h2>
                <p>We'll keep you updated on new episodes</p>
                <a href="#" className="pl-btn">Browse Podcasts</a>
            </div>
        </div>
    );
}

export default Playlist;