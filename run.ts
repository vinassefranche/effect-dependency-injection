import { Effect } from "effect";
import { getCharacterInfo } from "./src/getCharacterInfo.ts";

const result = await Effect.runPromise(getCharacterInfo(1));
console.log(result);
