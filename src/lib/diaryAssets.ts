import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fallbackDiaryDays, featuredPaintings } from "@/data/diary";
import type { DiaryDay, DiaryImage, Painting } from "@/data/diary";

const publicRoot = path.join(process.cwd(), "public");

const fallbackLocations = [
  "Ethiopia Transit",
  "Cordoba",
  "Ubeda",
  "Ubeda",
  "Ubeda",
  "Exhibition Setup",
  "Ubeda",
  "Ubeda",
  "Monastery",
  "Exhibition",
  "Jaen",
  "Closing Exhibition",
  "Castle Day",
  "Fontiveros",
  "Fontiveros",
  "Alba de Tormes",
  "Alba de Tormes",
  "Carmus Museum"
];

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);
const videoExtensions = new Set([".mp4", ".mov", ".webm"]);
const monthOrder = new Map([
  ["january", 0],
  ["february", 1],
  ["march", 2],
  ["april", 3],
  ["may", 4],
  ["june", 5],
  ["july", 6],
  ["august", 7],
  ["september", 8],
  ["october", 9],
  ["november", 10],
  ["december", 11]
]);

function parseDayFolder(folderName: string) {
  const match = folderName.match(/^(\d+)(?:st|nd|rd|th)\s+([A-Za-z]+)$/);
  if (!match) {
    return null;
  }

  const month = monthOrder.get(match[2].toLowerCase());
  if (month === undefined) {
    return null;
  }

  return {
    day: Number.parseInt(match[1], 10),
    month
  };
}

function getDayFolders() {
  return readdirSync(publicRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((folderName) => parseDayFolder(folderName) !== null)
    .sort((a, b) => {
      const first = parseDayFolder(a);
      const second = parseDayFolder(b);

      if (!first || !second) {
        return a.localeCompare(b);
      }

      return first.month - second.month || first.day - second.day;
    });
}

function publicPath(filePath: string) {
  const relativePath = path.relative(publicRoot, filePath);
  return `/${relativePath.split(path.sep).map(encodeURIComponent).join("/")}`;
}

function titleFromFilename(filename: string) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/^(\d+_)?Text_?/i, "")
    .replace(/^WhatsApp Image \d{4}-\d{2}-\d{2} at /i, "")
    .replace(/\s*\(\d+\)$/g, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripRtf(input: string) {
  return input
    .replace(/\\\n/g, "\n")
    .replace(/\\'[0-9a-fA-F]{2}/g, (match) => String.fromCharCode(Number.parseInt(match.slice(2), 16)))
    .replace(/\\u(-?\d+)\??/g, (_, code: string) => {
      const value = Number.parseInt(code, 10);
      return String.fromCharCode(value < 0 ? value + 65536 : value);
    })
    .replace(/\{\\(?:fonttbl|colortbl|stylesheet|info)[\s\S]*?\}/g, "")
    .replace(/\\par\b/g, "\n")
    .replace(/\\line/g, "\n")
    .replace(/\\tab/g, " ")
    .replace(/\\\*/g, "")
    .replace(/[{}]/g, "")
    .replace(/\\[a-zA-Z]+-?\d* ?/g, "")
    .replace(/\\./g, "")
    .replace(/^(?:;|\s)*\n+/i, "")
    .replace(/^(?:rtf|ansi|ansicpg|cocoartf|cocoatextscaling|cocoaplatform|paperw|paperh|margl|margr|vieww|viewh|viewkind|pardirnatural|partightenfactor|fcharset|fswiss|froman|fmodern|fnil|ftech|fbidi|red|green|blue)\d*[\s;]*/i, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

function readText(filePath: string) {
  return stripRtf(readFileSync(filePath, "utf8"));
}

function readFolderFiles(folderName: string) {
  const folderPath = path.join(publicRoot, folderName);
  if (!existsSync(folderPath)) {
    return [];
  }

  return readdirSync(folderPath)
    .filter((file) => !file.startsWith("."))
    .map((file) => path.join(folderPath, file))
    .sort((a, b) => path.basename(a).localeCompare(path.basename(b), undefined, { numeric: true }));
}

function buildImages(folderName: string): DiaryImage[] {
  return readFolderFiles(folderName)
    .filter((file) => imageExtensions.has(path.extname(file).toLowerCase()))
    .map((file) => {
      const title = titleFromFilename(file);
      return {
        src: publicPath(file),
        alt: `${folderName} - ${title || "diary image"}`,
        caption: title || folderName
      };
    });
}

function buildTexts(folderName: string) {
  return readFolderFiles(folderName)
    .filter((file) => path.extname(file).toLowerCase() === ".rtf")
    .map(readText)
    .filter(Boolean);
}

function buildSummary(texts: string[], fallback: string) {
  const firstText = texts[0] ?? fallback;
  return firstText.split(/\n+/).find((line) => line.trim().length > 20)?.trim() ?? fallback;
}

function buildTitle(folderName: string, texts: string[], images: DiaryImage[]) {
  const namedImage = images.find((image) => !/^\d{1,2}\.\d{2}\.\d{2}/.test(image.caption) && !/^WhatsApp/i.test(image.caption));
  const firstTextLine = texts.flatMap((text) => text.split(/\n+/)).find((line) => line.trim().length > 8);
  return namedImage?.caption || firstTextLine?.slice(0, 58) || `${folderName} Diary`;
}

function folderDate(folderName: string) {
  return folderName;
}

function buildPaintings(): Painting[] {
  const paintings = buildImages("Paintings");

  if (paintings.length === 0) {
    return featuredPaintings;
  }

  return paintings.map((image, index) => ({
    title: image.caption || `Spain Painting ${index + 1}`,
    year: "2026",
    medium: "Painting exhibited in Spain",
    image
  }));
}

export function getDiaryContent() {
  const paintings = buildPaintings();
  const dayFolders = getDayFolders();
  const days: DiaryDay[] = dayFolders.map((folderName, index) => {
    const fallback = fallbackDiaryDays[index] ?? fallbackDiaryDays[fallbackDiaryDays.length - 1];
    const texts = buildTexts(folderName);
    const images = buildImages(folderName);
    const dayPaintings =
      images.some((image) => /paint|exhibition|gallery|label/i.test(image.caption)) && paintings.length > 0
        ? paintings.slice(0, Math.min(3, paintings.length))
        : [];

    return {
      day: index + 1,
      date: folderDate(folderName),
      location: fallbackLocations[index] ?? fallback.location,
      title: buildTitle(folderName, texts, images),
      summary: buildSummary(texts, fallback.summary),
      story: texts.length > 0 ? texts : fallback.story,
      people: fallback.people,
      places: [fallbackLocations[index] ?? fallback.location],
      activities: ["Diary note", `${images.length} images`, `${texts.length} text entries`],
      paintings: dayPaintings,
      images: images.length > 0 ? images : fallback.images
    };
  });

  return {
    diaryDays: days,
    featuredPaintings: paintings,
    pressImages: buildImages("Press"),
    posterImages: buildImages("Posters"),
    pressVideos: readFolderFiles("Press")
      .filter((file) => videoExtensions.has(path.extname(file).toLowerCase()))
      .map(publicPath)
  };
}
