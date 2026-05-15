<?php
declare(strict_types=1);

// FlyffGame SDK utility: result_headers

class FlyffGameResultHeaders
{
    public static function call(FlyffGameContext $ctx): ?FlyffGameResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
