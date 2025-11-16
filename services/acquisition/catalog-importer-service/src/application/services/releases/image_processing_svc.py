
from monstrino_models.dto import ParsedRelease, Release


class ImageProcessingService:
    async def process_images(self, uow, parsed: ParsedRelease, release: Release) -> None:
        # Primary image
        if parsed.primary_image:
            await uow.repos.release_images.save_primary(
                release_id=release.id,
                url=parsed.primary_image,
            )

        # Other images
        for url in parsed.other_images or []:
            await uow.repos.release_images.save_secondary(
                release_id=release.id,
                url=url,
            )

        # Parsed images for downstream processing
        if parsed.primary_image:
            origin_id = await uow.repos.image_reference_origins.get_id_by_table_and_column(
                table="releases",
                column="primary_image",
            )
            if origin_id:
                await uow.repos.parsed_images.add_image(
                    link=parsed.primary_image,
                    origin_reference_id=origin_id,
                    origin_record_id=release.id,
                )
