import pytest
from datetime import datetime, timedelta, UTC
from monstrino_models.dto import RefreshToken
from monstrino_models.orm import RefreshTokensORM, UsersORM



@pytest.fixture
async def seed_auth_users_db(engine, session_factory, users_orms):
    """Асинхронное наполнение зависимой таблицы auth_users начальными данными."""
    async with session_factory() as session:
        session.add_all(users_orms)
        await session.commit()
    yield


# ========== Main Fixtures ==========

@pytest.fixture
def refresh_token() -> RefreshToken:
    return RefreshToken(
        user_id=1,
        token="token_abc123",
        ip_address="192.168.0.10",
        user_agent="Mozilla/5.0 (Windows NT 10.0)",
        device_name="Desktop-PC",
        location="Germany",
        is_active=True,
        expires_at=datetime.now() + timedelta(days=30),
    )


@pytest.fixture
def refresh_tokens() -> list[RefreshToken]:
    now = datetime.now(UTC)
    return [
        RefreshToken(
            user_id=1,
            token="token_abc123",
            ip_address="192.168.0.10",
            user_agent="Mozilla/5.0 (Windows NT 10.0)",
            device_name="Desktop-PC",
            location="Germany",
            is_active=True,
            expires_at=now + timedelta(days=30),
        ),
        RefreshToken(
            user_id=2,
            token="token_xyz456",
            ip_address="10.0.0.5",
            user_agent="Safari/16.3 (iPhone)",
            device_name="iPhone 15",
            location="France",
            is_active=False,
            revoked_at=now - timedelta(days=1),
            expires_at=now + timedelta(days=29),
        ),
    ]


@pytest.fixture
def refresh_tokens_orms() -> list[RefreshTokensORM]:
    now = datetime.now(UTC)
    return [
        RefreshTokensORM(
            user_id=1,
            token="token_abc123",
            ip_address="192.168.0.10",
            user_agent="Mozilla/5.0 (Windows NT 10.0)",
            device_name="Desktop-PC",
            location="Germany",
            is_active=True,
            expires_at=now + timedelta(days=30),
        ),
        RefreshTokensORM(
            user_id=2,
            token="token_xyz456",
            ip_address="10.0.0.5",
            user_agent="Safari/16.3 (iPhone)",
            device_name="iPhone 15",
            location="France",
            is_active=False,
            revoked_at=now - timedelta(days=1),
            expires_at=now + timedelta(days=29),
        ),
    ]


@pytest.fixture
async def seed_refresh_tokens_db(
    engine,
    session_factory,
    refresh_tokens_orms,
    seed_auth_users_db,
):
    """Асинхронное наполнение таблицы auth_refresh_tokens начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(refresh_tokens_orms)
        await session.commit()
    yield
