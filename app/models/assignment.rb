class Assignment < ApplicationRecord
  belongs_to :student
  belongs_to :tutor

  has_one_attached :file

  validates :name, :subject, presence: true

  def file_url
    Rails.application.routes.url_helpers.url_for(file) if file.attached?
  end
end
