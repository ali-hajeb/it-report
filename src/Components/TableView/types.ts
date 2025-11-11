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

  /** Only required when type is 'select' */
  options?: this['type'] extends 'select' ? SelectOption[] : never;
}
