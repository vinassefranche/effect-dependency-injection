import { FetchHttpClient, HttpClient, HttpClientError } from "@effect/platform";
import { Effect, Layer, ParseResult, pipe, Schema } from "effect";

const goldenRatio = (1 + Math.sqrt(5)) / 2;

export const getCharacterInfo = (id: number) =>
  pipe(
    CharacterInfoService.getCharacterById(id),
    Effect.map(({ mass, height, eye_color, hair_color, name }) => ({
      name,
      hasGoodProportions: mass / height < goldenRatio,
      hasSameEyeAndHairColor: hair_color === eye_color,
      isDarthVader: name === "Darth Vader",
    }))
  );

const characterSchema = Schema.Struct({
  name: Schema.String,
  height: Schema.NumberFromString,
  mass: Schema.NumberFromString,
  hair_color: Schema.String,
  eye_color: Schema.String,
});

export class CharacterInfoService extends Effect.Tag("CharacterInfoService")<
  CharacterInfoService,
  {
    getCharacterById: (
      id: number
    ) => Effect.Effect<
      typeof characterSchema.Type,
      HttpClientError.HttpClientError | ParseResult.ParseError
    >;
  }
>() {
  static liveLayer = Layer.succeed(this, {
    getCharacterById: (id) =>
      pipe(
        HttpClient.get(`https://swapi.dev/api/people/${id}/`),
        Effect.flatMap((response) => response.json),
        Effect.flatMap(Schema.decodeUnknown(characterSchema)),
        Effect.scoped,
        Effect.provide(FetchHttpClient.layer)
      ),
  });
  static dummyLayer = Layer.succeed(this, {
    getCharacterById: () =>
      Effect.succeed({
        name: "Aragorn",
        height: 205,
        mass: 85,
        hair_color: "black",
        eye_color: "black",
        birth_year: "2053",
      }),
  });
}
