class CreateAssignments < ActiveRecord::Migration[7.0]
  def change
    create_table :assignments do |t|
      t.string :name
      t.string :subject
      t.string :notes
      t.references :tutor
      t.references :student
      t.string :files

      t.timestamps
    end
  end
end
