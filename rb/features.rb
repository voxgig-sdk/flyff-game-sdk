# FlyffGame SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module FlyffGameFeatures
  def self.make_feature(name)
    case name
    when "base"
      FlyffGameBaseFeature.new
    when "ratelimit"
      FlyffGameRatelimitFeature.new
    when "retry"
      FlyffGameRetryFeature.new
    when "test"
      FlyffGameTestFeature.new
    when "timeout"
      FlyffGameTimeoutFeature.new
    else
      FlyffGameBaseFeature.new
    end
  end
end
