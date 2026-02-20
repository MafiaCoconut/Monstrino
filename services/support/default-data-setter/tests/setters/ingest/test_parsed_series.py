from __future__ import annotations
from typing import Any, Callable, Iterable, Mapping, Optional

import pytest
from icecream import ic
from monstrino_core.interfaces import UnitOfWorkInterface

from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_core.shared.enums import ProcessingStates
from monstrino_models.dto import ParsedSeries
from monstrino_testing.fixtures import Repositories

from tests.setters.base.set_table_by_sql import seed_from_sql_file


@pytest.mark.asyncio
async def test_seed_sources(
    uow_factory_without_reset_db: UnitOfWorkFactoryInterface[Any, Repositories]
):
    result = await seed_from_sql_file(uow_factory_without_reset_db, sql_path="tests/data/parsed_series.sql")
    ic(result)
    await _process_parent_ids(uow_factory_without_reset_db)
    
    

async def _process_parent_ids(uow_factory):
    async with uow_factory.create() as uow:
        series_list = await uow.repos.parsed_series.get_all()
        for series in series_list:
            if series.parent_title and not series.parent_id:
                try:
                    parent_series = await uow.repos.parsed_series.get_one_by(**{ParsedSeries.TITLE: series.parent_title})
                    if parent_series:
                        series.parent_id = parent_series.id
                        print(f"Set parent_id for series {series.title} to ParentID={series.parent_id}")
                        await _set_parent_id(uow, series)
                except Exception as e:
                    print(f"Failed to set parent_id for series {series.title}: {e}")

async def _set_parent_id(uow: UnitOfWorkInterface[Any, Repositories], parsed_series: ParsedSeries):
    try:
        await uow.repos.parsed_series.update(filters={ParsedSeries.ID: parsed_series.id}, values={ParsedSeries.PARENT_ID: parsed_series.parent_id})
    except Exception as e:
        print(f"Failed to set parent_id for series {parsed_series.title}: {e}")
        print(f"Deleting parsed series {parsed_series.title} due to error")
        try:
            await uow.repos.parsed_series.update(filters={ParsedSeries.ID: parsed_series.id}, values={ParsedSeries.processing_state: ProcessingStates.WITH_ERRORS})
        except Exception as delete_error:
            print(f"Failed to delete parsed series {parsed_series.title}: {delete_error}")
