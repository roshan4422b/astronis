export const adminEmailAttachmentAccept = ".pdf,.jpg,.jpeg,.doc,.docx";
export const adminEmailAttachmentMaxFiles = 5;
export const adminEmailAttachmentMaxBytes = 4 * 1024 * 1024;
export const adminEmailAttachmentMaxRequestBytes = adminEmailAttachmentMaxBytes + 64 * 1024;

const allowedExtensions = new Set(["pdf", "jpg", "jpeg", "doc", "docx"]);

const attachmentTypes: Record<string, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

function hasExpectedSignature(extension: string, bytes: Uint8Array) {
  if (extension === "pdf") return bytes.length >= 5 && String.fromCharCode(...bytes.slice(0, 5)) === "%PDF-";
  if (extension === "jpg" || extension === "jpeg") return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (extension === "doc") return bytes.length >= 8 && bytes.slice(0, 8).join(",") === "208,207,17,224,161,177,26,225";
  return bytes.length >= 4
    && bytes[0] === 0x50
    && bytes[1] === 0x4b
    && [0x03, 0x05, 0x07].includes(bytes[2])
    && [0x04, 0x06, 0x08].includes(bytes[3]);
}

export function getAdminEmailAttachmentType(extension: string, bytes: Uint8Array) {
  const type = attachmentTypes[extension];
  if (!type || !hasExpectedSignature(extension, bytes)) return null;
  return type;
}

export function validateAdminEmailAttachmentSelection(files: readonly Pick<File, "name" | "size">[]) {
  if (files.length > adminEmailAttachmentMaxFiles) {
    return `Choose no more than ${adminEmailAttachmentMaxFiles} attachments.`;
  }
  if (files.some((file) => !allowedExtensions.has(file.name.split(".").pop()?.toLowerCase() || ""))) {
    return "Only PDF, JPG/JPEG, DOC, or DOCX files can be attached.";
  }
  if (files.some((file) => !Number.isFinite(file.size) || file.size <= 0)) {
    return "Empty files cannot be attached.";
  }
  if (files.reduce((total, file) => total + file.size, 0) > adminEmailAttachmentMaxBytes) {
    return "Attachments must total 4 MB or less.";
  }
  return null;
}
