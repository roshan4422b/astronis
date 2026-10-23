export type CategoryCode = "CA" | "RA" | "LA" | "BA" | "GN";
export type HierarchyCode = `AG-${string}` | `GN-${string}`;
export type TaxonomyOption = { code: string; label: string; active?: boolean };
export type PositionOption = TaxonomyOption & { category: CategoryCode; hierarchyCode: HierarchyCode; hierarchyLabel: string; dynamicCountry?: boolean; seniorReview?: boolean };

export const categories: TaxonomyOption[] = [
  { code: "CA", label: "Corporate Advisory" },
  { code: "RA", label: "Regulatory Advisory" },
  { code: "LA", label: "Legal Advisory" },
  { code: "BA", label: "Business Advisory" },
  { code: "GN", label: "Global Network & International" },
];

const masterHierarchies: Record<string, string> = {
  "AG-01": "Global Leadership", "AG-02": "Senior Leadership", "AG-03": "Practice Leadership",
  "AG-04": "Director", "AG-05": "Principal", "AG-06": "Senior Advisory", "AG-07": "Management",
  "AG-08": "Professional / Specialist", "AG-09": "Associate Track", "AG-10": "Entry / Analyst Track",
  "AG-09P": "Associate Track - Principal", "AG-09S": "Associate Track - Senior", "AG-09A": "Associate Track",
  "GN-01": "Global Network Leadership", "GN-02": "Director / Regional Leadership", "GN-03": "Country Leadership",
  "GN-04": "International Advisory", "GN-05": "Independent Network",
};

