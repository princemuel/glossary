import { WordRelations } from "@/components/word-relations";

import { tw } from "@/helpers/tailwind";
import { hasValues } from "@/helpers/utils";

import { Fragment } from "react";
import { Link } from "react-router";

import type { Result } from "@/schema/schema";

type Props = { data: NonNullable<Result["data"]> };

export const RenderResult = ({ data }: Props) => {
  return (
    <Fragment>
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-4">
          <h1 id="headline" className="text-3xl font-bold lg:text-6xl">
            {data.word}
          </h1>
          <p className="text-2xl tracking-tighter text-accent-200">
            {data.phonetic || data.phonetics?.[0]?.text}
          </p>
        </div>
      </header>

      {hasValues(data.meanings)
        ? data.meanings.map((meaning) => (
            <section
              key={JSON.stringify(meaning)}
              aria-labelledby={meaning.partOfSpeech}
              className="flex flex-col gap-8"
            >
              <h2
                id={meaning.partOfSpeech}
                className={tw([
                  "flex items-center gap-6",
                  "text-lg font-bold italic text-grey-700 dark:text-white",
                ])}
              >
                <span>{meaning.partOfSpeech}</span>
                <span className="h-px flex-1 bg-grey-200 dark:bg-grey-600" />
              </h2>

              {hasValues(meaning.definitions) ? (
                <dl className="flex flex-col gap-5">
                  <dt className="text-xl text-grey-400">Meaning</dt>
                  <dd>
                    <ul
                      className={tw([
                        "flex flex-col gap-3",
                        "list-disc pl-6 marker:text-accent-200",
                        "text-sm text-grey-700 dark:text-white",
                      ])}
                    >
                      {meaning.definitions.map((d) => (
                        <Fragment key={d.definition}>
                          <li className="space-y-3 pl-2">
                            <p>{d.definition}</p>
                            {d.example && (
                              <q className="block text-grey-400">{d.example}</q>
                            )}
                          </li>
                        </Fragment>
                      ))}
                    </ul>
                  </dd>
                </dl>
              ) : null}

              {hasValues(meaning.synonyms) ? (
                <WordRelations label="Synonyms" values={meaning.synonyms} />
              ) : null}

              {hasValues(meaning.antonyms) ? (
                <WordRelations label="Antonyms" values={meaning.antonyms} />
              ) : null}
            </section>
          ))
        : null}

      <footer className="flex flex-col gap-4">
        <hr className="h-px border-grey-200 dark:border-grey-600" />
        <div className="flex flex-col gap-4 text-[0.625rem] leading-4 2xs:text-sm">
          <h2 className="text-grey-400">Source</h2>
          <div className="flex flex-col gap-2">
            {hasValues(data.sourceUrls)
              ? data.sourceUrls.map((url, i) => (
                  <Fragment key={`${url + i}}`}>
                    <Link
                      to={url}
                      className="group flex items-center gap-2 text-grey-700 dark:text-white"
                    >
                      <span className="group-hover:underline group-focus:underline">
                        {url}
                      </span>
                      {/* <Icon name="new-window" className="" /> */}
                    </Link>
                  </Fragment>
                ))
              : null}
          </div>
        </div>
      </footer>
    </Fragment>
  );
};
