type Props = {
  title: string;
};

export default function SectionTitle({ title }: Props) {
  return (
    <p className="font-console text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
      / {title}
    </p>
  );
}