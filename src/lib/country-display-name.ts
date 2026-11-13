const countryDisplayNameOverrides: Readonly<Record<string, string>> = {
  cd: "Congo (DRC)",
  cg: "Congo (Republic)",
  mk: "Macedonia (FYROM)",
  mm: "Myanmar (Burma)",
};

export function getCountryDisplayName(name: string, iso2: string): string {
  return countryDisplayNameOverrides[iso2.toLowerCase()] ?? name.split(" (", 1)[0].trim();
}
