export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <p className="text-xs font-semibold text-gray-400 tracking-wider mb-3">
        {title}
      </p>
      {children}
    </div>
  );
}
