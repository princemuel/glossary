import { Wrapper } from "@/components/wrapper";

import { Link } from "react-router";

function Header() {
  return (
    <header className="py-12">
      <Wrapper>
        <div className="flex items-start justify-between">
          <Link to="/" className="flex items-center">
            {/* <Icon name="logo" class="text-2xl" /> */}
            <span className="sr-only">Go to home</span>
          </Link>

          <div className="flex items-center gap-4">
            {/* <!-- Select --> */}
            {/* <Icon name="arrow-down" /> */}
            {/* <!-- Switch --> */}
            {/* <Icon name="moon" /> */}
          </div>
        </div>
      </Wrapper>
    </header>
  );
}

export { Header };
