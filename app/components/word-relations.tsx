import { Fragment } from "react";
import { Link } from "react-router";

type Props = { values: string[]; label: string };

export const WordRelations = ({ values, label }: Props) => {
  return (
    <dl className="flex items-start gap-4">
      <dt className="text-xl text-grey-400">{label}</dt>
      <dd>
        <ul className="flex flex-wrap items-center gap-2 text-lg font-bold text-accent-200">
          {values.map((value, i) => (
            <Fragment key={`${value + i}}`}>
              <li>
                <Link
                  to={new URL(
                    encodeURI(`https://en.wiktionary.org/wiki/${value}`),
                  ).toString()}
                  className="hocus:underline"
                >
                  {value}
                </Link>
              </li>
            </Fragment>
          ))}
        </ul>
      </dd>
    </dl>
  );
};
