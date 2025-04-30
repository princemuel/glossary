import { Link } from "react-router";

export const SkipNavLink = () => {
  return (
    <Link
      to="#main-content"
      className="sr-only grid place-content-center bg-gray-900 text-white underline outline-offset-0 focus:not-sr-only focus:absolute focus:left-2 focus:p-2"
    >
      Skip to main content
    </Link>
  );
};
