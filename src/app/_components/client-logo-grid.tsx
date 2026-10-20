import { clients } from "@/content/clients";
import Image from "@/app/_components/asset-image";

type ClientLogo = {
  name: string;
  className: string;
  logo: string;
};

type ClientLogoGridProps = {
  limit?: number;
  clients?: readonly ClientLogo[];
};

export default function ClientLogoGrid({ limit, clients: clientList = clients }: ClientLogoGridProps) {
  const visibleClients = limit ? clientList.slice(0, limit) : clientList;

  return (
    <div className="client-logo-grid" aria-label="Our trusted clients">
      {visibleClients.map((client) => (
        <div className={`client-logo ${client.className}`} key={client.name}>
          <Image src={client.logo} alt={`${client.name} logo`} width={190} height={70} />
        </div>
      ))}
    </div>
  );
}
