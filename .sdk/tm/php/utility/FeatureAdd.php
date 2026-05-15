<?php
declare(strict_types=1);

// FlyffGame SDK utility: feature_add

class FlyffGameFeatureAdd
{
    public static function call(FlyffGameContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
