type Props = {
  title: string;
};

export default function SectionTitle({ title }: Props) {
  return (
    <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
      / {title}
    </p>
  );
}