class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable,
    :lockable, :trackable,
    :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  def generate_jwt
    p "++++++++"
    JWT.encode({id: id, exp: 60.days.from_now.to_i}, Rails.application.secrets.secret_key_base)
  end

  def on_jwt_dispatch(token, payload)
    p "==============="
    p token
  end
end
