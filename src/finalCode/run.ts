import { Effect, pipe } from "effect";
import { CharacterInfoService, getCharacterInfo } from "./getCharacterInfo.ts";

const result = await pipe(
  getCharacterInfo(1),
  Effect.provide(CharacterInfoService.liveLayer),
  Effect.runPromise
);
console.log(result);
