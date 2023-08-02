
const clientId = import.meta.env.VITE_CLIENT_ID;
const redirectUri = 'http://localhost:5173';

const genRandomStr = (length) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
};

const codeChallenge = async (codeVerifier) => {

    const base64encode = (string) => {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    };

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data)
    const digested = base64encode(digest);

    return digested;
}

let codeVerifier = genRandomStr(64);

export const auth =  async () => {
            const challenged = await codeChallenge(codeVerifier);
            let state = genRandomStr(64);
            let scope = 'playlist-modify-private';
    
            localStorage.setItem('code_verifier', codeVerifier);
    
            const args = new URLSearchParams({
                response_type : 'code',
                client_id : clientId,
                scope : scope,
                redirect_uri : redirectUri,
                state : state,
                code_challenge_method : 'S256',
                code_challenge : challenged
            });

            window.location = 'https://accounts.spotify.com/authorize?' + args;
            // const links = 'https://accounts.spotify.com/authorize?' + args;
            // return links;
}

export const authResponder = async () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    let code  = urlParams.get('code');
    let verifier = localStorage.getItem('code_verifier');

    const body = new URLSearchParams({
        grant_type : 'authorization_code',
        code : code,
        redirect_uri : redirectUri,
        client_id : clientId,
        code_verifier : verifier
    });

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method :'POST',
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body : body
        });

        if(response.ok){
            const json = await response.json();

            if(!json.error){
                localStorage.setItem('access_token', json.access_token);
            }
            // console.log(localStorage.setItem('access_token', json.access_token))
        }

}   