import React from "react";
import footerLogo from "../../assets/images/favicon.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#128068] text-white">
      <div className="footer sm:footer-horizontal p-10">
        <nav>
          <Link className="footer-title ">Micro Lab</Link>
          <Link to="/">
            <img
              className="ring w-10 h-10 mb-4 rounded-full p-1"
              src={footerLogo}
              alt=""
            />
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>

        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="w-80">
            <label>Enter your email address</label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input text-gray-950 input-bordered join-item"
              />
              <button className="btn bg-[#128068] text-white join-item">
                Subscribe
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="divider"></div>
      <div className="footer sm:footer-horizontal footer-center p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
