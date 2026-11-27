const DEFAULT_FILE_LIMIT = 8 * 1024 * 1024;
const MAX_FILE_LIMIT = 20 * 1024 * 1024;

export type ProfessionalApplicationConfig = {
  maxFileBytes: number;
  internRecruitmentOpen: boolean;
};

export function getProfessionalApplicationConfig(): ProfessionalApplicationConfig {
  const value = Number(process.env.PROFESSIONAL_APPLICATION_MAX_FILE_BYTES || DEFAULT_FILE_LIMIT);
  return {
    maxFileBytes: Number.isSafeInteger(value) && value > 0 ? Math.min(value, MAX_FILE_LIMIT) : DEFAULT_FILE_LIMIT,
    internRecruitmentOpen: process.env.PROFESSIONAL_INTERN_RECRUITMENT_OPEN === "true",
  };
}
