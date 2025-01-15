import { Effect, pipe } from "effect";
import { getCharacterInfo } from "./src/getCharacterInfo.ts";
import { FetchHttpClient } from "@effect/platform";

const result = await pipe(
  getCharacterInfo(1),
  Effect.provide(FetchHttpClient.layer),
  Effect.runPromise
);
console.log(result);
