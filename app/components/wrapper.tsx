import { tw } from "@/helpers/tailwind";

export function Wrapper(props: React.ComponentProps<"div">) {
  const { children, className: classes, ...attrs } = props;
  return (
    <div
      {...attrs}
      className={tw(["mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8", classes])}
    >
      {children}
    </div>
  );
}
