import assert from "node:assert";
import { describe, it } from "vitest";
import { getCharacterInfo } from "./getCharacterInfo.ts";
import { Effect } from "effect";
import { FetchHttpClient } from "@effect/platform";

describe("getCharacterInfo", () => {
  it("should return the correct character info", () => {
    return Effect.gen(function* () {
      const characterInfo = yield* getCharacterInfo(1);
      assert.equal(characterInfo.name, "Luke Skywalker");
      assert(!characterInfo.isDarthVader);
    }).pipe(Effect.provide(FetchHttpClient.layer), Effect.runPromise);
  });
});
