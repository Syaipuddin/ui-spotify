import '../../App.css';

function Footer() {
    return(
            <div className="footer">
                <a>Legal</a>
                <a>Privacy Center</a>
                <a>Privacy Policy</a>
                <a>Cookies</a>
                <a>About Ads</a>
                <a>Accessibility</a>       
                <div className="language">
                    <a className="lang-box"><span className="fa-solid fa-globe"></span>English</a>
                </div>             
            </div>
    );    
}

export default Footer;