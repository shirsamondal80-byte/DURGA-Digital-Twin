from typing import Optional

from .schemas import TelemetryPayload


_latest_telemetry: Optional[TelemetryPayload] = None


def update_telemetry(
    telemetry: TelemetryPayload,
) -> TelemetryPayload:

    global _latest_telemetry

    _latest_telemetry = telemetry

    return _latest_telemetry


def get_latest_telemetry() -> Optional[TelemetryPayload]:

    return _latest_telemetry