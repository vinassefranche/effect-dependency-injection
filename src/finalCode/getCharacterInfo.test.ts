import assert from "node:assert";
import { describe, vi } from "vitest";

import { CharacterInfoService, getCharacterInfo } from "./getCharacterInfo.ts";
import { Effect } from "effect";
import { it } from "@effect/vitest";

describe("getCharacterInfo", () => {
  it.effect("should return the correct character info", () => {
    return Effect.gen(function* () {
      const characterInfoService = yield* CharacterInfoService;
      vi.spyOn(characterInfoService, "getCharacterById").mockImplementationOnce(
        () =>
          Effect.succeed({
            name: "Luke Skywalker",
            height: 172,
            mass: 77,
            hair_color: "blond",
            eye_color: "blue",
            birth_year: "19BBY",
          })
      );

      const characterInfo = yield* getCharacterInfo(1);
      assert.equal(characterInfo.name, "Luke Skywalker");
      assert(!characterInfo.isDarthVader);
    }).pipe(Effect.provide(CharacterInfoService.dummyLayer));
  });
});
