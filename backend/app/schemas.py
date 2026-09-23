from pydantic import BaseModel


class EngineTelemetry(BaseModel):
    rpm: float
    cht_c: float
    egt_c: float
    oil_temperature_c: float
    oil_pressure_bar: float
    fuel_flow_kg_h: float
    vibration_mm_s: float
    battery_voltage_v: float
    alternator_voltage_v: float
    injection_timing_deg_ca: float


class EnvironmentTelemetry(BaseModel):
    altitude_m: float
    ambient_temperature_c: float
    ambient_pressure_kpa: float


class MissionTelemetry(BaseModel):
    phase: str


class TelemetryPayload(BaseModel):
    timestamp: str
    engine: EngineTelemetry
    environment: EnvironmentTelemetry
    mission: MissionTelemetry