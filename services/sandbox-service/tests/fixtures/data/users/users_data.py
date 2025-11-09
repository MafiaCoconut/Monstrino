import pytest
from datetime import datetime, timedelta
from monstrino_models.dto import User
from monstrino_models.orm import UsersORM


@pytest.fixture
def user() -> User:
    return User(
        username="draculaura",
        first_name="Draculaura",
        last_name="Vamp",
        email="draculaura@monsterhigh.com",
        password_hash="hashed_password_123",
        is_verified=True,
        last_login_at=datetime.utcnow() - timedelta(days=1),
        status="active",
        role="user",
    )


@pytest.fixture
def users() -> list[User]:
    return [
        User(
            username="draculaura",
            first_name="Draculaura",
            last_name="Vamp",
            email="draculaura@monsterhigh.com",
            password_hash="hashed_password_123",
            is_verified=True,
            last_login_at=datetime.utcnow(),
            status="active",
            role="user",
        ),
        User(
            username="frankie",
            first_name="Frankie",
            last_name="Stein",
            email="frankie@monsterhigh.com",
            password_hash="hashed_password_456",
            is_verified=False,
            status="pending",
            role="moderator",
        ),
        User(
            username="clawdeen",
            first_name="Clawdeen",
            last_name="Wolf",
            email="clawdeen@monsterhigh.com",
            password_hash="hashed_password_789",
            is_verified=True,
            status="banned",
            role="admin",
        ),
    ]


@pytest.fixture
def users_orms() -> list[UsersORM]:
    return [
        UsersORM(
            username="draculaura",
            first_name="Draculaura",
            last_name="Vamp",
            email="draculaura@monsterhigh.com",
            password_hash="hashed_password_123",
            is_verified=True,
            last_login_at=datetime.utcnow(),
            status="active",
            role="user",
        ),
        UsersORM(
            username="frankie",
            first_name="Frankie",
            last_name="Stein",
            email="frankie@monsterhigh.com",
            password_hash="hashed_password_456",
            is_verified=False,
            status="pending",
            role="moderator",
        ),
        UsersORM(
            username="clawdeen",
            first_name="Clawdeen",
            last_name="Wolf",
            email="clawdeen@monsterhigh.com",
            password_hash="hashed_password_789",
            is_verified=True,
            status="banned",
            role="admin",
        ),
    ]


@pytest.fixture
async def seed_users_db(engine, session_factory, users_orms):
    """Асинхронное наполнение таблицы users начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(users_orms)
        await session.commit()
    yield
