# FlyffGame SDK utility: feature_add
module FlyffGameUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
