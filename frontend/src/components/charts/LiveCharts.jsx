function createPath(
  data,
  key,
  width,
  height,
  padding = 6
) {
  if (!data || data.length === 0) {
    return "";
  }

  const values = data
    .map((item) => Number(item[key]))
    .filter((value) => Number.isFinite(value));

  if (values.length === 0) {
    return "";
  }

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const range =
    maxValue - minValue || 1;

  const chartHeight =
    height - padding * 2;

  return values
    .map((value, index) => {

      const x =
        (index /
          Math.max(values.length - 1, 1)) *
        width;

      const normalized =
        (value - minValue) /
        range;

      const y =
        height -
        padding -
        normalized * chartHeight;

      return `${
        index === 0 ? "M" : "L"
      } ${x} ${y}`;

    })
    .join(" ");
}


function createAreaPath(
  data,
  key,
  width,
  height,
  padding = 6
) {
  const linePath =
    createPath(
      data,
      key,
      width,
      height,
      padding
    );

  if (!linePath) {
    return "";
  }

  const firstX = 0;
  const lastX = width;

  return `${linePath}
    L ${lastX} ${height}
    L ${firstX} ${height}
    Z`;
}


function ChartCard({
  title,
  value,
  unit,
  data,
  dataKey,
  status,
}) {

  const width = 700;
  const height = 180;

  const linePath =
    createPath(
      data,
      dataKey,
      width,
      height
    );

  const areaPath =
    createAreaPath(
      data,
      dataKey,
      width,
      height
    );


  return (
    <div className="chart-card">

      {/* =================================================
          HEADER
          ================================================= */}

      <div className="chart-heading">

        <div>

          <span className="panel-kicker">
            REAL-TIME TREND
          </span>

          <h3>
            {title}
          </h3>

        </div>


        <div className="chart-current">

          <strong>
            {value}
          </strong>

          <span>
            {unit}
          </span>

        </div>

      </div>


      {/* =================================================
          STATUS
          ================================================= */}

      <div className="chart-status">

        <span className="chart-status-dot" />

        {status || "LIVE"}

      </div>


      {/* =================================================
          GRAPH
          ================================================= */}

      <div className="chart-wrapper">

        <svg
          className="line-chart"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >

          {/* horizontal grid */}

          <line
            className="chart-grid-line"
            x1="0"
            y1="25"
            x2={width}
            y2="25"
          />

          <line
            className="chart-grid-line"
            x1="0"
            y1="65"
            x2={width}
            y2="65"
          />

          <line
            className="chart-grid-line"
            x1="0"
            y1="105"
            x2={width}
            y2="105"
          />

          <line
            className="chart-grid-line"
            x1="0"
            y1="145"
            x2={width}
            y2="145"
          />


          {/* area */}

          {areaPath && (
            <path
              className="chart-area"
              d={areaPath}
            />
          )}


          {/* line */}

          {linePath && (
            <path
              className="chart-line"
              d={linePath}
            />
          )}

        </svg>

      </div>


      {/* =================================================
          TIME AXIS
          ================================================= */}

      <div className="chart-axis">

        <span>
          −30s
        </span>

        <span>
          −20s
        </span>

        <span>
          −10s
        </span>

        <span>
          NOW
        </span>

      </div>

    </div>
  );
}


function LiveCharts({
  data,
}) {

  const latest =
    data &&
    data.length > 0
      ? data[data.length - 1]
      : {
          rpm: 5000,
          temperature: 700,
        };


  return (
    <div className="charts-grid">

      <ChartCard
        title="ENGINE RPM"
        value={latest.rpm}
        unit="RPM"
        data={data}
        dataKey="rpm"
        status="LIVE TELEMETRY"
      />


      <ChartCard
        title="EXHAUST GAS TEMPERATURE"
        value={latest.temperature}
        unit="°C"
        data={data}
        dataKey="temperature"
        status="LIVE TELEMETRY"
      />

    </div>
  );
}


export default LiveCharts;