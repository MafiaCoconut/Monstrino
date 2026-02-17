from dataclasses import dataclass

from monstrino_core.scheduler import SchedulerPort

from app.ports.parse.parse_market_port import ParseMarketPort


@dataclass
class Adapters:
    scheduler: SchedulerPort

    parser_mattel_shop: ParseMarketPort
