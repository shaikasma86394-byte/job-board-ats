import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-section">
          <h3>CareerHub</h3>
          <p>Connecting talented people with amazing opportunities.</p>
          <p>Your dream career starts here.</p>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>support@careerhub.com</p>
          <p>+91 9876543210</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <p>Browse Jobs</p>
          <p>Post Jobs</p>
          <p>Privacy Policy</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <p>Instagram: @careerhub_official</p>
          <p>LinkedIn: CareerHub Jobs</p>
          <p>Twitter: @careerhubjobs</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 CareerHub. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;