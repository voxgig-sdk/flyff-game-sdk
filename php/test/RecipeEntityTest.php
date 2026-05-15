<?php
declare(strict_types=1);

// Recipe entity test

require_once __DIR__ . '/../flyffgame_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class RecipeEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = FlyffGameSDK::test(null, null);
        $ent = $testsdk->Recipe(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = recipe_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "recipe." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set FLYFFGAME_TEST_RECIPE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $recipe_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.recipe")));
        $recipe_ref01_data = null;
        if (count($recipe_ref01_data_raw) > 0) {
            $recipe_ref01_data = Helpers::to_map($recipe_ref01_data_raw[0][1]);
        }

        // LIST
        $recipe_ref01_ent = $client->Recipe(null);
        $recipe_ref01_match = [];

        [$recipe_ref01_list_result, $err] = $recipe_ref01_ent->list($recipe_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($recipe_ref01_list_result);

        // LOAD
        $recipe_ref01_match_dt0 = [];
        [$recipe_ref01_data_dt0_loaded, $err] = $recipe_ref01_ent->load($recipe_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($recipe_ref01_data_dt0_loaded);

    }
}

function recipe_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/recipe/RecipeTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = FlyffGameSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["recipe01", "recipe02", "recipe03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("FLYFFGAME_TEST_RECIPE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "FLYFFGAME_TEST_RECIPE_ENTID" => $idmap,
        "FLYFFGAME_TEST_LIVE" => "FALSE",
        "FLYFFGAME_TEST_EXPLAIN" => "FALSE",
        "FLYFFGAME_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["FLYFFGAME_TEST_RECIPE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["FLYFFGAME_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["FLYFFGAME_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new FlyffGameSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["FLYFFGAME_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["FLYFFGAME_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
