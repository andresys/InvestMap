#!/usr/bin/env ruby
# just pass in the string straight from `curl -v http://my-url-goes-here.com | grep Set-Cookie`
# should look like this:
# Set-Cookie: _my_new_app_session=BAh7B0kiD3Nlc3Npb25faWQGOgZFVEkiJWE1NTA3NWU2MDBjYjE1NWY3N2Y0NzhkOWE3NzdlYzY2BjsAVEkiEG15X3ZhcmlhYmxlBjsARkkiDW15IHZhbHVlBjsAVA%3D%3D--9583fe7995314e148eaa4c16269ca2f6864f6abf; path=/; HttpOnly
# e.g. ruby decode.rb BAh7B0kiD3Nlc3Npb25faWQGOgZFVEkiJWE1NTA3NWU2MDBjYjE1NWY3N2Y0NzhkOWE3NzdlYzY2BjsAVEkiEG15X3ZhcmlhYmxlBjsARkkiDW15IHZhbHVlBjsAVA%3D%3D--9583fe7995314e148eaa4c16269ca2f6864f6abf
require 'uri'
require 'rack'

#cookie = "r2UP2Iu3aiXQQ8iPb3GS5zuO6z%2B2Knup43XzkGJs7oBQhQL3Y3FWhRssFNUAbUbPYYWLiNEy%2FY3F%2FZeZNXW2tbwln%2FSf24ffIHTV2kbXMiygE%2B%2Fwy%2B2YvnRqna5ahr3%2BHpJzffSM7eLF5K7NKqzA93N09DRRYBFdMHjU77tXv2D80zlYxsxhgJKKJcxDBPw%2BXoO4lsKTs9Ljfqb4eoupID3WQmjHU6pWl68FKtQTsLOBuP97u%2B6fm09ve5dpWLhgYk6YqrdRAyuBRyWQaw2NSSmzYJc0cz9EdP72kQfMusW2hMi0qP3GPoVutpQtDojSKPnc1gZjGRTAvelS79zkQ2iGa4kExofQvxIRlBNnSedOXIDlmKMBCt6lyFTKKEyAxXDDCWonRw%3D%3D--Tplp7BNwW18PULdN--yJASw4C76zdSKP3%2F1malqA%3D%3D"
base64_text = URI.unescape(ARGV[0])
#base64_text = URI.unescape(cookie)
first_part_text, second_part_text = base64_text.split('--')

puts Rack::Session::Cookie::Base64::Marshal.new.decode(first_part_text)
