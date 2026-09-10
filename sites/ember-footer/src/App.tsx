import FooterBackground from "@/components/FooterBackground";
import BrandLogo from "@/components/BrandLogo";

export default function App() {
  return (
    <footer className="footer" aria-label="Footer">
      <FooterBackground />
      <div className="jobs">
        <span className="tag">got a spark?</span>
        <span className="headline job-title">
          curiosity
          <br />
          built well
        </span>
        <div className="footer-nav">
          <span>Work</span>
          <span>About</span>
          <span>Journal</span>
          <span>Contact</span>
        </div>
      </div>
      <div className="logo" role="img" aria-label="Studio logo">
        <BrandLogo />
      </div>
      <div className="contact">
        <span className="tag">let's talk</span>
        <div className="headline contact-links">
          <span>start something</span>
          <span>with us today</span>
        </div>
        <p className="note">every great idea starts as a small spark. let's tend yours.</p>
        <div className="socials">
          <span aria-label="LinkedIn">
            <img src="/linkedin.svg" alt="" width="35" height="35" />
          </span>
          <span aria-label="Instagram">
            <img src="/instagram.svg" alt="" width="35" height="35" />
          </span>
          <span aria-label="TikTok">
            <img src="/tiktok.svg" alt="" width="35" height="35" />
          </span>
        </div>
      </div>
    </footer>
  );
}
