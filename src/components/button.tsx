export default function Button({
  children,
  buttonProps,
}: {
  children: React.ReactNode;
  buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <button
      {...buttonProps}
      className="w-full py-3 bg-yellow rounded-3xl mt-4 font-bold text-xl disabled:bg-neutral-400 disabled:text-neutral-600 disabled:cursor-not-allowed">
      {children}
    </button>
  );
}
