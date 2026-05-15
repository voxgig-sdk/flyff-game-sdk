<?php
declare(strict_types=1);

// FlyffGame SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class FlyffGameFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new FlyffGameBaseFeature();
            case "test":
                return new FlyffGameTestFeature();
            default:
                return new FlyffGameBaseFeature();
        }
    }
}
