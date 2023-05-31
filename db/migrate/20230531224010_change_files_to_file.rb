class ChangeFilesToFile < ActiveRecord::Migration[7.0]
  def change
    rename_column :assignments, :files, :file
  end
end
