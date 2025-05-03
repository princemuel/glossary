/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Magic function to format the incoming api data into the expected output
 *
 * ! **ALERT: USE WITH CAUTION**
 * This function is dangerous as it expects the incoming data
 * to be in a certain format which might not be what is received.
 * @param results
 * @returns
 */
export function parse(results: any) {
  const merged = {
    word: results[0]?.word,
    phonetic: results[0]?.phonetic,
    phonetics: [],
    meanings: [],
    license: results[0]?.license,
    sourceUrls: []
  };

  const phoneticSet = new Set();
  const sourceUrlSet = new Set();
  const meaningMap = new Map();

  for (const result of results) {
    // Merge phonetics using a Set for uniqueness
    for (const phonetic of result.phonetics) {
      const key = `${phonetic.text}|${phonetic.audio}`;
      if (!phoneticSet.has(key)) {
        // @ts-expect-error  just ignore
        merged.phonetics.push(phonetic);
        phoneticSet.add(key);
      }
    }

    // Merge meanings
    for (const meaning of result.meanings) {
      const partOfSpeech = meaning.partOfSpeech;
      const definitions = meaning.definitions;
      const synonyms = meaning.synonyms;
      const antonyms = meaning.antonyms;
      if (!meaningMap.has(partOfSpeech)) {
        meaningMap.set(partOfSpeech, { ...meaning, definitions: [] });
      }

      const existingMeaning = meaningMap.get(partOfSpeech);
      const existingDefinitionsSet = new Set(
        // @ts-expect-error  just ignore
        existingMeaning.definitions.map((d) => d.definition)
      );

      for (const definition of definitions) {
        const definitionKey = definition.definition;
        if (!existingDefinitionsSet.has(definitionKey)) {
          existingMeaning.definitions.push(definition);
          existingDefinitionsSet.add(definitionKey); // Add to the set for future checks
        }
      }

      for (const synonym of synonyms) {
        if (!existingMeaning.synonyms.includes(synonym)) {
          existingMeaning.synonyms.push(synonym);
        }
      }

      for (const antonym of antonyms) {
        if (!existingMeaning.antonyms.includes(antonym)) {
          existingMeaning.antonyms.push(antonym);
        }
      }
    }

    // Merge source URLs using a Set for uniqueness
    for (const url of result.sourceUrls) sourceUrlSet.add(url);
  }

  // Finalize merged meanings and source URLs

  // @ts-expect-error  just ignore
  merged.meanings = Array.from(meaningMap.values());
  // @ts-expect-error  just ignore
  merged.sourceUrls = Array.from(sourceUrlSet);

  merged.phonetics = [
    // @ts-expect-error  just ignore
    merged.phonetics.reduce((acc, current) => {
      return {
        // @ts-expect-error  just ignore
        text: acc?.text || current?.text, // @ts-expect-error  just ignore
        audio: acc?.audio || current?.audio, // @ts-expect-error  just ignore
        sourceUrl: acc?.sourceUrl || current?.sourceUrl,
        license: {
          // @ts-expect-error  just ignore
          name: acc?.license?.name || current?.license?.name, // @ts-expect-error  just ignore
          url: acc.license?.url || current?.license?.url
        }
      };
    }, {})
  ];

  return merged;
}
