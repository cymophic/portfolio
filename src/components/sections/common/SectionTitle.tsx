type Props = {
  title: string;
};

export default function SectionTitle({ title }: Props) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
      {title}
    </p>
  );
}