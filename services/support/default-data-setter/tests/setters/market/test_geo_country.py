from typing import Any

import pytest
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

from monstrino_models.dto import *
from monstrino_testing.fixtures import Repositories
GeoCountry

def get_items():
    return [
        # Europe
        GeoCountry(code="DE", title="Germany", display_code="DE"),
        GeoCountry(code="FR", title="France", display_code="FR"),
        GeoCountry(code="IT", title="Italy", display_code="IT"),
        GeoCountry(code="ES", title="Spain", display_code="ES"),
        GeoCountry(code="NL", title="Netherlands", display_code="NL"),
        GeoCountry(code="BE", title="Belgium", display_code="BE"),
        GeoCountry(code="AT", title="Austria", display_code="AT"),
        GeoCountry(code="IE", title="Ireland", display_code="IE"),
        GeoCountry(code="PT", title="Portugal", display_code="PT"),
        GeoCountry(code="FI", title="Finland", display_code="FI"),
        GeoCountry(code="GR", title="Greece", display_code="GR"),
        GeoCountry(code="PL", title="Poland", display_code="PL"),
        GeoCountry(code="CZ", title="Czechia", display_code="CZ"),
        GeoCountry(code="SK", title="Slovakia", display_code="SK"),
        GeoCountry(code="HU", title="Hungary", display_code="HU"),
        GeoCountry(code="RO", title="Romania", display_code="RO"),
        GeoCountry(code="BG", title="Bulgaria", display_code="BG"),
        GeoCountry(code="SE", title="Sweden", display_code="SE"),
        GeoCountry(code="NO", title="Norway", display_code="NO"),
        GeoCountry(code="DK", title="Denmark", display_code="DK"),
        GeoCountry(code="CH", title="Switzerland", display_code="CH"),
        GeoCountry(code="IS", title="Iceland", display_code="IS"),
        GeoCountry(code="UA", title="Ukraine", display_code="UA"),
        GeoCountry(code="RU", title="Russia", display_code="RU"),

        # North America
        GeoCountry(code="US", title="United States", display_code="US"),
        GeoCountry(code="CA", title="Canada", display_code="CA"),
        GeoCountry(code="MX", title="Mexico", display_code="MX"),

        # South America
        GeoCountry(code="BR", title="Brazil", display_code="BR"),
        GeoCountry(code="AR", title="Argentina", display_code="AR"),
        GeoCountry(code="CL", title="Chile", display_code="CL"),
        GeoCountry(code="CO", title="Colombia", display_code="CO"),
        GeoCountry(code="PE", title="Peru", display_code="PE"),

        # Asia
        GeoCountry(code="JP", title="Japan", display_code="JP"),
        GeoCountry(code="KR", title="South Korea", display_code="KR"),
        GeoCountry(code="CN", title="China", display_code="CN"),
        GeoCountry(code="HK", title="Hong Kong", display_code="HK"),
        GeoCountry(code="SG", title="Singapore", display_code="SG"),
        GeoCountry(code="TW", title="Taiwan", display_code="TW"),
        GeoCountry(code="TH", title="Thailand", display_code="TH"),
        GeoCountry(code="MY", title="Malaysia", display_code="MY"),
        GeoCountry(code="ID", title="Indonesia", display_code="ID"),
        GeoCountry(code="VN", title="Vietnam", display_code="VN"),
        GeoCountry(code="PH", title="Philippines", display_code="PH"),
        GeoCountry(code="IN", title="India", display_code="IN"),
        GeoCountry(code="KZ", title="Kazakhstan", display_code="KZ"),

        # Middle East
        GeoCountry(code="AE", title="United Arab Emirates", display_code="UAE"),
        GeoCountry(code="SA", title="Saudi Arabia", display_code="SA"),
        GeoCountry(code="IL", title="Israel", display_code="IL"),
        GeoCountry(code="TR", title="Turkey", display_code="TR"),
        GeoCountry(code="QA", title="Qatar", display_code="QA"),
        GeoCountry(code="KW", title="Kuwait", display_code="KW"),

        # Africa
        GeoCountry(code="ZA", title="South Africa", display_code="ZA"),
        GeoCountry(code="EG", title="Egypt", display_code="EG"),
        GeoCountry(code="MA", title="Morocco", display_code="MA"),
        GeoCountry(code="NG", title="Nigeria", display_code="NG"),
        GeoCountry(code="KE", title="Kenya", display_code="KE"),

        # Oceania
        GeoCountry(code="AU", title="Australia", display_code="AU"),
        GeoCountry(code="NZ", title="New Zealand", display_code="NZ"),
    ]

async def test_seed_geo_countries(
        uow_factory_without_reset_db: UnitOfWorkFactoryInterface[Any, Repositories]
):
    async with uow_factory_without_reset_db.create() as uow:
        await uow.repos.geo_country.save_many(get_items())

        all_vendors = await uow.repos.geo_country.get_all()
        assert len(all_vendors) == len(get_items())