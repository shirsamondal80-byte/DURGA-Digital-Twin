function UnityContainer({ simulationStatus }) {
  const isActive =
    simulationStatus === "RUNNING" ||
    simulationStatus === "ACTIVE";

  return (
    <section className="unity-container glass-panel">
      <div className="unity-header">
        <div>
          <span className="panel-kicker">DIGITAL TWIN</span>
          <h2>UNITY SIMULATION</h2>
        </div>

        <div className="unity-status">
          <span
            className={
              isActive
                ? "unity-dot active"
                : "unity-dot"
            }
          />

          {isActive ? "ACTIVE" : simulationStatus}
        </div>
      </div>

      <div className="unity-viewport">
        {/*
          ACTUAL UNITY DIGITAL TWIN WILL BE EMBEDDED HERE.

          No fake engine.
          No placeholder image.
          No simulation controls.

          The actual Unity build will occupy this viewport.
        */}
      </div>

      <div className="unity-footer">
        <span>UNITY RUNTIME</span>
        <span>TELEMETRY SYNC: READY</span>
      </div>
    </section>
  );
}

export default UnityContainer;