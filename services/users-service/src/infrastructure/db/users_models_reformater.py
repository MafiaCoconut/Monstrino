from domain.user import User, UserRegistration, UserBaseInfo
from infrastructure.db.models.user_orm import UserORM
from datetime import datetime, timezone


class UsersModelsReformater:
    @staticmethod
    async def refactor_orm_to_pydantic(user_orm: UserORM):
        return User(
            id          =user_orm.id,
            username    =user_orm.username,
            first_name  =user_orm.first_name,
            last_name   =user_orm.last_name,
            updated_at  =user_orm.updated_at,
            created_at  =user_orm.created_at,
        )

    @staticmethod
    async def refactor_pydantic_to_orm(user: User):
        return UserORM(
            id=user.id,
            username=user.username,
            first_name=user.firstName,
            last_name=user.lastName,
            updated_at=user.updated_at.astimezone(timezone.utc).replace(tzinfo=None) if user.updatedAt else None,
            created_at=user.created_at.astimezone(timezone.utc).replace(tzinfo=None) if user.updatedAt else None,
        )

    @staticmethod
    async def refactor_new_user_pydantic_to_orm(new_user: UserRegistration):
        return UserORM(
            username=new_user.username,
            email=new_user.email,
            password=new_user.password,
        )

    @staticmethod
    async def refactor_orm_to_base_user_info(user_orm: UserORM):
        return UserBaseInfo(
            id=user_orm.id,
            username=user_orm.username,
            email=user_orm.email,
            first_name=user_orm.first_name,
            last_name=user_orm.last_name,
            updated_at=user_orm.updated_at.isoformat(),
            created_at=user_orm.created_at.isoformat(),
        )

# async def _handle_created_updated_orm_to_pydantic(user):
#     if user.created_at:
#         user.created_at = user.created_at.isoformat()
#     if user.updated_at:
#         user.updated_at = user.updated_at.isoformat()



users_models_reformater = UsersModelsReformater()