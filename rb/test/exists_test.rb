# FlyffGame SDK exists test

require "minitest/autorun"
require_relative "../FlyffGame_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = FlyffGameSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
