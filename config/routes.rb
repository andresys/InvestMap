Rails.application.routes.draw do
  root to: 'application#frontend'

  scope :api, constraints: { format: 'json' }, defaults: { format: 'json' } do 
    scope :v1 do
      #resources :invest_objects
    end
  end

  match "*path", to: 'application#frontend', via: :all

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end