package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/flyff-game-sdk/go"
	"github.com/voxgig-sdk/flyff-game-sdk/go/core"

	vs "github.com/voxgig-sdk/flyff-game-sdk/go/utility/struct"
)

func TestBadgeEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Badge(nil)
		if ent == nil {
			t.Fatal("expected non-nil BadgeEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := badgeBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "badge." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set FLYFF_GAME_TEST_BADGE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		badgeRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.badge", setup.data)))
		var badgeRef01Data map[string]any
		if len(badgeRef01DataRaw) > 0 {
			badgeRef01Data = core.ToMapAny(badgeRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = badgeRef01Data

		// LOAD
		badgeRef01Ent := client.Badge(nil)
		badgeRef01MatchDt0 := map[string]any{
			"id": badgeRef01Data["id"],
		}
		badgeRef01DataDt0Loaded, err := badgeRef01Ent.Load(badgeRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		badgeRef01DataDt0LoadResult := core.ToMapAny(entityData(badgeRef01DataDt0Loaded))
		if badgeRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if badgeRef01DataDt0LoadResult["id"] != badgeRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func badgeBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "badge", "BadgeTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read badge test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse badge test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"badge01", "badge02", "badge03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("FLYFF_GAME_TEST_BADGE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"FLYFF_GAME_TEST_BADGE_ENTID": idmap,
		"FLYFF_GAME_TEST_LIVE":      "FALSE",
		"FLYFF_GAME_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["FLYFF_GAME_TEST_BADGE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["FLYFF_GAME_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewFlyffGameSDK(core.ToMapAny(mergedOpts))
	}

	live := env["FLYFF_GAME_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["FLYFF_GAME_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
