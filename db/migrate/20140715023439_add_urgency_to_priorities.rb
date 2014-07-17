class AddUrgencyToPriorities < ActiveRecord::Migration
  def change
    add_column :priorities, :urgency, :integer
    t.timestamps
  end
end
