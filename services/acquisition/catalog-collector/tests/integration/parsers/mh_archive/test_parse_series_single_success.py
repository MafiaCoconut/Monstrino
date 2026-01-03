import pytest
from icecream import ic
import os

from monstrino_core.domain.value_objects import CharacterGender, SeriesTypes
from monstrino_core.shared.enums import ProcessingStates
from monstrino_models.dto import ParsedSeries
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from bootstrap.container_components.repositories import Repositories
from infrastructure.parsers import MHArchiveSeriesParser

domain_link = os.getenv("MHARCHIVE_URL")

def link_subseries():
    return domain_link+"/category/series/buried-secrets/"


async def test_parse_series_subseries(
        uow_factory: UnitOfWorkFactory[Repositories],
):
    parser = MHArchiveSeriesParser()

    result = await parser.parse_link(link_subseries())
    series_prime = result[0]

    assert series_prime.name == "Buried Secrets"
    assert series_prime.description == "Buried Secrets features dolls in a sarcophagus. You do not know what ghoul you will get until you unwrap the packaging."
    assert series_prime.series_type == SeriesTypes.PRIMARY
    assert series_prime.parent_name is None
    assert series_prime.link == link_subseries()
    assert series_prime.external_id == "buried-secrets"
    assert series_prime.processing_state == ProcessingStates.INIT

    assert len(result) == 5 # 1 primary + 4 secondary

    assert result[1].name == "Buried Secrets"
    assert result[1].description is None
    assert result[1].series_type == SeriesTypes.SECONDARY
    assert result[1].parent_name == "Buried Secrets"
    assert result[1].link == link_subseries()
    assert result[1].external_id == "buried-secrets"
    assert result[1].processing_state == ProcessingStates.INIT

    assert result[2].name == "Cozy Creepover"
    assert result[2].description is None
    assert result[2].series_type == SeriesTypes.SECONDARY
    assert result[2].parent_name == "Buried Secrets"
    assert result[2].link == link_subseries()
    assert result[2].external_id == "cozy-creepover"
    assert result[2].processing_state == ProcessingStates.INIT

    assert result[3].name == "Haunted Dance"
    assert result[3].description is None
    assert result[3].series_type == SeriesTypes.SECONDARY
    assert result[3].parent_name == "Buried Secrets"
    assert result[3].primary_image is None
    assert result[3].link == link_subseries()
    assert result[3].external_id == "haunted-dance"
    assert result[3].processing_state == ProcessingStates.INIT

    assert result[4].name == "Scaremester"
    assert result[4].description is None
    assert result[4].series_type == SeriesTypes.SECONDARY
    assert result[4].parent_name == "Buried Secrets"
    assert result[4].primary_image is None
    assert result[4].link == link_subseries()
    assert result[4].external_id == "scaremester"
    assert result[4].processing_state == ProcessingStates.INIT

