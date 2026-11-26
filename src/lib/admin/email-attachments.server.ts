import type { Attachment } from "mailtrap";
import {
  getAdminEmailAttachmentType,
  validateAdminEmailAttachmentSelection,
} from "./email-attachments";

export async function parseAdminEmailAttachments(formData: FormData): Promise<
  { ok: true; attachments: Attachment[] } | { ok: false; error: string }
> {
  const entries = formData.getAll("attachments");
  if (entries.length === 0) return { ok: true, attachments: [] };
  const files: File[] = [];
  for (const entry of entries) {
    if (!(entry instanceof File)) return { ok: false, error: "Each attachment must be a file." };
    files.push(entry);
  }

  const selectionError = validateAdminEmailAttachmentSelection(files);
  if (selectionError) return { ok: false, error: selectionError };

  const attachments: Attachment[] = [];
  for (const file of files) {
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    let bytes: Uint8Array;
    try {
      bytes = new Uint8Array(await file.arrayBuffer());
    } catch {
      return { ok: false, error: `The file could not be read: ${file.name}.` };
    }
    const type = getAdminEmailAttachmentType(extension, bytes);
    if (!type) {
      return { ok: false, error: `The file content does not match ${file.name}.` };
    }

    const filename = file.name.replace(/[\\/\u0000-\u001f\u007f]/g, "_").trim().slice(0, 180) || `attachment.${extension}`;
    attachments.push({
      filename,
      type,
      content: Buffer.from(bytes),
    });
  }

  return { ok: true, attachments };
}
