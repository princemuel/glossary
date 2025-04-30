type Props = React.ComponentProps<"main">;

export const Main = ({ children, ...attrs }: Props) => {
  return (
    <main id="main-content" aria-labelledby="headline" {...attrs}>
      {children}
    </main>
  );
};
