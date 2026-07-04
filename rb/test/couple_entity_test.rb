# Couple entity test

require "minitest/autorun"
require "json"
require_relative "../FlyffGame_sdk"
require_relative "runner"

class CoupleEntityTest < Minitest::Test
  def test_create_instance
    testsdk = FlyffGameSDK.test(nil, nil)
    ent = testsdk.Couple(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = couple_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "couple." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set FLYFFGAME_TEST_COUPLE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    couple_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.couple")))
    couple_ref01_data = nil
    if couple_ref01_data_raw.length > 0
      couple_ref01_data = Helpers.to_map(couple_ref01_data_raw[0][1])
    end

    # LOAD
    couple_ref01_ent = client.Couple(nil)
    couple_ref01_match_dt0 = {}
    couple_ref01_data_dt0_loaded = couple_ref01_ent.load(couple_ref01_match_dt0, nil)
    assert !couple_ref01_data_dt0_loaded.nil?

  end
end

def couple_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "couple", "CoupleTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = FlyffGameSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["couple01", "couple02", "couple03"],
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
  entid_env_raw = ENV["FLYFFGAME_TEST_COUPLE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "FLYFFGAME_TEST_COUPLE_ENTID" => idmap,
    "FLYFFGAME_TEST_LIVE" => "FALSE",
    "FLYFFGAME_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["FLYFFGAME_TEST_COUPLE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["FLYFFGAME_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
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
