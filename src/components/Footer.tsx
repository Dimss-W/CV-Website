'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container grid">
        <h2 className="footer__title">
          MARI BERKOLABORASI <span>BERSAMA DIMAS</span> <br />
          DAN WUJUDKAN <span>SOLUSI INOVASI</span> <br />
          DIGITAL ANDA HARI INI.
        </h2>

        <div className="footer__content">
          <div className="footer__links">
            <a href="#work" className="footer__link">
              Karya
            </a>
            <a href="#service" className="footer__link">
              Layanan
            </a>
            <a href="#skills" className="footer__link">
              Keahlian
            </a>
            <a href="#certificates" className="footer__link">
              Sertifikat
            </a>
          </div>

          <div className="footer__social">
            <a
              href="https://github.com/Dimss-W"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="GitHub"
            >
              <i className="ri-github-line" />
            </a>

            <a
              href="https://instagram.com/dimsswijanark_"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Instagram"
            >
              <i className="ri-instagram-line" />
            </a>

            <a
              href="https://linkedin.com/in/dimas-wijanarko"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="LinkedIn"
            >
              <i className="ri-linkedin-box-line" />
            </a>

            <a
              href="https://wa.me/6285794770824"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="WhatsApp"
            >
              <i className="ri-whatsapp-line" />
            </a>
          </div>
        </div>
      </div>

      <span className="footer__copy">
        &#169; Hak Cipta Dilindungi Oleh Dimas Wijanarko
      </span>

      <div className="blob-big" />
    </footer>
  );
}
