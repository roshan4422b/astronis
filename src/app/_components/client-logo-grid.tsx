import { clients } from "@/content/clients";
import Image from "@/app/_components/asset-image";

type ClientLogoGridProps = {
  limit?: number;
};

export default function ClientLogoGrid({ limit }: ClientLogoGridProps) {
  const visibleClients = limit ? clients.slice(0, limit) : clients;

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
