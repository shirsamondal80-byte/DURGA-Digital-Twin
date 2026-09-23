function Header({ connectionStatus, simulationStatus }) {
  return (
    <header className="header glass-panel">
      <div className="brand-section">
        <img
          src="/durga-logo.svg"
          alt="Project DURGA"
          className="durga-logo"
        />

        <div className="brand-text">
          <h1>PROJECT DURGA</h1>
          <p>DIGITAL TWIN • MALE UAV ENGINE</p>
        </div>
      </div>

      <div className="header-status">
        <div className="system-status">
          <span className="status-dot" />

          <div>
            <span className="status-label">ENGINE LINK</span>
            <strong>{connectionStatus}</strong>
          </div>
        </div>

        <div className="header-divider" />

        <div className="simulation-status">
          <span className="status-label">SIMULATION</span>
          <strong>{simulationStatus}</strong>
        </div>
      </div>
    </header>
  );
}

export default Header;