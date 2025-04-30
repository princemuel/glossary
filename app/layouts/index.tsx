import { SearchForm } from "@/components/search-form";
import { Wrapper } from "@/components/wrapper";

import { Fragment } from "react";

type Props = React.ComponentProps<"div">;

function RootLayout({ children }: Props) {
  return (
    <Fragment>
      <header>Header</header>
      <div className="flex flex-col gap-8">
        <Wrapper>
          <SearchForm />
        </Wrapper>
        {children}
      </div>
      <footer>Footer</footer>
    </Fragment>
  );
}

export { RootLayout };
