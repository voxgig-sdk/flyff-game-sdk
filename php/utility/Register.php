<?php
declare(strict_types=1);

// FlyffGame SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

FlyffGameUtility::setRegistrar(function (FlyffGameUtility $u): void {
    $u->clean = [FlyffGameClean::class, 'call'];
    $u->done = [FlyffGameDone::class, 'call'];
    $u->make_error = [FlyffGameMakeError::class, 'call'];
    $u->feature_add = [FlyffGameFeatureAdd::class, 'call'];
    $u->feature_hook = [FlyffGameFeatureHook::class, 'call'];
    $u->feature_init = [FlyffGameFeatureInit::class, 'call'];
    $u->fetcher = [FlyffGameFetcher::class, 'call'];
    $u->make_fetch_def = [FlyffGameMakeFetchDef::class, 'call'];
    $u->make_context = [FlyffGameMakeContext::class, 'call'];
    $u->make_options = [FlyffGameMakeOptions::class, 'call'];
    $u->make_request = [FlyffGameMakeRequest::class, 'call'];
    $u->make_response = [FlyffGameMakeResponse::class, 'call'];
    $u->make_result = [FlyffGameMakeResult::class, 'call'];
    $u->make_point = [FlyffGameMakePoint::class, 'call'];
    $u->make_spec = [FlyffGameMakeSpec::class, 'call'];
    $u->make_url = [FlyffGameMakeUrl::class, 'call'];
    $u->param = [FlyffGameParam::class, 'call'];
    $u->prepare_auth = [FlyffGamePrepareAuth::class, 'call'];
    $u->prepare_body = [FlyffGamePrepareBody::class, 'call'];
    $u->prepare_headers = [FlyffGamePrepareHeaders::class, 'call'];
    $u->prepare_method = [FlyffGamePrepareMethod::class, 'call'];
    $u->prepare_params = [FlyffGamePrepareParams::class, 'call'];
    $u->prepare_path = [FlyffGamePreparePath::class, 'call'];
    $u->prepare_query = [FlyffGamePrepareQuery::class, 'call'];
    $u->result_basic = [FlyffGameResultBasic::class, 'call'];
    $u->result_body = [FlyffGameResultBody::class, 'call'];
    $u->result_headers = [FlyffGameResultHeaders::class, 'call'];
    $u->transform_request = [FlyffGameTransformRequest::class, 'call'];
    $u->transform_response = [FlyffGameTransformResponse::class, 'call'];
});
