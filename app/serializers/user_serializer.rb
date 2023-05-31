class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :type, :email, :image_url
end
