class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :email
      t.string :name
      t.string :subjects
      t.string :headline
      t.string :grade
      t.string :type
      t.string :avatar
      t.timestamps
    end
  end
end
