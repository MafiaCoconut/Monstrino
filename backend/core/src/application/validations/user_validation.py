from watchfiles import awatch

from domain.user import User, NewUser
import re

from application.exceptions.invalid_user_data import InvalidUserData

class UserValidation:

    USERNAME_REGEX   = re.compile(r"^[A-Za-z0-9_-]{3,20}$")

    FIRST_NAME_REGEX = re.compile(r"^[A-Za-z ]+$")
    LAST_NAME_REGEX  = re.compile(r"^[A-Za-z ]+$")

    PASSWORD_REGEX = re.compile(r"^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*+\-])[A-Za-z\d!@#$%^&*+\-]{6,15}$"
)


    def validate_new_user(self, user: NewUser):
        self.validate_username(user.username)
        self.validate_first_name(user.firstName)
        self.validate_last_name(user.lastName)
        self.validate_password(user.password)

    def validate_user(self, user: NewUser):
        self.validate_username(user.username)
        self.validate_first_name(user.firstName)
        self.validate_last_name(user.lastName)
        self.validate_password(user.password)

    @staticmethod
    def validate_username(username: str):
        if not UserValidation.USERNAME_REGEX.match(username):
            raise InvalidUserData("Invalid username", "username")

    @staticmethod
    def validate_first_name(first_name: str):
        if not UserValidation.FIRST_NAME_REGEX.match(first_name):
            raise InvalidUserData("Invalid first name", "first_name")

    @staticmethod
    def validate_last_name(last_name: str):
        if not UserValidation.FIRST_NAME_REGEX.match(last_name):
            raise InvalidUserData("Invalid last name", "last_name")

    @staticmethod
    def validate_password(password: str):
        if not UserValidation.PASSWORD_REGEX.match(password):
            raise InvalidUserData("Invalid password", "password")


