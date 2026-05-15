<?php
declare(strict_types=1);

// FlyffGame SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class FlyffGameMakeContext
{
    public static function call(array $ctxmap, ?FlyffGameContext $basectx): FlyffGameContext
    {
        return new FlyffGameContext($ctxmap, $basectx);
    }
}
