class Tutor < User
  has_and_belongs_to_many :students, join_table: :assignments
  has_many :assignments
  
  validates :subjects, presence: true
  validates :name, presence: true
  
  validates :grade, absence: true
  
end
