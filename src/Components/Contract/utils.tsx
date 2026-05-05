import { IContract } from "@/src/lib/module/contracts";

export function getCustomFieldValue(data: IContract, field: keyof IContract) {
    switch (field) {
        default: {
            return data[field]?.toLocaleString() || '';
        }
    }
}
