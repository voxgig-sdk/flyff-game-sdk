<?php
declare(strict_types=1);

// FlyffGame SDK utility: result_body

class FlyffGameResultBody
{
    public static function call(FlyffGameContext $ctx): ?FlyffGameResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
