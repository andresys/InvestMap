class ApplicationController < ActionController::Base
    layout false, :except => :frontend
    respond_to :json, :except => :frontend

    protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token
    protect_from_forgery unless: -> { request.format.json? }
  
    def frontend
      render html: "", layout: true
    end

    def not_found
      raise ActionController::RoutingError.new('Not Found')
    end
end
