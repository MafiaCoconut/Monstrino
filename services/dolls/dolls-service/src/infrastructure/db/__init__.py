# class PetsORM(Base):
#     __tablename__ = "pets"
#     id:                     Mapped[int] = mapped_column(INTEGER, primary_key=True)
#     name:                   Mapped[str] = mapped_column(String(120),  nullable=False, unique=True)
#     display_name:           Mapped[str] = mapped_column(String(120),  nullable=False)
#     description:  Mapped[Optional[str]] = mapped_column(TEXT)
#     owner_id:     Mapped[Optional[int]] = mapped_column(ForeignKey("characters.id"))
#
#     updated_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
#     created_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
#
#     owner = relationship(
#         "CharactersOrm",
#         back_populates='pet'
#     )
# class CharacterGendersORM(Base):
#     __tablename__ = "character_gender"
#
#     id:    Mapped[int] = mapped_column(INTEGER, primary_key=True)
#     name:  Mapped[str] = mapped_column(String(60),  nullable=False, unique=True)
#
#     updated_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
#     created_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
#
#     characters: Mapped[List["CharactersORM"]] = relationship(
#         "CharactersORM",
#         back_populates="gender"
#     )
# class ReleaseTypesORM(Base):
#     __tablename__ = "release_type"
#
#     id:           Mapped[int] = mapped_column(INTEGER,    primary_key=True)
#     name:         Mapped[str] = mapped_column(String(80), nullable=False, unique=True)
#     display_name: Mapped[str] = mapped_column(TEXT,       nullable=False, unique=True)
#
#     updated_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
#     created_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
#
#     release: Mapped[List["ReleasesORM"]] = relationship(
#         back_populates="type",
#         cascade="save-update, merge"
#     )
# class ReleaseExclusivesORM(Base):
#     __tablename__ = "exclusive_vendor"
#
#     id:                       Mapped[int] = mapped_column(INTEGER,       primary_key=True)
#     name:                     Mapped[str] = mapped_column(String(120),   nullable=False, unique=True)
#     display_name:             Mapped[str] = mapped_column(String(120),   nullable=False, unique=True)
#     description:    Mapped[Optional[str]] = mapped_column(TEXT)
#     image:          Mapped[Optional[str]] = mapped_column(TEXT)
# class ReleaseSeriesORM(Base):
#     __tablename__ = "release_series"
#
#     id:                       Mapped[int] = mapped_column(INTEGER,       primary_key=True)
#     name:                     Mapped[str] = mapped_column(String(120),   nullable=False, unique=True)
#     display_name:             Mapped[str] = mapped_column(String(120),   nullable=False, unique=True)
#     description:    Mapped[Optional[str]] = mapped_column(String)
#
#     updated_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
#     created_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
#
#     release: Mapped[List["ReleasesORM"]] = relationship(
#         back_populates="series",
#         cascade="all, delete-orphan"
#     )
# class ReleasesORM(Base):
#     __tablename__ = "release"
#     __table_args__ = (
#         # Индексы для ускоренного поиска
#         Index("ix_release_type", "type_id"),
#         Index("ix_release_series", "series_id"),
#         Index("ix_release_year", "year"),
#     )
#
#     id:              Mapped[int]             = mapped_column(INTEGER, primary_key=True)
#     type_id:         Mapped[int]             = mapped_column(ForeignKey("release_type.id"), nullable=False)
#     name:            Mapped[str]             = mapped_column(String(200), nullable=False)
#     mpn:             Mapped[Optional[str]]   = mapped_column(String(64))
#     series_id:       Mapped[Optional[int]]   = mapped_column(ForeignKey("release_series.id"))
#     year:            Mapped[Optional[int]]   = mapped_column(INTEGER)
#     description:     Mapped[Optional[str]]   = mapped_column(TEXT)
#     link:            Mapped[Optional[str]]   = mapped_column(TEXT)
#     exclusive_of_id: Mapped[Optional[int]]   = mapped_column(ForeignKey("exclusive_vendor.id"))
#
#     updated_at:    Mapped[Optional[datetime]] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
#     created_at:    Mapped[Optional[datetime]] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
# class ReleaseRelationsORM(Base):
#     __tablename__ = "release_relation_link"
#     __table_args__ = (
#         Index("ix_rel_src", "release_id", "relation_type"),
#         Index("ix_rel_dst", "related_release_id"),
#     )
#
#     id:                          Mapped[int] = mapped_column(Integer, primary_key=True)
#     release_id:                  Mapped[int] = mapped_column(ForeignKey("dolls_release.id"), nullable=False)
#     related_release_id:          Mapped[int] = mapped_column(ForeignKey("dolls_release.id"), nullable=False)
#     relation_type_id:   Mapped[RelationType] = mapped_column(ForeignKey("relation_types.id"), nullable=False)
#     note:              Mapped[Optional[str]] = mapped_column(TEXT)
#
#     updated_at:   Mapped[Optional[datetime]] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
#     created_at:   Mapped[Optional[datetime]] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
# class ReleaseImagesORM(Base):
#     __tablename__ = "release_image"
#     __table_args__ = (
#         Index("ix_images_release", "release_id"),
#         Index("ix_images_primary", "release_id", "is_primary"),
#     )
#
#     id:         Mapped[int]             = mapped_column(Integer, primary_key=True)
#     release_id: Mapped[int]             = mapped_column(ForeignKey("release.id"), nullable=False)
#     url:        Mapped[str]             = mapped_column(String(500), nullable=False)
#     is_primary: Mapped[bool]            = mapped_column(Boolean, default=False, nullable=False)
#
#     updated_at: Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
#     created_at: Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
# class ReleaseCharactersORM(Base):
#     __tablename__ = "release_character_link"
#     __table_args__ = (
#         UniqueConstraint("release_id", "character_id", "role", name="uix_character_role"),
#         Index("ix_rc_character_role", "character_id", "role"),
#     )
#
#     release_id:             Mapped[int] = mapped_column(ForeignKey("release.id"), primary_key=True)
#     character_id:           Mapped[int] = mapped_column(ForeignKey("characters.id"), primary_key=True)
#     role:         Mapped[CharacterRole] = mapped_column(SAEnum(CharacterRole), default=CharacterRole.primary, nullable=False)
#     position:               Mapped[int] = mapped_column(Integer, default=0, nullable=False)
#
#     updated_at: Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
#     created_at: Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
# class ReleaseCharacterRolesORM(Base):
#     __tablename__ = "character_role"
#
#     id:                    Mapped[int] = mapped_column(INTEGER, primary_key=True)
#     name:                  Mapped[str] = mapped_column(String(50), unique=True)
#     description: Mapped[Optional[str]] = mapped_column(TEXT)
#
#     updated_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
#     created_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
# class RelationTypesORM(Base):
#     __tablename__ = "relation_types"
#
#     id:                    Mapped[int] = mapped_column(INTEGER, primary_key=True)
#     name:                  Mapped[str] = mapped_column(String(50), unique=True)
#     description: Mapped[Optional[str]] = mapped_column(TEXT)
#
#     updated_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
#     created_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
# class CharactersORM(Base):
#     __tablename__ = "characters"
#     id:                      Mapped[int] = mapped_column(INTEGER, primary_key=True)
#     name:                    Mapped[str] = mapped_column(String(120),  nullable=False, unique=True)
#     display_name:            Mapped[str] = mapped_column(String(120),  nullable=False)
#     gender_id:               Mapped[str] = mapped_column(ForeignKey('character_gender.id'), nullable=False)
#     description:   Mapped[Optional[str]] = mapped_column(TEXT)
#     primary_image: Mapped[Optional[str]] = mapped_column(TEXT)
#     alt_names:     Mapped[Optional[str]] = mapped_column(TEXT)
#     notes:         Mapped[Optional[str]] = mapped_column(TEXT)
#
#     updated_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
#     created_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
