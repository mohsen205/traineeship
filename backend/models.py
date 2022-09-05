from database import Base
from sqlalchemy import Boolean, Text, Column, String, Integer, DateTime, func, TIMESTAMP, ForeignKey, BigInteger, Float, text, Date
from sqlalchemy.dialects.mysql import LONGTEXT
from sqlalchemy.orm import relationship

# # users table


class User(Base):
    __tablename__ = 'users'
    id = Column(BigInteger, autoincrement=True,
                primary_key=True, unique=True, index=True)
    name = Column(String(50), nullable=False, index=True)
    email = Column(String(115), unique=True, nullable=False, index=True)
    image = Column(String(255), nullable=True)
    bg_profile = Column(String(255), nullable=True)
    email_verified = Column(TIMESTAMP)
    facebook_username = Column(String(50), nullable=True)
    twitter_username = Column(String(50), nullable=True)
    youtube_link = Column(String(100), nullable=True)
    about = Column(String(255), nullable=True)
    password = Column(String(255), nullable=False)
    reset_token = Column(LONGTEXT, unique=True, nullable=True)
    created_at = Column(
        DateTime, server_default=func.sysdate(), nullable=False)
    updated_at = Column(
        TIMESTAMP, onupdate=func.utc_timestamp(), nullable=False)

    category = relationship('WatchList', back_populates="user",
                            cascade="all, delete", passive_deletes=True)
    collection = relationship(
        'Collection', back_populates="user", cascade="all, delete", passive_deletes=True)
    privatedetails = relationship(
        "PriavteDetail", back_populates="user", cascade="all, delete", passive_deletes=True, uselist=False)
    notification = relationship(
        "Alert", back_populates="user", cascade="all, delete", passive_deletes=True)

# # # Login with third partie provider


class Account(Base):
    __tablename__ = 'accounts'
    id = Column(BigInteger, nullable=False,
                autoincrement=True, primary_key=True)
    compound_id = Column(String(255), nullable=False, unique=True, index=True)
    user_id = Column(BigInteger, index=True)
    provider_type = Column(String(255), nullable=False)
    provider_id = Column(String(255), nullable=False, index=True)
    provider_account_id = Column(String(255), nullable=False, index=True)
    refresh_token = Column(Text)
    access_token = Column(Text)
    access_token_expires = Column(TIMESTAMP)
    created_at = Column(
        DateTime, server_default=func.sysdate(), nullable=False)
    updated_at = Column(
        DateTime, onupdate=func.utc_timestamp(), nullable=False)


class Session(Base):
    __tablename__ = 'sessions'
    id = Column(BigInteger, nullable=False,
                autoincrement=True, primary_key=True)
    user_id = Column(BigInteger, index=True)
    expires = Column(TIMESTAMP, nullable=False)
    session_token = Column(String(255), nullable=False,
                           unique=True, index=True)
    access_token = Column(String(255), nullable=False, unique=True, index=True)
    created_at = Column(
        DateTime, server_default=func.sysdate(), nullable=False)
    updated_at = Column(
        DateTime, onupdate=func.utc_timestamp(), nullable=False)


class Verificationrequests(Base):
    __tablename__ = 'verification_requests'
    id = Column(BigInteger, nullable=False,
                autoincrement=True, primary_key=True)
    identifier = Column(String(255), nullable=False)
    token = Column(String(255), nullable=False)
    expires = Column(String(255), nullable=False)
    created_at = Column(
        DateTime, server_default=func.sysdate(), nullable=False)
    updated_at = Column(
        DateTime, onupdate=func.utc_timestamp(), nullable=False)


# # collection table


