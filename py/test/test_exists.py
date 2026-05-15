# ProjectName SDK exists test

import pytest
from flyffgame_sdk import FlyffGameSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FlyffGameSDK.test(None, None)
        assert testsdk is not None
