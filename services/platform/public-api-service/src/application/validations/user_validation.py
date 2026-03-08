from domain.entities.user import UserRegistration
import re

from application.exceptions.invalid_user_data import InvalidUserData

class UserValidation:

    USERNAME_REGEX   = re.compile(r"^[A-Za-z0-9_-]{3,20}$")
    EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
    FIRST_NAME_REGEX = re.compile(r"^[A-Za-z ]+$")
    LAST_NAME_REGEX  = re.compile(r"^[A-Za-z ]+$")

    PASSWORD_REGEX = re.compile(r"^(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&*+\-])[A-Za-z\d_!@#$%^&*+\-]{6,15}$"
)


    def validate_new_user(self, user: UserRegistration):
        self.validate_username(user.username)
        self.validate_email(user.email)
        # self.validate_first_name(user.firstName)
        # self.validate_last_name(user.lastName)
        # self.validate_password(user.password) # TODO Turn on before deploying

    def validate_user(self, user: UserRegistration):
        self.validate_username(user.username)
        self.validate_email(user.email)
        self.validate_first_name(user.firstName)
        self.validate_last_name(user.lastName)
        self.validate_password(user.password)

    @staticmethod
    def validate_username(username: str):
        if not UserValidation.USERNAME_REGEX.match(username):
            raise InvalidUserData("Invalid username", "username")

    @staticmethod
    def validate_email(email: str):
        if not UserValidation.EMAIL_REGEX.match(email):
            raise InvalidUserData("Invalid email", "email")

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


