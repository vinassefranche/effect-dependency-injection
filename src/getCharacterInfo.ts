import { Effect, pipe, Schema } from "effect";

const goldenRatio = (1 + Math.sqrt(5)) / 2;

const characterSchema = Schema.Struct({
  name: Schema.String,
  height: Schema.NumberFromString,
  mass: Schema.NumberFromString,
  hair_color: Schema.String,
  eye_color: Schema.String,
});

export const getCharacterInfo = (id: number) =>
  pipe(
    Effect.tryPromise(async () => {
      const response = await fetch(`https://swapi.dev/api/people/${id}/`);
      return response.json();
    }),
    Effect.flatMap(Schema.decodeUnknown(characterSchema)),
    Effect.map(({ mass, height, eye_color, hair_color, name }) => ({
      name,
      hasGoodProportions: mass / height < goldenRatio,
      hasSameEyeAndHairColor: hair_color === eye_color,
      isDarthVader: name === "Darth Vader",
    }))
  );
