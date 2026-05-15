<?php
declare(strict_types=1);

// FlyffGame SDK utility: prepare_body

class FlyffGamePrepareBody
{
    public static function call(FlyffGameContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
