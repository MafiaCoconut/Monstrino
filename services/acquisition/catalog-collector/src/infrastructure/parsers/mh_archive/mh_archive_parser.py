import logging
import asyncio


logger = logging.getLogger(__name__)

class MHArchiveParser:
    def __init__(self, sleep_between_requests: int = 3):
        self.sleep_between_requests = sleep_between_requests


    async def _sleep(self):
        logger.info(f"Waiting sleep time: {self.sleep_between_requests} seconds")
        await asyncio.sleep(self.sleep_between_requests)

    async def _iterate_parse(self, link_list, total: int, batch_size: int, return_exceptions: bool = False):
        total = min(total, len(link_list))
        for i in range(0, total, batch_size):
            end = min(i + batch_size, total)

            logger.info(f"Parsing batch: {i}-{end}")
            batch = link_list[i:end]

            tasks = [self._parse_info(p) for p in batch]
            batch_results = await asyncio.gather(*tasks, return_exceptions=True)
            if return_exceptions:
                ok = []
                for link, r in zip(batch, batch_results, strict=False):
                    if isinstance(r, Exception):
                        logger.exception("Failed parsing %s", link, exc_info=r)
                        continue
                    ok.append(r)
                yield ok
            else:
                yield batch_results

            if end < total:
                await self._sleep()

    async def _parse_info(self, obj):
        ...