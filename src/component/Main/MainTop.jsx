import { useEffect, useState } from 'react';
import '../../App.css';
import {auth, authResponder} from '../Spotify/auth.jsx';
import { useDebounce } from 'use-debounce';

function Profile() {
    const [profile, setProfile] = useState('');
    const [params, setParams] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // authResponder();

        const newParams = new URLSearchParams(window.location.search);
        let code  = newParams.get('code');
        setParams(code);

        if(code === params) {
            authResponder();
        }


        setToken(localStorage.getItem('access_token'));

        const profileFetcher = async() => {
            const profileInfo = await fetch(`https://api.spotify.com/v1/me`, {
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            })
            const json = await profileInfo.json();
            // console.log(json);
            json.images? setProfile(json.images[0]) : null;
            // console.log(profile);
        }

        if(token) {
            profileFetcher();
        }

    }, [token])


    if (profile) {
        return(
            <img src={profile.url} className='profile' width='36px' />
        )
    } else {
        return(
            <a href='#'onClick={async ()=> auth()} className="login">Log in</a>
        )
    } 
}

function MainTop ({isSearch, setSearchData}) {
    const [query, setQuery] = useDebounce('', 1000);
    const [token, setToken] = useState('');
    useEffect(() => {

        const newToken = localStorage.getItem('access_token');

        if(token !== newToken){
            setToken(newToken)
        }

        const fetcher = async() => {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&market=ID&limit=10`, {
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            });
            const json = await response.json();
            setSearchData(json);
        }

        if(token){
            fetcher();
        }
    }, [token, setToken, setSearchData, query])

    if(isSearch === true) {

        return(
            <div className="main-top-search">
                <div className="arrows">
                    <a href="#"><span className='fa fa-chevron-left'></span></a>
                    <a href="#"><span className='fa fa-chevron-right'></span></a>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="search-box">
                        <p><span className='fa fa-magnifying-glass'></span></p>
                        <input className='input-box' onChange={(e) => setQuery(e.target.value)} placeholder='What do you want to listen to?'/>
                    </div>
                </form>
            </div>
        )

    } else if(isSearch !== true) {

        return(
            <div className="main-top">
                <div className="arrows">
                    <a href="#"><span className='fa fa-chevron-left'></span></a>
                    <a href="#"><span className='fa fa-chevron-right'></span></a>
                </div>
                <div className="log">
                    <Profile />
                </div>
            </div>
    )
    }
    
    
}

export default MainTop;