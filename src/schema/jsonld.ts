import type {
  AudioObject,
  DefinedTerm,
  Organization,
  WithContext,
} from "schema-dts";
import type { Result } from "./schema";

// Function to generate JSON-LD schema
function generateJsonLd(result: NonNullable<Result["data"]>) {
  // Function to generate AudioObject array
  const generateAudioObjects = (phonetics: (typeof result)["phonetics"]) =>
    phonetics.map(
      (phonetic) =>
        ({
          "@type": "AudioObject",
          contentUrl: phonetic.audio,
          caption: `Phonetic pronunciation of ${result.word}`,
          license: {
            "@type": "CreativeWork",
            name: phonetic.license.name,
            url: phonetic.license.url,
          },
        }) satisfies AudioObject,
    );

  // Function to generate meanings
  const generateMeanings = (meanings: (typeof result)["meanings"]) =>
    meanings.map(
      (meaning) =>
        ({
          "@type": "DefinedTerm",
          name: `Meaning for ${meaning.partOfSpeech}`,
          description: meaning.definitions[0]?.definition ?? "",
          // partOfSpeech: meaning.partOfSpeech,
          // synonyms: meaning.synonyms,
          // antonyms: meaning.antonyms,
          // examples: meaning.definitions
          //   .filter((def) => def.example)
          //   .map((def) => ({
          //     "@type": "CreativeWork",
          //     text: def.example,
          //   })),
        }) satisfies DefinedTerm,
    );

  // Define the organization (provider)
  const provider = {
    "@type": "Organization",
    name: "Your Dictionary App",
    url: "https://example.com",
    logo: "https://example.com/logo.png",
    sameAs: [
      "https://www.facebook.com/YourDictionaryApp",
      "https://twitter.com/YourDictionaryApp",
    ],
  } satisfies Organization;

  // Return the JSON-LD schema
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: result.word,
    description: result.meanings[0]?.definitions[0]?.definition ?? "",
    inDefinedTermSet: "https://example.com",
    url: `https://example.com/word/${result.word}`,
    // phoneticText: result.phonetic,
    // audio: generateAudioObjects(result.phonetics),
    // meanings: generateMeanings(result.meanings),
    // provider,
    // license: {
    //   "@type": "CreativeWork",
    //   name: result.license.name,
    //   url: result.license.url,
    // },
    // source: result.sourceUrls,
  } satisfies WithContext<DefinedTerm>;
}
