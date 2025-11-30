# import logging
# import pytest
# from monstrino_models.dto import ProductLineContentTypeLink
#
# from integration.common import BaseCrudRepoTest
#
# logger = logging.getLogger(__name__)
#
# @pytest.mark.usefixtures("seed_product_line_list", "seed_release_type_list")
# class TestProductLineContentTypeLinkRepo(BaseCrudRepoTest):
#     entity_cls = ProductLineContentTypeLink
#     repo_attr = "product_line_content_type_link"
#
#     sample_create_data = {
#         "product_line_id": 1,
#         "release_type_id": 2,
#     }
#
#     unique_field = ProductLineContentTypeLink.ID
#     unique_field_value = 1
#
#     update_field = "release_type_id"
#     updated_value = 3
