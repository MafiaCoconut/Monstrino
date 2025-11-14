from enum import Enum


class RelationType(str, Enum):
    bundle_includes    = "bundle_includes"
    includes_pet       = "includes_pet"
    is_pet_of          = "is_pet_of"
    is_funko_of        = "is_funko_of"
    is_plush_of        = "is_plush_of"
    reissue_of         = "reissue_of"
    same_mpn_diff_lang = "same_mpn_diff_lang"
    colorway_of        = "colorway_of"


class ShotType(str, Enum):
    box         = "box"
    back        = "back"
    accessories = "accessories"
    loose       = "loose"
    promo       = "promo"


class CharacterRole(str, Enum):
    primary       = "primary"
    secondary     = "secondary"
    included_doll = "included_doll"
    theme         = "theme"
    artwork       = "artwork"
