import resumeData from "@/data/resume.json";
import type { Resume } from "@/types/resume";

export function useResume(): Resume {
  return resumeData as Resume;
}
