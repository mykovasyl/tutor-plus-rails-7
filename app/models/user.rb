class User < ApplicationRecord

  has_secure_password
  has_one_attached :avatar

  validates :username, presence: true, uniqueness: true, length: {minimum: 4}
  validates :email, presence: true, uniqueness: true
  validates :password, length: {minimum: 8, maximum: 20}, :if => :password
  validates :password_confirmation, length: {minimum: 8, maximum: 20}, :if => :password_confirmation
  validates :type, presence: true

  def image_url
    Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
  end

end
