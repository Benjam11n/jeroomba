function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function stripMarkdownLinePrefix(line: string) {
  return line
    .replace(/^\s{0,3}>\s?/, "")
    .replace(/^\s{0,3}(#{1,6})\s+/, "")
    .replace(/^\s{0,3}([-*+] |\d+\.\s+)/, "");
}

function extractInlinePlainText(line: string) {
  let output = "";
  let index = 0;

  while (index < line.length) {
    const char = line[index];

    if (char === "!" && line[index + 1] === "[") {
      const closeBracket = line.indexOf("]", index + 2);
      const openParen = line.indexOf("(", closeBracket + 1);
      const closeParen = line.indexOf(")", openParen + 1);

      if (
        closeBracket > -1 &&
        openParen === closeBracket + 1 &&
        closeParen > -1
      ) {
        output += line.slice(index + 2, closeBracket);
        index = closeParen + 1;
        continue;
      }
    }

    if (char === "[") {
      const closeBracket = line.indexOf("]", index + 1);
      const openParen = line.indexOf("(", closeBracket + 1);
      const closeParen = line.indexOf(")", openParen + 1);

      if (
        closeBracket > -1 &&
        openParen === closeBracket + 1 &&
        closeParen > -1
      ) {
        output += line.slice(index + 1, closeBracket);
        index = closeParen + 1;
        continue;
      }
    }

    if (char === "`" || char === "*" || char === "_" || char === "~") {
      index += 1;
      continue;
    }

    output += char;
    index += 1;
  }

  return output;
}

export function createExcerpt(content: string, maxLength = 170) {
  const lines = content.split("\n");
  const extracted: string[] = [];
  let inCodeFence = false;

  for (const rawLine of lines) {
    const trimmedLine = rawLine.trim();

    if (trimmedLine.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) {
      continue;
    }

    const noPrefix = stripMarkdownLinePrefix(rawLine);
    const plainTextLine = normalizeWhitespace(extractInlinePlainText(noPrefix));

    if (!plainTextLine) {
      continue;
    }

    extracted.push(plainTextLine);
  }

  return normalizeWhitespace(extracted.join(" ")).slice(0, maxLength);
}
