# FlyffGame SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module FlyffGameFeatures
  def self.make_feature(name)
    case name
    when "base"
      FlyffGameBaseFeature.new
    when "test"
      FlyffGameTestFeature.new
    else
      FlyffGameBaseFeature.new
    end
  end
end
