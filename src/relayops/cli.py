import json
from dataclasses import asdict

from .core import *


def main():
    print(
        json.dumps(
            asdict(triage(Request("SYN-1042", "Water main flooding the west lane", "Zone 4"))),
            indent=2,
            default=str,
        )
    )
