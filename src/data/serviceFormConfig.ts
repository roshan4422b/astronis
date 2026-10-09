import { services } from "./services";

export type ServiceRequirementOption = {
  label: string;
  question?: string;
  options?: string[];
};

export type ServiceFormEntry = {
  id: string;
  label: string;
  requirements: ServiceRequirementOption[];
};

export const serviceFormConfig: ServiceFormEntry[] = services.map(service => ({
  id: service.slug,
  label: service.title,
  requirements: service.subServices.map(group => ({
    label: group.title,
    ...(group.children.length ? { question: "Child service", options: group.children } : {}),
  })),
}));
export const serviceOptions = serviceFormConfig.map(service => service.label);
