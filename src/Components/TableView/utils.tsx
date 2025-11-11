import { NumberInput, Select, TextInput } from "@mantine/core";
import { ITableViewField } from "./types";
import { UseFormReturnType } from "@mantine/form";

export function renderFormFromSchema<T extends object>(
  schema: ITableViewField<T>[],
  form: UseFormReturnType<T>  
) {
  return schema.map((item) => {
    const fieldKey = item.key as string;

    const key = fieldKey;

    if (item.type === 'none') {
      return <></>;
    }

    if (item.type === 'number') {
      return (
        <NumberInput
          key={key}
          label={item.title}
          placeholder={item.alt}
          {...form.getInputProps(fieldKey)}
        />
      );
    }

    if (item.type === 'select') {
      return (
        <Select
          key={key}
          label={item.title}
          placeholder={item.alt}
          options={item.options ?? []}
          {...form.getInputProps(fieldKey)}
        />
      );
    }
    return (
      <TextInput
        key={key}
        label={item.title}
        placeholder={item.alt}
        {...form.getInputProps(fieldKey)}
      />
    );
  });
}
