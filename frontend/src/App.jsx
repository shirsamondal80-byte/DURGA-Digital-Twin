import { useEffect, useState } from "react";

import Header from "./components/layout/Header";
import TelemetryPanel from "./components/telemetry/TelemetryPanel";
import AIHealthPanel from "./components/ai/AIHealthPanel";
import LiveCharts from "./components/charts/LiveCharts";
import UnityContainer from "./components/unity/UnityContainer";

import IntroAnimation from "./components/intro/IntroAnimation";

import useTelemetry from "./hooks/useTelemetry";

import "./App.css";


const initialChartData = [];


function App() {
  const {
    telemetry,
    connected,
    aiAnalysis,
  } = useTelemetry();


  const [chartData, setChartData] =
    useState(initialChartData);


  const [introFinished, setIntroFinished] =
    useState(false);


  const connectionStatus =
    connected ? "ONLINE" : "WAITING";


  const simulationStatus =
    telemetry?.missionPhase || "STANDBY";


  useEffect(() => {
    if (!telemetry) return;


    const now = new Date();

    const time = now.toLocaleTimeString([], {
      minute: "2-digit",
      second: "2-digit",
    });


    setChartData((previous) => {
      const next = [
        ...previous,
        {
          time,
          rpm: Number(telemetry.rpm),
          temperature: Number(telemetry.egt),
        },
      ];


      return next.slice(-30);
    });
  }, [
    telemetry?.rpm,
    telemetry?.egt,
    telemetry?.timestamp,
  ]);


  return (
    <div className="app-shell">

      {!introFinished && (
        <IntroAnimation
          onComplete={() => setIntroFinished(true)}
        />
      )}


      <div className="background-overlay" />


      <div className="dashboard">

        <Header
          connectionStatus={connectionStatus}
          simulationStatus={simulationStatus}
        />


        <main className="dashboard-main">

          <section className="top-grid">

            <TelemetryPanel
              telemetry={telemetry}
            />


            <UnityContainer
              simulationStatus={simulationStatus}
            />


            <AIHealthPanel
              aiAnalysis={aiAnalysis}
            />

          </section>


          <section className="charts-section">

            <LiveCharts
              data={chartData}
            />

          </section>

        </main>


        <footer className="dashboard-footer">

          <span>
            PROJECT DURGA
          </span>

          <span>
            MALE UAV DIGITAL TWIN FRAMEWORK
          </span>

          <span>
            LIVE TELEMETRY DISPLAY
          </span>

        </footer>

      </div>

    </div>
  );
}


export default App;