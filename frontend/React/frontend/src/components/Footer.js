import React from "react";
import "./Footer.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";


function Footer() {
  const [buttonClick, setButtonClick] = useState("");

  const onClick = () => {
    if (buttonClick !== "") {
      setButtonClick("");
      setTimeout(() => {
        Swal.fire({
          title: "Tvoja prijava na naš newsletter je uspešna.",
          text: "Hvala na interesovanju!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "indianred",
        });
      }, 10);
    }
  };

  const onChange = (e) => {
    setButtonClick(e.target.value);
  };

  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Prijavi se na naš newsletter i saznaj najnovije informacije pre svih!
        </p>
        <p className="footer-subscription-text">
          Možeš se odjaviti u bilo kom trenutku.
        </p>
        <div className="input-areas">
          <form>
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Unesi svoju email adresu."
              value={buttonClick}
              onChange={onChange}
            />
            <Button buttonStyle="btn--outline" onClick={onClick} link={"#"}>
              Prijavi se!
            </Button>
          </form>
        </div>
      </section>
      <section class="social-media">
        <div class="social-media-wrap">
          <div class="footer-logo">
            <Link to="/" className="social-logo">
              RUNNING PARTNER
            </Link>
          </div>
          <small class="website-rights">RUNNING PARTNER © 2023</small>
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
