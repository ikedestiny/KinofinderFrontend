import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = ()=>(
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h3>CineMatch</h3>
                    <p>Your personal movie recommendation engine. Discover new favorites based on your taste.</p>
                    <div class="social-links">
                         <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
      <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
      <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
      <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
                    </div>
                </div>
                
                <div class="footer-column">
                    <h3>Navigation</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Movies</a></li>
                        <li><a href="#">TV Shows</a></li>
                        <li><a href="#">New Releases</a></li>
                        <li><a href="#">My List</a></li>
                    </ul>
                </div>
                
                <div class="footer-column">
                    <h3>Support</h3>
                    <ul>
                        <li><a href="#">Account</a></li>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Device Support</a></li>
                    </ul>
                </div>
                
                <div class="footer-column">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Cookie Preferences</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="copyright">
                <p>&copy; 2023 CineMatch. All rights reserved. This site uses the TMDb API but is not endorsed or certified by TMDb.</p>
            </div>
        </div>
    </footer>
)

export default Footer