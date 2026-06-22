type HostInfoProps = {
  hostName: string;
  hostYears: number;
};

const HostInfo = ({ hostName, hostYears }: HostInfoProps) => {
  return (
    <section className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4">
      <div className="h-12 w-12 rounded-full bg-gray-300" aria-hidden="true" />
      <div>
        <p className="text-sm font-semibold text-gray-900">Anfitrión: {hostName}</p>
        <p className="text-sm text-gray-600">{hostYears} años como anfitrión</p>
      </div>
    </section>
  );
};

export const HostInfoComponent = HostInfo;