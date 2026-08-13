# FlyffGame SDK utility: make_context

from flyffgame_sdk.core.context import FlyffGameContext


def make_context_util(ctxmap, basectx):
    return FlyffGameContext(ctxmap, basectx)
