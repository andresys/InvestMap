class SessionsController < Devise::SessionsController

  def create2
    self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)
    yield resource if block_given?
    render json: {success: true, jwt: current_token, response: "Authentication successful" }
  end

private

  # def respond_with(resource, _opts = {})
  #   render json: resource
  # end

  def respond_to_on_destroy
    head :ok
  end

  # def current_token
  #   request.env['warden-jwt_auth.token']
  # end
end