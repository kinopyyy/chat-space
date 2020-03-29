# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


# Qiita DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null :false|
|email|string|null :false|
|pass|string|null :false|
### Association
- has_many :groups, though: :group_users
- has_many :messeges
- has_many :group_users

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null :false|
|user_id|integer|null: false, foreign_key: true|
### Association
- has_many :users, though: :group_users
- has_many :group_users
- has_many :messeges


## group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group


## messageテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

