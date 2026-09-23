from typing import Optional


_latest_ai_result: Optional[dict] = None


def update_ai_result(result: dict) -> dict:

    global _latest_ai_result

    _latest_ai_result = result

    return _latest_ai_result


def get_latest_ai_result() -> Optional[dict]:

    return _latest_ai_result