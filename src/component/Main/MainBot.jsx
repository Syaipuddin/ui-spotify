import { useEffect, useState } from 'react';
import '../../App.css';
import image from '../../assets/image-solid.svg';


function Song () {
    const [token, setToken] = useState('');
    const [data, setData] = useState('');

    useEffect(() => {

        const newToken = localStorage.getItem('access_token');
        if(token !== newToken){
            setToken(newToken);
        }

        const fetcher = async() => {
            const response = await fetch('https://api.spotify.com/v1/browse/categories?country=ID&locale=sv_ID', {
                headers :{
                    'Authorization' : `Bearer ${token}`
                }
            });

            const json = await response.json();
            setData(json);

        }

        if(token){
            fetcher();
        }

    }, [token])

    if(data?.categories !== undefined){
        const lists = data.categories?.items.map((e) => {
            return(
                <div key={e.id} className="categories">
                    <img className='category-image' src={e.icons[0].url} width={'128px'}/>
                    <p>{e.name}</p>
                </div>
            )
        })

        return(
            <>
                {lists}
            </>
        )

    } else {
        return(
            <h3>Please Login First</h3>
        )     
    }
}

function Tracks({searchData}) {
    const [currentData, setCurrentData] = useState(null);

    useEffect(() => {

        if(currentData !== searchData) {
            setCurrentData(searchData);
        }
        console.log(currentData);
    
    }, [searchData, currentData])


    if (currentData?.tracks === undefined) {

        return (
            <h3 style={{color:'white'}}>Empty Track</h3>
        )

    } else if(currentData){
        const items = currentData?.tracks.items.map((e) => {
            return(
                <div key={e.id} className="song-list" onClick={() => window.location = `https://open.spotify.com/track/${e.id}`}>
                    <img className='song-image' src={e.album.images[0]?.url} />
                    <div className="song-detail">
                        <p className='song-name'>{e.name}</p>
                        <p className='artist-name'>{e.artists[0]?.name}</p>
                    </div>
                    
                </div>
            )
        });

        return(
            <>
                 {items}
            </>
        )   

        } 
}

function Albums({searchData}) {
    const [currentData, setCurrentData] = useState(null);

    useEffect(() => {

        if(currentData !== searchData) {
            setCurrentData(searchData);
        }
        
        // console.log(currentData.tracks.items)
    }, [searchData, currentData])

    if(currentData?.tracks === undefined){
         return(
            <h3 style={{color:'white'}}>Empty Album</h3>
         )     
    } else if(currentData.tracks){

        const items = currentData.tracks?.items.map((e) => {
            return(
                <div key={e.id} className="album-box" onClick={() => window.location = `https://open.spotify.com/album/${e.album.id}`}>
                    <img className='album-image' src={e.album.images[0]?.url}  width='80' height='80'/>
                    <p className='album-name'>{e.album.name}</p>
                </div>
                )
            }
        )
    
        return(
            <>
                {items}
            </>
            )
    } 
}

function MainBot({isSearch, searchData}) {

    // useEffect(() => {

        

    // }, [searchData])


   if(isSearch === true) {

        return(
            <div className="main-bot" >
                <div className="track-list">
                    <h3 style={{color:'white'}}>Tracks</h3>
                    <Tracks searchData={searchData}/>
                </div>
                <div className="albums">
                    <h3 style={{color:'white'}}>Albums</h3>
                    <div className="album-rows">
                        <Albums searchData={searchData} />
                    </div>
                    
                </div>
            </div>
            )
    
   } else {

        return(
            <div className="main-bot" >
                <h1>All Songs</h1>
                <div className="list">
                    <div className="category-box">
                        <Song />
                    </div>
                </div>
            </div>
            )
   }
}

export default MainBot;