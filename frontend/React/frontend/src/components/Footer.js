import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";



function Footer() {


  return (
    <div className="footer-container">

      <section class="social-media">
        <div class="social-media-wrap">
          <div class="footer-logo">
            <Link to="/" className="social-logo">
              RUNNING PARTNER
            </Link>
          </div>
          <small class="website-rights">RUNNING PARTNER © 2024</small>
          <div class="social-icons">
            <a
              class="social-icon-link facebook"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook">
              <i class="fa-brands fa-facebook" />
            </a>
            <a
              class="social-icon-link instagram"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram">
              <i class="fa-brands fa-instagram" />
            </a>
            <a
              class="social-icon-link youtube"
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Youtube">
              <i class="fa-brands fa-youtube" />
            </a>
            <a
              class="social-icon-link twitter"
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter">
              <i class="fa-brands fa-x-twitter" />
            </a>
            <a
              class="social-icon-link twitter"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn">
              <i class="fa-brands fa-linkedin" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