class Collection(Base):
    __tablename__ = 'collections'
    id = Column(BigInteger, autoincrement=True,
                primary_key=True, unique=True, index=True)
    title = Column(String(50), unique=True, nullable=True, index=True)
    discription = Column(String(255), nullable=True)

    user_id = Column(BigInteger, ForeignKey(
        "users.id", ondelete="CASCADE"), index=True)
    user = relationship("User", back_populates="collection")

    created_at = Column(
        DateTime, server_default=func.sysdate(), nullable=False)
    updated_at = Column(
        TIMESTAMP, onupdate=func.utc_timestamp(), nullable=False)

    collections = relationship(
        'WatchList', back_populates="viewer", cascade="all, delete", passive_deletes=True)
# # watchlist table


class WatchList(Base):
    __tablename__ = 'watchlists'
    id = Column(Integer, autoincrement=True,
                primary_key=True, unique=True, index=True)
    symbol = Column(String(10), nullable=False, index=True)
    exch_desc = Column(String(10), nullable=False, index=True)
    company_name = Column(String(10), nullable=False, index=True)

    user_id = Column(BigInteger, ForeignKey(
        "users.id", ondelete="CASCADE"), index=True)
    user = relationship("User", back_populates="category")

    collection_id = Column(BigInteger, ForeignKey(
        "collections.id", ondelete="CASCADE"), nullable=False, default=5, index=True)
    viewer = relationship("Collection", back_populates="collections")

    created_at = Column(
        DateTime, server_default=func.sysdate(), nullable=False)
    updated_at = Column(
        TIMESTAMP, onupdate=func.utc_timestamp(), nullable=False)
# # alert table


class Alert(Base):
    __tablename__ = 'alert'
    id = Column(Integer, autoincrement=True,
                primary_key=True, unique=True, index=True)
    symbol = Column(String(10), nullable=False, index=True)
    exch_desc = Column(String(10), nullable=False, index=True)
    price = Column(Float, nullable=False, index=True)
    position = Column(String(20), nullable=True,
                      default="Moves above", index=True)

    # is_reached = Column(Boolean, default="false", nullable=False)
    # is_viewed = Column(Boolean, default="false", nullable=False)
    # viewed_at = (DateTime)

    recevie = Column(Boolean, nullable=False, default="true", index=True)

    user_id = Column(BigInteger, ForeignKey(
        "users.id", ondelete="CASCADE"), index=True)
    user = relationship("User", back_populates="notification")

    created_at = Column(
        DateTime, server_default=func.sysdate(), nullable=False)
    updated_at = Column(
        TIMESTAMP, onupdate=func.utc_timestamp(), nullable=False)

#  # priavte details table


class PriavteDetail(Base):
    __tablename__ = 'priavtedetails'
    id = Column(Integer, autoincrement=True,
                primary_key=True, unique=True, index=True)
    first_name = Column(String(80), nullable=True, index=True)
    last_name = Column(String(80), nullable=True, index=True)
    phone = Column(BigInteger, nullable=True, index=True)
    yearBrith = Column(Date, nullable=True)
    country = Column(String(80), nullable=True, index=True)
    city = Column(String(80), nullable=True, index=True)
    stateRegion = Column(String(80), nullable=True, index=True)
    zipCode = Column(BigInteger, nullable=True, index=True)
    company = Column(String(80), nullable=True, index=True)
    taxpayId = Column(String(80), nullable=True, index=True)

    user_id = Column(BigInteger, ForeignKey(
        "users.id", ondelete="CASCADE"), index=True)
    user = relationship("User", back_populates="privatedetails")

    created_at = Column(
        DateTime, server_default=func.sysdate(), nullable=False)
    updated_at = Column(
        TIMESTAMP, onupdate=func.utc_timestamp(), nullable=False)


#  # priavte details table


class Feedback(Base):
    __tablename__ = 'feedback'
    id = Column(Integer, autoincrement=True,
                primary_key=True, unique=True, index=True)
    reason = Column(String(50), nullable=False)
    message = Column(String(255), nullable=True)
    created_at = Column(
        DateTime, server_default=func.sysdate(), nullable=False)
    updated_at = Column(
        TIMESTAMP, onupdate=func.utc_timestamp(), nullable=False)
