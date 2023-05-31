class StudentSerializer < UserSerializer
  attributes :id, :grade
  has_many :assignments

end
