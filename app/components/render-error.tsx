import type { Result } from "@/schema/schema";

type Props = { error: NonNullable<Result["error"]> };

export const RenderError = ({ error }: Props) => {
  return (
    <div className="flex flex-col gap-8 text-center">
      <span role="img" aria-label="frown emoji" className="text-6xl">
        &nbsp;🙁&nbsp;
      </span>
      <h1
        id="error-msg"
        className="text-xl font-bold text-grey-700 dark:text-white"
      >
        {error.title}
      </h1>
      <p className="text-lg text-grey-400">
        {error.message}&nbsp;{error.resolution}
      </p>
    </div>
  );
};
