# from typing import Callable, Optional
#
# from monstrino_core import UnitOfWorkInterface
# from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession
#
# from src.app.dependencies.container_components.repositories import Repositories
# from fixtures.db.repositories_fixture import build_repositories
#
#
# class SqlAlchemyUnitOfWork(UnitOfWorkInterface):
#     def __init__(self,
#                  session_factory: async_sessionmaker[AsyncSession],
#                  repo_factory: Callable[[AsyncSession], Repositories] = build_repositories,
#                  ):
#         self._session_factory = session_factory
#         self._repo_factory = repo_factory
#         self.session: Optional[AsyncSession] = None
#
#     async def __aenter__(self):
#         self.session = self._session_factory()
#         self.repos = self._repo_factory(self.session)
#         return self
#
#     async def __aexit__(self, exc_type, exc, tb):
#         if exc_type:
#             await self.rollback()
#         else:
#             await self.commit()
#             pass
#
#     async def commit(self):
#         # if self.session:
#         await self.session.commit()
#
#     async def rollback(self):
#         # if self.session:
#         await self.session.rollback()
