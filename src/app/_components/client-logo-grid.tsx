import { clients } from "@/content/clients";

type ClientLogoGridProps = {
  limit?: number;
};

export default function ClientLogoGrid({ limit }: ClientLogoGridProps) {
  const visibleClients = limit ? clients.slice(0, limit) : clients;

  return (
    <div className="client-logo-grid" aria-label="Our trusted clients">
      {visibleClients.map((client) => (
        <div className={`client-logo ${client.className}`} key={client.name}>
          <span className="client-logo-name">{client.name}</span>
          {client.descriptor && (
            <span className="client-logo-descriptor">{client.descriptor}</span>
          )}
        </div>
      ))}
    </div>
  );
}
