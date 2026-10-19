type PolicySection = {
  title: string;
  paragraphs?: string[];
  clauses?: string[];
  ending?: string;
  contacts?: { text: string }[];
};

type LegalPolicyPdfOptions = {
  title: string;
  metadataLines: string[];
};

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const LEFT = 54;
const RIGHT = 54;
const TOP = 790;
const BOTTOM = 55;
const BODY_SIZE = 9.3;
const BODY_LEADING = 13.2;
const CP1252: Record<string, number> = {
  "€": 0x80, "‚": 0x82, "ƒ": 0x83, "„": 0x84, "…": 0x85, "†": 0x86,
  "‡": 0x87, "ˆ": 0x88, "‰": 0x89, "Š": 0x8a, "‹": 0x8b, "Œ": 0x8c,
  "Ž": 0x8e, "‘": 0x91, "’": 0x92, "“": 0x93, "”": 0x94, "•": 0x95,
  "–": 0x96, "—": 0x97, "˜": 0x98, "™": 0x99, "š": 0x9a, "›": 0x9b,
  "œ": 0x9c, "ž": 0x9e, "Ÿ": 0x9f,
};

function pdfText(value: string) {
  const bytes = Array.from(value, (character) => {
    const code = CP1252[character] ?? character.codePointAt(0) ?? 0x3f;
    const safe = code <= 0xff ? code : 0x3f;
    if (safe === 0x28 || safe === 0x29 || safe === 0x5c) return `\\${String.fromCharCode(safe)}`;
    if (safe < 0x20 || safe > 0x7e) return `\\${safe.toString(8).padStart(3, "0")}`;
    return String.fromCharCode(safe);
  });
  return `(${bytes.join("")})`;
}

function charWidth(character: string) {
  if (" ilI.,:;'!|".includes(character)) return 0.25;
  if ("mwMW@%&".includes(character)) return 0.8;
  if ("frt()[]{}".includes(character)) return 0.33;
  if (character === " ") return 0.28;
  if (/[A-Z0-9]/.test(character)) return 0.61;
  return 0.51;
}

