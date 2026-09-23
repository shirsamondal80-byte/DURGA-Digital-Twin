function getSeverity(name, value) {
  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return "normal";
  }

  switch (name) {
    case "RPM":
      if (numericValue < 4000 || numericValue > 6500) {
        return "critical";
      }

      if (
        (numericValue >= 4000 && numericValue < 4500) ||
        (numericValue > 5500 && numericValue <= 6500)
      ) {
        return "warning";
      }

      return "normal";


    case "CHT":
      if (numericValue > 220) {
        return "critical";
      }

      if (numericValue > 200) {
        return "warning";
      }

      return "normal";


    case "EGT":
      if (numericValue > 800) {
        return "critical";
      }

      if (numericValue > 750) {
        return "warning";
      }

      return "normal";


    case "OIL PRESSURE":
      if (
        numericValue < 2.0 ||
        numericValue > 5.0
      ) {
        return "critical";
      }

      if (
        numericValue < 2.5 ||
        numericValue > 4.5
      ) {
        return "warning";
      }

      return "normal";


    case "OIL TEMP":
      if (numericValue > 120) {
        return "critical";
      }

      if (numericValue > 110) {
        return "warning";
      }

      return "normal";


    case "FUEL FLOW":
      if (
        numericValue < 10 ||
        numericValue > 26
      ) {
        return "critical";
      }

      if (
        numericValue < 14 ||
        numericValue > 22
      ) {
        return "warning";
      }

      return "normal";


    case "VIBRATION":
      if (numericValue > 6) {
        return "critical";
      }

      if (numericValue >= 4) {
        return "warning";
      }

      return "normal";


    case "BATTERY":
      if (
        numericValue < 24 ||
        numericValue > 31
      ) {
        return "critical";
      }

      if (
        numericValue < 26 ||
        numericValue > 30
      ) {
        return "warning";
      }

      return "normal";


    case "ALTERNATOR":
      if (
        numericValue < 26 ||
        numericValue > 31
      ) {
        return "critical";
      }

      if (
        numericValue < 27 ||
        numericValue > 30
      ) {
        return "warning";
      }

      return "normal";


    case "INJECTION":
      if (
        numericValue < 15 ||
        numericValue > 35
      ) {
        return "critical";
      }

      if (
        numericValue < 20 ||
        numericValue > 30
      ) {
        return "warning";
      }

      return "normal";


    default:
      return "normal";
  }
}


function TelemetryPanel({ telemetry }) {

  const parameters = [
    {
      name: "RPM",
      value: telemetry?.rpm,
      unit: "rev/min",
      normal: "NORMAL 4500–5500",
    },

    {
      name: "CHT",
      value: telemetry?.cht,
      unit: "°C",
      normal: "NORMAL < 200",
    },

    {
      name: "EGT",
      value: telemetry?.egt,
      unit: "°C",
      normal: "NORMAL < 750",
    },

    {
      name: "OIL PRESSURE",
      value: telemetry?.oilPressure,
      unit: "bar",
      normal: "NORMAL 2.5–4.5",
    },

    {
      name: "OIL TEMP",
      value: telemetry?.oilTemperature,
      unit: "°C",
      normal: "NORMAL 80–110",
    },

    {
      name: "FUEL FLOW",
      value: telemetry?.fuelFlow,
      unit: "kg/h",
      normal: "NORMAL 14–22",
    },

    {
      name: "VIBRATION",
      value: telemetry?.vibration,
      unit: "mm/s",
      normal: "NORMAL < 4",
    },

    {
      name: "BATTERY",
      value: telemetry?.batteryVoltage,
      unit: "V",
      normal: "NORMAL 24–30",
    },

    {
      name: "ALTERNATOR",
      value: telemetry?.alternatorVoltage,
      unit: "V",
      normal: "NORMAL 26–30",
    },

    {
      name: "INJECTION",
      value: telemetry?.injectionTiming,
      unit: "°CA",
      normal: "NORMAL 20–30",
    },
  ];


  return (
    <section className="telemetry-panel glass-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-kicker">
            LIVE DATA
          </span>

          <h2>
            ENGINE TELEMETRY
          </h2>
        </div>


        <div className="live-indicator">
          <span />
          LIVE
        </div>

      </div>


      <div className="telemetry-list">

        {parameters.map((parameter) => {

          const severity =
            getSeverity(
              parameter.name,
              parameter.value
            );


          return (
            <div
              className={`telemetry-row severity-${severity}`}
              key={parameter.name}
            >

              <div className="telemetry-name">

                <span className="telemetry-line" />

                <div>

                  <strong>
                    {parameter.name}
                  </strong>

                  <small>
                    {parameter.normal}
                  </small>

                </div>

              </div>


              <div className="telemetry-value">

                <strong>
                  {parameter.value}
                </strong>

                <span>
                  {parameter.unit}
                </span>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}


export default TelemetryPanel;