function addPositions(category: CategoryCode, code: HierarchyCode, titles: string[], opts: { label?: string; senior?: boolean } = {}): PositionOption[] {
  const label = opts.label ?? masterHierarchies[code];
  return titles.map((title) => ({
    code: `${category}-${code.replace("-", "")}-${title.toUpperCase().replace(/\[COUNTRY\]/g, "COUNTRY").replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
    label: title,
    category,
    hierarchyCode: code,
    hierarchyLabel: label,
    ...(title.includes("[Country]") ? { dynamicCountry: true } : {}),
    ...(/Partner|Global Head|Director|Country Head|Regional Director/.test(title) ? { seniorReview: true } : {}),
  }));
}

export const positions: PositionOption[] = [
  ...addPositions("CA", "AG-01", ["Partner & Global Head - Corporate Advisory"]),
  ...addPositions("CA", "AG-03", ["Partner / Practice Head - Corporate Advisory"]),
  ...addPositions("CA", "AG-04", ["Director - Corporate Advisory", "Regional Director - Corporate Advisory"]),
  ...addPositions("CA", "AG-05", ["Principal Consultant - Corporate Advisory"]),
  ...addPositions("CA", "AG-06", ["Senior Advisor - Corporate Advisory"]),
  ...addPositions("CA", "AG-07", ["Manager - Corporate Advisory"]),
  ...addPositions("CA", "AG-08", ["Corporate Consultant - M&A and Structuring", "Corporate Restructuring Advisor", "Corporate Governance Advisor", "Startup & Emerging Business Advisor", "FDI & Cross-Border Transaction Advisor", "Corporate Due Diligence Consultant"]),
  ...addPositions("CA", "AG-09", ["Senior Associate - Corporate Advisory", "Associate - Corporate Advisory"]),
  ...addPositions("CA", "AG-10", ["Analyst - Corporate Advisory"]),

  ...addPositions("RA", "AG-01", ["Partner & Global Head - Regulatory Advisory"]),
  ...addPositions("RA", "AG-03", ["Partner - Regulatory & Compliance"]),
  ...addPositions("RA", "AG-04", ["Director - Regulatory Advisory"]),
  ...addPositions("RA", "AG-05", ["Principal - Regulatory Affairs"]),
  ...addPositions("RA", "AG-06", ["Senior Regulatory Advisor"]),
  ...addPositions("RA", "AG-07", ["Manager - Regulatory Compliance"]),
  ...addPositions("RA", "AG-08", ["Regulatory Affairs Consultant", "Regulatory Compliance Consultant", "Banking & NBFC Regulatory Advisor", "FEMA & Foreign Exchange Advisor", "FinTech Regulatory Advisor", "SEBI & Capital Markets Regulatory Consultant", "RBI Regulatory Consultant", "GST & Indirect Tax Consultant", "MSME Regulatory Advisor", "Licensing & Registration Consultant", "FSSAI & Consumer Regulatory Consultant", "ESG & Sustainability Advisor", "Risk & Compliance Advisor"]),
  ...addPositions("RA", "AG-09", ["Senior Associate - Regulatory Advisory", "Associate - Regulatory Advisory"]),
  ...addPositions("RA", "AG-10", ["Regulatory Analyst"]),

  ...addPositions("LA", "AG-01", ["Partner & Global Head - Legal Advisory"]),
  ...addPositions("LA", "AG-02", ["Senior Partner", "Executive Partner - Legal"]),
  ...addPositions("LA", "AG-03", ["Partner - Legal Advisory", "Partner - Litigation & Dispute Resolution", "Partner - Corporate & Commercial Law"]),
  ...addPositions("LA", "AG-04", ["Director - Legal Advisory"]),
  ...addPositions("LA", "AG-05", ["Principal Attorney"]),
  ...addPositions("LA", "AG-06", ["Senior Legal Advisor"]),
  ...addPositions("LA", "AG-08", ["Legal Advisor - Legal Metrology & FSSAI"]),
  ...addPositions("LA", "AG-08", ["Counsel - Arbitration & ADR", "Counsel - Corporate & Commercial Litigation", "Counsel - Banking & Finance", "Counsel - Insolvency & Restructuring", "Counsel - Intellectual Property", "Counsel - Employment & Labour", "Counsel - Real Estate & RERA", "Counsel - Tax & GST Litigation", "Counsel - White Collar & Investigations", "Counsel - Competition & Regulatory Law", "Counsel - International & Cross-Border Matters"], { label: "Professional / Specialist" }),
  ...addPositions("LA", "AG-09P", ["Principal Associate"]),
  ...addPositions("LA", "AG-09S", ["Senior Associate"]),
  ...addPositions("LA", "AG-09A", ["Associate"]),
  ...addPositions("LA", "AG-10", ["Junior Associate"]),

  ...addPositions("BA", "AG-01", ["Partner & Global Head - Business Advisory"]),
  ...addPositions("BA", "AG-03", ["Partner - Business Advisory"]),
  ...addPositions("BA", "AG-04", ["Director - Business Advisory"]),
  ...addPositions("BA", "AG-05", ["Principal - Strategy & Business Advisory"]),
  ...addPositions("BA", "AG-06", ["Senior Business Advisor"]),
  ...addPositions("BA", "AG-07", ["Manager - Business Advisory"]),
  ...addPositions("BA", "AG-08", ["Business Strategy Consultant", "Management Consultant", "Business Transformation Consultant", "International Business Advisor", "Investment & Transaction Consultant", "MSME, Startup & Growth Advisor", "Financial & Business Restructuring Consultant", "Risk Advisory Consultant", "Forensic & Investigation Consultant", "HR & Organisation Consultant", "Technology & Digital Transformation Consultant", "ESG & Sustainability Consultant"]),
  ...addPositions("BA", "AG-09", ["Senior Associate - Business Advisory", "Associate - Business Advisory"]),
  ...addPositions("BA", "AG-10", ["Business Analyst"]),

  ...addPositions("GN", "GN-01", ["Head - Global Markets & Relationships"]),
  ...addPositions("GN", "GN-02", ["Director - International Business", "Director - Cross-Border Advisory"]),
  ...addPositions("GN", "GN-02", ["Regional Director - Asia Pacific", "Regional Director - Middle East & Africa", "Regional Director - Europe", "Regional Director - Americas"], { label: "Director / Regional Leadership" }),
  ...addPositions("GN", "GN-03", ["Country Head - [Country]"]),
  ...addPositions("GN", "GN-04", ["International Business Advisor", "Cross-Border Advisor"]),
  ...addPositions("GN", "GN-05", ["Independent Country Advisor - Professional", "International Associate - [Country]"]),
];

export function hierarchiesFor(category: CategoryCode): TaxonomyOption[] {
  const unique = new Map<string, TaxonomyOption>();
  for (const position of positions) if (position.category === category) unique.set(position.hierarchyCode, { code: position.hierarchyCode, label: position.hierarchyLabel });
  return [...unique.values()];
}

export function positionsFor(category: CategoryCode, hierarchy: string) {
  return positions.filter((position) => position.active !== false && position.category === category && position.hierarchyCode === hierarchy);
}

export type Specialisation = TaxonomyOption & { category: CategoryCode };
const specialisationLabels: Record<Exclude<CategoryCode, "GN">, string[]> = {
  CA: ["Corporate & Commercial", "M&A", "Joint Ventures", "Corporate Governance", "Restructuring", "Due Diligence", "Startups", "FDI & Cross-Border"],
  RA: ["RBI", "Banking & NBFC", "FEMA", "FinTech", "SEBI/Capital Markets", "GST", "MSME", "Licensing", "FSSAI", "Legal Metrology", "ESG", "Risk & Compliance"],
  LA: ["Litigation & Dispute Resolution", "Arbitration & ADR", "Corporate & Commercial", "Banking & Finance", "Insolvency", "IP", "Employment", "RERA", "Tax/GST Litigation", "White Collar", "Competition", "Cross-Border"],
  BA: ["Strategy", "Management Consulting", "Transformation", "International Business", "Investment & Transactions", "MSME/Startup Growth", "Restructuring", "Risk", "Forensics", "HR", "Technology/Digital", "ESG"],
};
export const specialisations: Specialisation[] = Object.entries(specialisationLabels).flatMap(([category, labels]) => labels.map((label, index) => ({ category: category as CategoryCode, code: `${category}-SP-${String(index + 1).padStart(2, "0")}`, label })));
export const globalSpecialisations = specialisations;
export function specialisationsFor(category: CategoryCode) { return specialisations.filter((item) => category === "GN" || item.category === category); }

export const backgrounds: TaxonomyOption[] = [
  ["PQ-01", "Advocate / Attorney / Lawyer"], ["PQ-02", "Chartered Accountant (CA)"], ["PQ-03", "Company Secretary (CS)"],
  ["PQ-04", "Cost & Management Accountant (CMA)"], ["PQ-05", "MBA / Management Professional"], ["PQ-06", "Finance / Investment Professional"],
  ["PQ-07", "Banking / Financial Services Professional"], ["PQ-08", "Compliance / Risk Professional"], ["PQ-09", "Tax / GST Professional"],
  ["PQ-10", "Engineer / Technology Professional"], ["PQ-11", "Data / Digital / Cyber Professional"], ["PQ-12", "HR / Organisation Professional"],
  ["PQ-13", "ESG / Sustainability Professional"], ["PQ-14", "Former Government / Regulatory Professional"], ["PQ-15", "Industry / Sector Specialist"],
  ["PQ-16", "Academic / Research Professional"], ["PQ-17", "Other Professional"],
].map(([code, label]) => ({ code: code as string, label: label as string }));

export const qualificationGuidance: Record<CategoryCode, string> = {
  CA: "Advocate/Lawyer, CA, CS, CMA, MBA, Finance and Industry Specialist backgrounds may be relevant depending on the role.",
  RA: "Advocate/Lawyer, CA, CS, CMA, Banking, Compliance/Risk, Tax, Former Regulator and Industry Specialist backgrounds may be relevant.",
  LA: "Advocate/Attorney/Lawyer backgrounds are primary; specialist professionals may be relevant where the role lawfully permits.",
  BA: "MBA, CA, CMA, Finance, Banking, HR, Technology, ESG, Industry Specialist and relevant Lawyer backgrounds may be relevant.",
  GN: "Relevant professional backgrounds supported by market, jurisdictional and sector expertise may be appropriate.",
};

export const experienceBands: Array<TaxonomyOption & { fit: string }> = [
  { code: "EX-01", label: "0–2 years", fit: "Analyst / Junior Associate / Entry" },
  { code: "EX-02", label: "3–5 years", fit: "Associate / Consultant" },
  { code: "EX-03", label: "6–8 years", fit: "Senior Associate / Advisor / Manager" },
  { code: "EX-04", label: "9–12 years", fit: "Senior Advisor / Principal / Manager" },
  { code: "EX-05", label: "13–18 years", fit: "Principal / Director / Practice Leadership" },
  { code: "EX-06", label: "19+ years", fit: "Director / Partner / Senior Leadership" },
];

export const engagementTypes: TaxonomyOption[] = [
  { code: "ET-01", label: "Full-Time Professional" }, { code: "ET-02", label: "Part-Time Professional" },
  { code: "ET-03", label: "Retainer / Consultant" }, { code: "ET-04", label: "Independent Consultant" },
  { code: "ET-05", label: "International Associate" }, { code: "ET-06", label: "Independent Country Advisor" },
  { code: "ET-07", label: "Of Counsel / Specialist Counsel - where applicable" },
  { code: "ET-08", label: "Intern / Trainee - when recruitment is opened" },
];

const countryGroups: Record<string, string> = {
  "Africa": "DZ:Algeria;AO:Angola;BJ:Benin;BW:Botswana;BF:Burkina Faso;BI:Burundi;CV:Cabo Verde;CM:Cameroon;CF:Central African Republic;TD:Chad;KM:Comoros;CD:Congo (Democratic Republic);CG:Congo (Republic);CI:Côte d’Ivoire;DJ:Djibouti;EG:Egypt;GQ:Equatorial Guinea;ER:Eritrea;SZ:Eswatini;ET:Ethiopia;GA:Gabon;GM:Gambia;GH:Ghana;GN:Guinea;GW:Guinea-Bissau;KE:Kenya;LS:Lesotho;LR:Liberia;LY:Libya;MG:Madagascar;MW:Malawi;ML:Mali;MR:Mauritania;MU:Mauritius;MA:Morocco;MZ:Mozambique;NA:Namibia;NE:Niger;NG:Nigeria;RW:Rwanda;ST:Sao Tome and Principe;SN:Senegal;SC:Seychelles;SL:Sierra Leone;SO:Somalia;ZA:South Africa;SS:South Sudan;SD:Sudan;TZ:Tanzania;TG:Togo;TN:Tunisia;UG:Uganda;ZM:Zambia;ZW:Zimbabwe",
  "Asia": "AF:Afghanistan;AM:Armenia;AZ:Azerbaijan;BH:Bahrain;BD:Bangladesh;BT:Bhutan;BN:Brunei;KH:Cambodia;CN:China;CY:Cyprus;GE:Georgia;IN:India;ID:Indonesia;IR:Iran;IQ:Iraq;IL:Israel;JP:Japan;JO:Jordan;KZ:Kazakhstan;KW:Kuwait;KG:Kyrgyzstan;LA:Laos;LB:Lebanon;MY:Malaysia;MV:Maldives;MN:Mongolia;MM:Myanmar;NP:Nepal;KP:North Korea;OM:Oman;PK:Pakistan;PS:Palestine;PH:Philippines;QA:Qatar;SA:Saudi Arabia;SG:Singapore;KR:South Korea;LK:Sri Lanka;SY:Syria;TW:Taiwan;TJ:Tajikistan;TH:Thailand;TL:Timor-Leste;TR:Türkiye;TM:Turkmenistan;AE:United Arab Emirates;UZ:Uzbekistan;VN:Vietnam;YE:Yemen",
  "Europe": "AL:Albania;AD:Andorra;AT:Austria;BY:Belarus;BE:Belgium;BA:Bosnia and Herzegovina;BG:Bulgaria;HR:Croatia;CZ:Czechia;DK:Denmark;EE:Estonia;FI:Finland;FR:France;DE:Germany;GR:Greece;HU:Hungary;IS:Iceland;IE:Ireland;IT:Italy;XK:Kosovo;LV:Latvia;LI:Liechtenstein;LT:Lithuania;LU:Luxembourg;MT:Malta;MD:Moldova;MC:Monaco;ME:Montenegro;NL:Netherlands;MK:North Macedonia;NO:Norway;PL:Poland;PT:Portugal;RO:Romania;RU:Russia;SM:San Marino;RS:Serbia;SK:Slovakia;SI:Slovenia;ES:Spain;SE:Sweden;CH:Switzerland;UA:Ukraine;GB:United Kingdom;VA:Vatican City",
  "North America": "AG:Antigua and Barbuda;BS:Bahamas;BB:Barbados;BZ:Belize;CA:Canada;CR:Costa Rica;CU:Cuba;DM:Dominica;DO:Dominican Republic;SV:El Salvador;GD:Grenada;GT:Guatemala;HT:Haiti;HN:Honduras;JM:Jamaica;MX:Mexico;NI:Nicaragua;PA:Panama;KN:Saint Kitts and Nevis;LC:Saint Lucia;VC:Saint Vincent and the Grenadines;TT:Trinidad and Tobago;US:United States",
  "South America": "AR:Argentina;BO:Bolivia;BR:Brazil;CL:Chile;CO:Colombia;EC:Ecuador;GY:Guyana;PY:Paraguay;PE:Peru;SR:Suriname;UY:Uruguay;VE:Venezuela",
  "Oceania": "AU:Australia;FJ:Fiji;KI:Kiribati;MH:Marshall Islands;FM:Micronesia;NR:Nauru;NZ:New Zealand;PW:Palau;PG:Papua New Guinea;WS:Samoa;SB:Solomon Islands;TO:Tonga;TV:Tuvalu;VU:Vanuatu",
};
export const countries = Object.entries(countryGroups).flatMap(([region, list]) => list.split(";").map((entry) => { const [code, label] = entry.split(":"); return { code, label, region }; })).sort((a, b) => a.label.localeCompare(b.label));
export const regions = [...new Set(countries.map(({ region }) => region))];

export const indianStates = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"];

export const applicantDeclaration = "I confirm that the information provided in this application is true and complete to the best of my knowledge. I understand that selection of a category, hierarchy or position does not constitute an appointment, offer, partnership, employment, association or professional designation. Any engagement with Astronis Global is subject to assessment, verification of qualifications and experience, applicable professional and regulatory requirements, and formal written confirmation.";
export const applicationSteps = ["Professional Pathway", "Professional Background", "Experience & Location", "CV & Profile", "Review & Declaration"];

export function positionDisplayLabel(position: PositionOption, countryName?: string) {
  return position.dynamicCountry ? position.label.replace("[Country]", countryName || "Select a country") : position.label;
}

export function engagementOptions(category: CategoryCode, position?: PositionOption, internRecruitmentOpen = false) {
  return engagementTypes.filter((item) => {
    if (item.code === "ET-08") return internRecruitmentOpen;
    if (item.code === "ET-05" || item.code === "ET-06") return category === "GN";
    if (item.code === "ET-07") return category === "LA" && Boolean(position?.label.includes("Counsel"));
    return true;
  });
}

export const subdivisionCountryCodes = new Set(["IN", "US", "CA", "AU", "BR", "MX", "AR", "JP", "CN", "DE", "ES", "FR", "IT", "GB", "RU", "ZA", "NG", "PK", "MY", "ID"]);

export function isSeniorReview(position: PositionOption) {
  return Boolean(position.seniorReview) || /Partner|Senior Partner|Global Head|Director|Country Head|Regional Director/.test(position.label);
}
