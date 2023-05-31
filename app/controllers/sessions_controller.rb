class SessionsController < ApplicationController
  skip_before_action :authorize, only: :create

  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      if user.type === "Tutor"
        render json: user, include: "students.assignments"
      elsif user.type === "Student"
        render json: user, include: "assignments.tutor"
      else
        render json: { errors: "Invalid username or password" }, status: :unauthorized
      end
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end
end
