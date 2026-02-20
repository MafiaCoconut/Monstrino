from typing import Any

import pytest
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

from monstrino_models.dto import *
from monstrino_testing.fixtures import Repositories


def get_items():
    return [
        # Europe
        MoneyCurrency(code="EUR", symbol="€", display_code="EUR", minor_unit=2),
        MoneyCurrency(code="USD", symbol="$", display_code="USD", minor_unit=2),
        MoneyCurrency(code="GBP", symbol="£", display_code="GBP", minor_unit=2),
        MoneyCurrency(code="CHF", symbol="CHF", display_code="CHF", minor_unit=2),
        MoneyCurrency(code="NOK", symbol="kr", display_code="NOK", minor_unit=2),
        MoneyCurrency(code="SEK", symbol="kr", display_code="SEK", minor_unit=2),
        MoneyCurrency(code="DKK", symbol="kr", display_code="DKK", minor_unit=2),
        MoneyCurrency(code="PLN", symbol="zł", display_code="PLN", minor_unit=2),
        MoneyCurrency(code="CZK", symbol="Kč", display_code="CZK", minor_unit=2),
        MoneyCurrency(code="HUF", symbol="Ft", display_code="HUF", minor_unit=2),
        MoneyCurrency(code="RON", symbol="lei", display_code="RON", minor_unit=2),
        MoneyCurrency(code="BGN", symbol="лв", display_code="BGN", minor_unit=2),
        MoneyCurrency(code="ISK", symbol="kr", display_code="ISK", minor_unit=0),
        MoneyCurrency(code="UAH", symbol="₴", display_code="UAH", minor_unit=2),
        MoneyCurrency(code="RUB", symbol="₽", display_code="RUB", minor_unit=2),

        # Americas
        MoneyCurrency(code="CAD", symbol="$", display_code="CAD", minor_unit=2),
        MoneyCurrency(code="MXN", symbol="$", display_code="MXN", minor_unit=2),
        MoneyCurrency(code="BRL", symbol="R$", display_code="BRL", minor_unit=2),
        MoneyCurrency(code="ARS", symbol="$", display_code="ARS", minor_unit=2),
        MoneyCurrency(code="CLP", symbol="$", display_code="CLP", minor_unit=0),
        MoneyCurrency(code="COP", symbol="$", display_code="COP", minor_unit=2),
        MoneyCurrency(code="PEN", symbol="S/", display_code="PEN", minor_unit=2),

        # Asia
        MoneyCurrency(code="JPY", symbol="¥", display_code="JPY", minor_unit=0),
        MoneyCurrency(code="KRW", symbol="₩", display_code="KRW", minor_unit=0),
        MoneyCurrency(code="CNY", symbol="¥", display_code="CNY", minor_unit=2),
        MoneyCurrency(code="HKD", symbol="$", display_code="HKD", minor_unit=2),
        MoneyCurrency(code="SGD", symbol="$", display_code="SGD", minor_unit=2),
        MoneyCurrency(code="TWD", symbol="$", display_code="TWD", minor_unit=2),
        MoneyCurrency(code="THB", symbol="฿", display_code="THB", minor_unit=2),
        MoneyCurrency(code="MYR", symbol="RM", display_code="MYR", minor_unit=2),
        MoneyCurrency(code="IDR", symbol="Rp", display_code="IDR", minor_unit=2),
        MoneyCurrency(code="VND", symbol="₫", display_code="VND", minor_unit=0),
        MoneyCurrency(code="PHP", symbol="₱", display_code="PHP", minor_unit=2),
        MoneyCurrency(code="INR", symbol="₹", display_code="INR", minor_unit=2),
        MoneyCurrency(code="KZT", symbol="₸", display_code="KZT", minor_unit=2),

        # Middle East
        MoneyCurrency(code="AED", symbol="د.إ", display_code="AED", minor_unit=2),
        MoneyCurrency(code="SAR", symbol="﷼", display_code="SAR", minor_unit=2),
        MoneyCurrency(code="ILS", symbol="₪", display_code="ILS", minor_unit=2),
        MoneyCurrency(code="TRY", symbol="₺", display_code="TRY", minor_unit=2),
        MoneyCurrency(code="QAR", symbol="﷼", display_code="QAR", minor_unit=2),
        MoneyCurrency(code="KWD", symbol="د.ك", display_code="KWD", minor_unit=3),

        # Africa
        MoneyCurrency(code="ZAR", symbol="R", display_code="ZAR", minor_unit=2),
        MoneyCurrency(code="EGP", symbol="£", display_code="EGP", minor_unit=2),
        MoneyCurrency(code="MAD", symbol="د.م.", display_code="MAD", minor_unit=2),
        MoneyCurrency(code="NGN", symbol="₦", display_code="NGN", minor_unit=2),
        MoneyCurrency(code="KES", symbol="KSh", display_code="KES", minor_unit=2),

        # Oceania
        MoneyCurrency(code="AUD", symbol="$", display_code="AUD", minor_unit=2),
        MoneyCurrency(code="NZD", symbol="$", display_code="NZD", minor_unit=2),
    ]


async def test_seed_money_currencies(
        uow_factory_without_reset_db: UnitOfWorkFactoryInterface[Any, Repositories]
):
    async with uow_factory_without_reset_db.create() as uow:
        await uow.repos.money_currency.save_many(get_items())

        all_items = await uow.repos.money_currency.get_all()
        assert len(all_items) == len(get_items())