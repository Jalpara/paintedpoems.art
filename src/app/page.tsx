import DiarySite from "@/components/DiarySite";
import { getDiaryContent } from "@/lib/diaryAssets";

export const dynamic = "force-dynamic";

export default function Home() {
  const content = getDiaryContent();

  return <DiarySite {...content} />;
}
