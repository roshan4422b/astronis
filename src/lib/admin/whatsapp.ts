export function getWhatsAppUrl(value?: string | null) {
  const phone = value?.trim() || "";
  const international = phone.startsWith("+")
    ? phone.slice(1)
    : phone.startsWith("00")
      ? phone.slice(2)
      : "";
  if (!international || !/^[\d\s().-]+$/.test(international)) return "";

  const digits = international.replace(/\D/g, "");
  return /^[1-9]\d{7,14}$/.test(digits) ? `https://wa.me/${digits}` : "";
}
