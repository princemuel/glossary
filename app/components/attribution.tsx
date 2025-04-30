import { Link } from "react-router";
import { Wrapper } from "./wrapper";

const formatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});
const buildDate = new Date(__BUILD_DATE__);

type Props = React.ComponentProps<"footer">;

export function Attribution({ className: classes, ...attrs }: Props) {
  return (
    <footer
      className="mt-20 bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-white"
      {...attrs}
    >
      <Wrapper className="flex items-center justify-center py-1">
        <p className="flex flex-wrap content-center items-center gap-1 text-xs">
          <span>Built with&nbsp;</span>
          {/* <Icon name="logos:astro-icon" /> */}
          <Link to="https://docs.astro.build/en/concepts/why-astro/">
            Vite & ReactRouter v7
          </Link>
          &nbsp;on&nbsp;
          <time dateTime={buildDate.toISOString()}>
            {formatter.format(buildDate)}
          </time>
        </p>
      </Wrapper>
    </footer>
  );
}
