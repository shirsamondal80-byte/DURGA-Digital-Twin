import { useEffect, useState } from "react";

import {
  getLatestTelemetry,
  getLatestAIAnalysis,
} from "../services/telemetryApi";


const DEFAULT_TELEMETRY = {
  rpm: 5000,
  cht: 180,
  egt: 700,
  oilPressure: 3.5,
  oilTemperature: 95,
  fuelFlow: 18,
  vibration: 2.1,
  batteryVoltage: 27.8,
  alternatorVoltage: 28.2,
  injectionTiming: 25,

  altitude: 5000,
  ambientTemperature: 15,
  ambientPressure: 54,

  missionPhase: "CRUISE",
};


function mapBackendTelemetry(payload) {
  if (
    payload?.status !== "available" ||
    !payload?.telemetry
  ) {
    return null;
  }

  const data = payload.telemetry;

  // Make sure the expected nested telemetry structure exists
  if (
    !data?.engine ||
    !data?.environment ||
    !data?.mission
  ) {
    console.warn(
      "Telemetry received, but the payload structure is incomplete:",
      data
    );

    return null;
  }

  return {
    rpm: Number(data.engine.rpm),
    cht: Number(data.engine.cht_c),
    egt: Number(data.engine.egt_c),

    oilPressure: Number(
      data.engine.oil_pressure_bar
    ),

    oilTemperature: Number(
      data.engine.oil_temperature_c
    ),

    fuelFlow: Number(
      data.engine.fuel_flow_kg_h
    ),

    vibration: Number(
      data.engine.vibration_mm_s
    ),

    batteryVoltage: Number(
      data.engine.battery_voltage_v
    ),

    alternatorVoltage: Number(
      data.engine.alternator_voltage_v
    ),

    injectionTiming: Number(
      data.engine.injection_timing_deg_ca
    ),

    altitude: Number(
      data.environment.altitude_m
    ),

    ambientTemperature: Number(
      data.environment.ambient_temperature_c
    ),

    ambientPressure: Number(
      data.environment.ambient_pressure_kpa
    ),

    missionPhase:
      data.mission.phase,

    timestamp:
      data.timestamp,
  };
}


export default function useTelemetry() {
  const [telemetry, setTelemetry] =
    useState(DEFAULT_TELEMETRY);

  const [aiAnalysis, setAiAnalysis] =
    useState(null);

  const [connected, setConnected] =
    useState(false);

  const [lastUpdated, setLastUpdated] =
    useState(null);


  useEffect(() => {
    let mounted = true;


    async function fetchTelemetry() {
      try {
        const result =
          await getLatestTelemetry();

        if (!mounted) return;

        const mapped =
          mapBackendTelemetry(result);

        if (mapped) {
          setTelemetry(mapped);
          setConnected(true);
          setLastUpdated(mapped.timestamp);
        }

        /*
         * IMPORTANT:
         * Do not immediately mark the connection as
         * disconnected if a single response is invalid.
         *
         * The last valid telemetry remains displayed.
         */
      } catch (error) {
        if (!mounted) return;

        console.error(
          "Telemetry connection error:",
          error
        );

        /*
         * Keep the last valid telemetry on screen.
         * A temporary failed request should not make
         * the dashboard jump to WAITING.
         */
      }
    }


    async function fetchAI() {
      try {
        const result =
          await getLatestAIAnalysis();

        if (!mounted) return;

        if (
          result?.status === "available" &&
          result?.ai_analysis
        ) {
          setAiAnalysis(
            result.ai_analysis
          );
        }
      } catch (error) {
        if (!mounted) return;

        console.error(
          "AI analysis connection error:",
          error
        );
      }
    }


    fetchTelemetry();
    fetchAI();


    const telemetryTimer =
      setInterval(
        fetchTelemetry,
        1000
      );

    const aiTimer =
      setInterval(
        fetchAI,
        1000
      );


    return () => {
      mounted = false;

      clearInterval(
        telemetryTimer
      );

      clearInterval(
        aiTimer
      );
    };
  }, []);


  return {
    telemetry,
    connected,
    aiAnalysis,
    lastUpdated,
  };
}