<?php
declare(strict_types=1);

// FlyffGame SDK exists test

require_once __DIR__ . '/../flyffgame_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = FlyffGameSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
