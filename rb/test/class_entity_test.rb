# Class entity test

require "minitest/autorun"
require "json"
require_relative "../FlyffGame_sdk"
require_relative "runner"

class ClassEntityTest < Minitest::Test
  def test_create_instance
    testsdk = FlyffGameSDK.test(nil, nil)
    ent = testsdk.Class(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = class_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "class." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set FLYFFGAME_TEST_CLASS_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    class_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.class")))
    class_ref01_data = nil
    if class_ref01_data_raw.length > 0
      class_ref01_data = Helpers.to_map(class_ref01_data_raw[0][1])
    end

    # LIST
    class_ref01_ent = client.Class(nil)
    class_ref01_match = {}

    class_ref01_list_result, err = class_ref01_ent.list(class_ref01_match, nil)
    assert_nil err
    assert class_ref01_list_result.is_a?(Array)

    # LOAD
    class_ref01_match_dt0 = {
      "id" => class_ref01_data["id"],
    }
    class_ref01_data_dt0_loaded, err = class_ref01_ent.load(class_ref01_match_dt0, nil)
    assert_nil err
    class_ref01_data_dt0_load_result = Helpers.to_map(class_ref01_data_dt0_loaded)
    assert !class_ref01_data_dt0_load_result.nil?
    assert_equal class_ref01_data_dt0_load_result["id"], class_ref01_data["id"]

  end
end

def class_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "class", "ClassTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = FlyffGameSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["class01", "class02", "class03", "tree01", "tree02", "tree03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["FLYFFGAME_TEST_CLASS_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "FLYFFGAME_TEST_CLASS_ENTID" => idmap,
    "FLYFFGAME_TEST_LIVE" => "FALSE",
    "FLYFFGAME_TEST_EXPLAIN" => "FALSE",
    "FLYFFGAME_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["FLYFFGAME_TEST_CLASS_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["FLYFFGAME_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["FLYFFGAME_APIKEY"],
      },
      extra || {},
    ])
    client = FlyffGameSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["FLYFFGAME_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["FLYFFGAME_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
