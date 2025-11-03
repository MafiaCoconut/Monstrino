from application.repositories.releases import ReleaseCharactersRepo


class ReleaseCharactersRepoImpl(ReleaseCharactersRepo):
    async def attach_to_release(self, release_id: int, release_character):
        pass
