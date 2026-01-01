type Props = {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
};

export default function DashboardHeader({ title, subtitle, action }: Props) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}
