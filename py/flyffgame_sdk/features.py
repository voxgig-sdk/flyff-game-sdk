# FlyffGame SDK feature factory

from flyffgame_sdk.feature.base_feature import FlyffGameBaseFeature
from flyffgame_sdk.feature.test_feature import FlyffGameTestFeature


def _make_feature(name):
    features = {
        "base": lambda: FlyffGameBaseFeature(),
        "test": lambda: FlyffGameTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
