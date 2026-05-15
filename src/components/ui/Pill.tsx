type Props = {
  text: string;
};

export default function Pill({ text }: Props) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-300 px-2.5 py-0.5 text-xs text-zinc-700 whitespace-nowrap dark:border-zinc-600 dark:text-zinc-300/80">
      {text}
    </span>
  );
}