function wrapText(text: string, fontSize: number, maxWidth: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  let width = 0;
  for (const word of words) {
    const wordWidth = Array.from(word).reduce((sum, character) => sum + charWidth(character) * fontSize, 0);
    const spaceWidth = line ? charWidth(" ") * fontSize : 0;
    if (line && width + spaceWidth + wordWidth > maxWidth) {
      lines.push(line);
      line = word;
      width = wordWidth;
    } else {
      line += `${line ? " " : ""}${word}`;
      width += spaceWidth + wordWidth;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function textCommand(text: string, x: number, y: number, size: number, font = "F1", color = "0.20 0.27 0.37") {
  return `BT /${font} ${size} Tf ${color} rg 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm ${pdfText(text)} Tj ET`;
}

export function generateLegalPolicyPdf(sections: PolicySection[], options?: LegalPolicyPdfOptions) {
  const pages: string[][] = [[]];
  let pageIndex = 0;
  let y = TOP;
  const page = () => pages[pageIndex];
  const nextPage = () => {
    pages.push([]);
    pageIndex += 1;
    y = TOP;
  };
  const ensureSpace = (height: number) => {
    if (y - height < BOTTOM) nextPage();
  };
  const drawParagraph = (text: string, x = LEFT, width = PAGE_WIDTH - LEFT - RIGHT, size = BODY_SIZE, leading = BODY_LEADING, color = "0.20 0.27 0.37") => {
    const lines = wrapText(text, size, width);
    for (const line of lines) {
      ensureSpace(leading);
      page().push(textCommand(line, x, y, size, "F1", color));
      y -= leading;
    }
  };

  // First page document header.
  page().push(textCommand("ASTRONIS GLOBAL PRIVATE LIMITED", LEFT, y, 9, "F2", "0.04 0.16 0.35"));
  if (options) {
    y -= 30;
    const titleLines = wrapText(options.title, 15, PAGE_WIDTH - LEFT - RIGHT);
    for (const line of titleLines) {
      page().push(textCommand(line, LEFT, y, 15, "F2", "0.04 0.16 0.35"));
      y -= 18;
    }
    options.metadataLines.forEach((metadataLine) => {
      const metadata = wrapText(metadataLine, 8, PAGE_WIDTH - LEFT - RIGHT);
      for (const line of metadata) {
        page().push(textCommand(line, LEFT, y, 8, "F2", "0.31 0.39 0.52"));
        y -= 11;
      }
    });
  } else {
    y -= 32;
    page().push(textCommand("PRIVACY POLICY", LEFT, y, 20, "F2", "0.04 0.16 0.35"));
    y -= 22;
    page().push(textCommand("WEBSITE: WWW.ASTRONISGLOBAL.COM", LEFT, y, 8, "F2", "0.31 0.39 0.52"));
    page().push(textCommand("EFFECTIVE DATE: 17 OCTOBER 2026", 340, y, 8, "F2", "0.31 0.39 0.52"));
    y -= 13;
  }
  page().push(`0.78 0.83 0.89 RG 0.7 w ${LEFT} ${y.toFixed(2)} m ${PAGE_WIDTH - RIGHT} ${y.toFixed(2)} l S`);
  y -= 22;

  sections.forEach((section, index) => {
    const heading = `${index + 1}. ${section.title}`;
    const headingLines = wrapText(heading, 11.2, PAGE_WIDTH - LEFT - RIGHT);
    ensureSpace(headingLines.length * 14 + BODY_LEADING);
    for (const line of headingLines) {
      page().push(textCommand(line, LEFT, y, 11.2, "F2", "0.04 0.16 0.35"));
      y -= 14;
    }
    y -= 2;

    section.paragraphs?.forEach((paragraph) => {
      drawParagraph(paragraph);
      y -= 5;
    });
    section.clauses?.forEach((clause, clauseIndex) => {
      const label = `${String.fromCharCode(97 + clauseIndex)}.`;
      page().push(textCommand(label, LEFT + 13, y, BODY_SIZE, "F1", "0.04 0.16 0.35"));
      drawParagraph(clause, LEFT + 30, PAGE_WIDTH - LEFT - RIGHT - 30);
      y -= 2;
    });
    section.contacts?.forEach((contact, contactIndex) => {
      const label = `${String.fromCharCode(97 + contactIndex)}.`;
      page().push(textCommand(label, LEFT + 13, y, BODY_SIZE, "F1", "0.04 0.16 0.35"));
      drawParagraph(contact.text, LEFT + 30, PAGE_WIDTH - LEFT - RIGHT - 30);
      y -= 2;
    });
    if (section.ending) {
      drawParagraph(section.ending);
      y -= 5;
    }
    y -= 8;
  });

  // Repeat restrained folio on every page after the total page count is known.
  pages.forEach((commands, index) => {
    commands.push(`0.84 0.87 0.91 RG 0.55 w ${LEFT} 39 m ${PAGE_WIDTH - RIGHT} 39 l S`);
    commands.push(textCommand("ASTRONIS GLOBAL PRIVATE LIMITED  |  WWW.ASTRONISGLOBAL.COM", LEFT, 25, 7, "F1", "0.40 0.46 0.55"));
    const folio = `Page ${index + 1} of ${pages.length}`;
    const folioWidth = wrapText(folio, 7, 100)[0].length * 4;
    commands.push(textCommand(folio, PAGE_WIDTH - RIGHT - folioWidth, 25, 7, "F1", "0.40 0.46 0.55"));
  });

  const objects: Buffer[] = [];
  const addObject = (body: Buffer | string) => {
    objects.push(Buffer.isBuffer(body) ? body : Buffer.from(body, "ascii"));
    return objects.length;
  };
  addObject("<< /Type /Catalog /Pages 2 0 R >>");
  addObject("PAGES_PLACEHOLDER");
  addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
  addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");

  const pageIds: number[] = [];
  pages.forEach((commands) => {
    const content = Buffer.from(commands.join("\n"), "ascii");
    const contentId = objects.length + 2;
    const pageId = contentId - 1;
    pageIds.push(pageId);
    addObject(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`);
    addObject(Buffer.concat([Buffer.from(`<< /Length ${content.length} >>\nstream\n`, "ascii"), content, Buffer.from("\nendstream", "ascii")]));
  });
  objects[1] = Buffer.from(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`, "ascii");

  const chunks = [Buffer.from("%PDF-1.4\n", "ascii")];
  const offsets = [0];
  let position = chunks[0].length;
  objects.forEach((object, index) => {
    offsets.push(position);
    const wrapped = Buffer.concat([
      Buffer.from(`${index + 1} 0 obj\n`, "ascii"),
      object,
      Buffer.from("\nendobj\n", "ascii"),
    ]);
    chunks.push(wrapped);
    position += wrapped.length;
  });
  const xrefOffset = position;
  const xref = [`xref\n0 ${objects.length + 1}\n`, "0000000000 65535 f \n"];
  for (let index = 1; index <= objects.length; index += 1) xref.push(`${offsets[index].toString().padStart(10, "0")} 00000 n \n`);
  xref.push(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);
  chunks.push(Buffer.from(xref.join(""), "ascii"));
  return Buffer.concat(chunks);
}
