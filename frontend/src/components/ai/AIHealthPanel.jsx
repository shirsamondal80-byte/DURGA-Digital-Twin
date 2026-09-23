function getStatusClass(status, severity) {
  const value = String(
    severity || status || ""
  ).toUpperCase();

  if (
    value === "CRITICAL" ||
    value === "HIGH"
  ) {
    return "ai-critical";
  }

  if (
    value === "WARNING" ||
    value === "MEDIUM"
  ) {
    return "ai-warning";
  }

  return "ai-normal";
}


function AIHealthPanel({ aiAnalysis }) {
  const assessment =
    aiAnalysis?.health_assessment;

  const engineering =
    aiAnalysis?.engineering_analysis;

  const physics =
    aiAnalysis?.physics_analysis;


  if (!assessment) {
    return (
      <section className="ai-health-panel glass-panel">

        <div className="panel-heading">
          <div>
            <span className="panel-kicker">
              ARTIFICIAL INTELLIGENCE
            </span>

            <h2>AI ENGINE HEALTH</h2>
          </div>

          <div className="ai-status waiting">
            <span />
            WAITING
          </div>
        </div>

        <div className="ai-empty-state">
          <div className="ai-empty-icon">
            ◈
          </div>

          <strong>
            Awaiting AI engine assessment
          </strong>

          <p>
            Send telemetry from the Engine
            Control laptop to obtain the
            latest AI health analysis.
          </p>
        </div>

      </section>
    );
  }


  const statusClass =
    getStatusClass(
      assessment.status,
      assessment.severity
    );


  const health =
    Number(
      assessment.overall_health ?? 0
    );


  const confidence =
    Number(
      assessment.confidence ?? 0
    );


  const anomalyDetected =
    Boolean(
      assessment.anomaly_detected
    );


  return (
    <section
      className={`ai-health-panel glass-panel ${statusClass}`}
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="panel-heading">

        <div>
          <span className="panel-kicker">
            ARTIFICIAL INTELLIGENCE
          </span>

          <h2>AI ENGINE HEALTH</h2>
        </div>

        <div
          className={`ai-status ${statusClass}`}
        >
          <span />
          {assessment.status || "NORMAL"}
        </div>

      </div>


      {/* =================================================
          HEALTH SCORE
      ================================================= */}

      <div className="ai-health-summary">

        <div className="health-score">

          <div
            className="health-score-ring"
            style={{
              "--health":
                `${Math.max(
                  0,
                  Math.min(100, health)
                )}%`,
            }}
          >

            <div className="health-score-inner">

              <strong>
                {health}
                <small>%</small>
              </strong>

              <span>
                HEALTH
              </span>

            </div>

          </div>

        </div>


        <div className="health-details">

          <div className="ai-detail-row">

            <span>
              STATUS
            </span>

            <strong
              className={statusClass}
            >
              {assessment.status ||
                "NORMAL"}
            </strong>

          </div>


          <div className="ai-detail-row">

            <span>
              SEVERITY
            </span>

            <strong
              className={statusClass}
            >
              {assessment.severity ||
                "LOW"}
            </strong>

          </div>


          <div className="ai-detail-row">

            <span>
              ANOMALY
            </span>

            <strong
              className={
                anomalyDetected
                  ? "ai-warning"
                  : "ai-normal"
              }
            >
              {anomalyDetected
                ? "DETECTED"
                : "NONE"}
            </strong>

          </div>


          <div className="ai-detail-row">

            <span>
              AI CONFIDENCE
            </span>

            <strong>
              {Math.round(
                confidence * 100
              )}
              %
            </strong>

          </div>

        </div>

      </div>


      {/* =================================================
          CONFIDENCE BAR
      ================================================= */}

      <div className="confidence-section">

        <div className="confidence-header">

          <span>
            AI CONFIDENCE
          </span>

          <strong>
            {Math.round(
              confidence * 100
            )}
            %
          </strong>

        </div>

        <div className="confidence-track">

          <div
            className="confidence-fill"
            style={{
              width:
                `${Math.max(
                  0,
                  Math.min(
                    100,
                    confidence * 100
                  )
                )}%`,
            }}
          />

        </div>

      </div>


      {/* =================================================
          AFFECTED SUBSYSTEM
      ================================================= */}

      {assessment.affected_subsystems
        ?.length > 0 && (

        <div className="ai-section">

          <div className="ai-section-title">
            AFFECTED SUBSYSTEMS
          </div>

          <div className="ai-tags">

            {assessment.affected_subsystems.map(
              (subsystem, index) => (

                <span
                  className="ai-tag"
                  key={index}
                >
                  {subsystem}
                </span>

              )
            )}

          </div>

        </div>

      )}


      {/* =================================================
          ANOMALIES
      ================================================= */}

      {engineering?.anomalies
        ?.length > 0 && (

        <div className="ai-section">

          <div className="ai-section-title">
            DETECTED ANOMALIES
          </div>

          <div className="ai-list">

            {engineering.anomalies.map(
              (anomaly, index) => (

                <div
                  className="ai-list-item anomaly-item"
                  key={index}
                >

                  <span className="ai-list-marker">
                    !
                  </span>

                  <div>

                    <strong>
                      {anomaly.parameter}
                    </strong>

                    <p>
                      {anomaly.message}
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      )}


      {/* =================================================
          FAULT HYPOTHESES
      ================================================= */}

      {assessment.fault_hypotheses
        ?.length > 0 && (

        <div className="ai-section">

          <div className="ai-section-title">
            FAULT HYPOTHESES
          </div>

          <div className="ai-list">

            {assessment.fault_hypotheses.map(
              (fault, index) => (

                <div
                  className="ai-list-item"
                  key={index}
                >

                  <span className="ai-list-marker">
                    ◇
                  </span>

                  <p>
                    {fault}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      )}


      {/* =================================================
          ENGINEERING OBSERVATIONS
      ================================================= */}

      {assessment.observations
        ?.length > 0 && (

        <div className="ai-section">

          <div className="ai-section-title">
            ENGINEERING OBSERVATIONS
          </div>

          <div className="ai-list">

            {assessment.observations.map(
              (observation, index) => (

                <div
                  className="ai-list-item"
                  key={index}
                >

                  <span className="ai-list-marker">
                    •
                  </span>

                  <p>
                    {observation}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      )}


      {/* =================================================
          PHYSICS CONSISTENCY
      ================================================= */}

      {physics && (

        <div className="physics-status">

          <div>

            <span className="ai-section-title">
              PHYSICS CONSISTENCY
            </span>

            <strong>
              {physics.physics_status ||
                "UNKNOWN"}
            </strong>

          </div>

          <div className="physics-score">

            {physics.physics_score ??
              "--"}

            <small>
              /100
            </small>

          </div>

        </div>

      )}


      {/* =================================================
          RECOMMENDATION
      ================================================= */}

      {assessment.recommendation && (

        <div className="recommendation-box">

          <div className="recommendation-header">

            <span className="recommendation-icon">
              ⚙
            </span>

            <strong>
              MAINTENANCE RECOMMENDATION
            </strong>

          </div>

          <p>
            {assessment.recommendation}
          </p>

        </div>

      )}

    </section>
  );
}


export default AIHealthPanel;