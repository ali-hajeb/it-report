import { UserRole } from "@/src/lib/module/user";


export interface SelectOption {
  value: string;
  label: string;
}

export interface IBaseModelObject {
    _id: string;
}

export interface ITableViewField<T extends object> {
  /** Key from the MongoDB model schema */
  key: keyof T;

  /** Input type: 'text' | 'number' | 'select' */
  type: 'text' | 'number' | 'select' | 'none';

  /** Label for the field */
  title: string;

  /** Description or helper text */
  alt: string;

    /** Field visibility to different user-levels **/
    role?: UserRole;

  options?: SelectOption[];
}
