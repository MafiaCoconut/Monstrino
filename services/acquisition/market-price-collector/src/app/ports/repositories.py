from dataclasses import dataclass

from monstrino_repositories.repositories_interfaces import *

@dataclass
class Repositories:
    geo_country: GeoCountryRepoInterface
    money_currency: MoneyCurrencyRepoInterface

    market_source: MarketSourceRepoInterface
    market_source_country: MarketSourceCountryRepoInterface
    release_market_link: ReleaseMarketLinkRepoInterface

    market_product_price_observation: MarketProductPriceObservationRepoInterface

    release_msrp: ReleaseMsrpRepoInterface
    release_msrp_source: ReleaseMsrpSourceRepoInterface


