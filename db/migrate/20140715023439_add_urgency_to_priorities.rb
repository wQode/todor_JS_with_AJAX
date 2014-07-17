class AddUrgencyToPriorities < ActiveRecord::Migration
  def change
    add_column :priorities, :urgency, :integer
  end
end
