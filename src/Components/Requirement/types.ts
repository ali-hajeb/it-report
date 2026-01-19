import { RequirementStatus } from "@/src/lib/module/requirement";

export interface RequirementForm {
    location: string;
    unit: string;
    user: string;
    requirement: string;
    desc: string;
    count: string;
    note: string;
    status: RequirementStatus | null;
}
