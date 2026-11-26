import assert from "node:assert/strict";
import test from "node:test";
import {
  adminEmailAttachmentMaxBytes,
  getAdminEmailAttachmentType,
  validateAdminEmailAttachmentSelection,
} from "../src/lib/admin/email-attachments.ts";

test("allows only supported attachments within the count and total-size limits", () => {
  assert.equal(validateAdminEmailAttachmentSelection([{ name: "reply.docx", size: 12 }]), null);
  assert.match(validateAdminEmailAttachmentSelection([{ name: "script.exe", size: 12 }]), /Only PDF/);
  assert.match(validateAdminEmailAttachmentSelection([{ name: "large.pdf", size: adminEmailAttachmentMaxBytes + 1 }]), /4 MB/);
  assert.match(validateAdminEmailAttachmentSelection(Array.from({ length: 6 }, (_, index) => ({ name: `${index}.jpg`, size: 1 }))), /no more than 5/);
});

test("checks file signatures and returns safe attachment content types", () => {
  assert.equal(getAdminEmailAttachmentType("pdf", Uint8Array.from([0x25, 0x50, 0x44, 0x46, 0x2d])), "application/pdf");
  assert.equal(getAdminEmailAttachmentType("jpg", Uint8Array.from([0xff, 0xd8, 0xff])), "image/jpeg");
  assert.equal(getAdminEmailAttachmentType("doc", Uint8Array.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])), "application/msword");
  assert.equal(
    getAdminEmailAttachmentType("docx", Uint8Array.from([0x50, 0x4b, 0x03, 0x04])),
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  );
  assert.equal(getAdminEmailAttachmentType("pdf", Uint8Array.from([0xff, 0xd8, 0xff])), null);
  assert.equal(getAdminEmailAttachmentType("exe", Uint8Array.from([0x50, 0x4b, 0x03, 0x04])), null);
});
