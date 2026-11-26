export function getWhatsAppUrl(value?: string | null, message?: string) {
  const phone = value?.trim() || "";
  const international = phone.startsWith("+")
    ? phone.slice(1)
    : phone.startsWith("00")
      ? phone.slice(2)
      : phone;
  if (!international || !/^[\d\s().-]+$/.test(international)) return "";

  const digits = international.replace(/\D/g, "");
  if (!/^[1-9]\d{10,14}$/.test(digits) && !phone.startsWith("+") && !phone.startsWith("00")) return "";
  if (!/^[1-9]\d{7,14}$/.test(digits)) return "";
  const text = message?.trim();
  const parameters = new URLSearchParams({ phone: digits });
  if (text) parameters.set("text", text);
  return `https://api.whatsapp.com/send?${parameters.toString()}`;
}
