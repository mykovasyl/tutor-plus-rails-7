class AssignmentsController < ApplicationController
  skip_before_action :authorize, only: :create

  def index
    all_assignments = Assignment.all
    render json: all_assignments, status: :ok
  end

  def create
    assignment = Assignment.create!(new_assignment_params)
    render json: assignment, include: "tutor.students.assignments", status: :created
  end

  def destroy
    assignment_to_delete = find_assignment
    if assignment_to_delete.tutor_id == @current_user.id
      assignment_to_delete.destroy
      head :no_content
    else
      render json: { error: "You do not have permission to destroy this assignment." }, status: :unauthorized
    end
  end

  private

  def new_assignment_params
    params.permit(:name, :subject, :notes, :tutor_id, :student_id, :file)
  end

  def find_assignment
    Assignment.find(params[:id])
  end
end
