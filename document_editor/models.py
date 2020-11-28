from . import db
import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(
        db.Integer,
        primary_key=True
    )
    name = db.Column(
        db.String(100),
        nullable=False,
        unique=False
    )
    email = db.Column(
        db.String(40),
        unique=True,
        nullable=False
    )
    password = db.Column(
        db.String(200),
        primary_key=False,
        unique=False,
        nullable=False
    )
    created_on = db.Column(
        db.DateTime,
        index=False,
        unique=False,
        nullable=True
    )
    last_login = db.Column(
        db.DateTime,
        index=False,
        unique=False,
        nullable=True
    )

    def set_password(self, password):
        self.password = generate_password_hash(
            password,
            method='sha256'
        )

    def check_password(self, password):
        return check_password_hash(self.password, password)


class UserFiles(db.Model):
    __tablename__ = 'user_files'
    id = db.Column(
        db.Integer,
        primary_key=True,
    )
    created = db.Column(
        db.DateTime,
        unique=False,
        nullable=False,
    )
    modified = db.Column(
        db.DateTime,
        unique=False,
        nullable=False,
        default=datetime.datetime.now,
    )
    file_name = db.Column(
        db.String(100),
        nullable=False,
        unique=False
    )
    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        nullable=False,
        unique=False,
    )
    file_name = db.Column(
        db.Text,
        nullable=True,
        unique=False
    )
