# FlyffGame SDK utility: make_context
require_relative '../core/context'
module FlyffGameUtilities
  MakeContext = ->(ctxmap, basectx) {
    FlyffGameContext.new(ctxmap, basectx)
  }
end
