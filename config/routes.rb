Rails.application.routes.draw do
  get "/me", to: "users#show"
  post "/signup", to: "users#create"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/getstudents", to: "users#tutors_students"
  get "/gettutors", to: "users#students_tutors"

  resources :assignments
  # resources :tutor_students, only: [:create]
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
