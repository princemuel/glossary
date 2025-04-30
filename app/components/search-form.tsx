import { tw } from "@/helpers/tailwind";

import { useFetcher } from "react-router";

import type { loader } from "@/routes/api.search";

type Props = {};

export const SearchForm = (props: Props) => {
  const fetcher = useFetcher<typeof loader>({ key: "search" });

  const error = fetcher.data?.error;
  const isError = !!error;

  return (
    <fetcher.Form method="get" className="flex flex-col gap-2" action="/">
      <label
        className={tw([
          "flex w-full items-center gap-1 rounded-xl px-4 py-2.5 text-xl",
          "bg-grey-100 dark:bg-grey-800",
          "hover:border hover:border-accent-200",
          "focus-within:border focus-within:border-accent-200",
          isError ? "border-accent-100" : null,
        ])}
      >
        <input
          type="text"
          id="fields.query.input"
          name="query"
          className="flex-1 border-none bg-transparent p-0 text-sm font-bold text-grey-700 outline-none focus:ring-0 sm:text-base dark:text-white"
          placeholder="Search for any word"
          aria-invalid={isError ? "true" : "false"}
          aria-errormessage="fields.query.error"
        />
        {/* <Icon name="search" title="Search for any word" className="text-inherit" /> */}
        <span className="sr-only">Search for any word</span>
      </label>
      <p
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        className="text-sm text-accent-100 sm:text-xl"
        id="fields.query.error"
      >
        {error?.message}
      </p>
    </fetcher.Form>
  );
};
