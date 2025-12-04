import { Checkbox, NumberInput, PasswordInput, Select, TagsInput, TextInput } from "@mantine/core";
import { ITableViewField } from "./types";
import { UseFormReturnType } from "@mantine/form";
import React from "react";

export function renderFormFromSchema<T extends object, U extends object>(
  schema: ITableViewField<T>[],
  form: UseFormReturnType<U>  
) {
  return schema.map((item) => {
    const fieldKey = item.key as string;

    const key = fieldKey;

    if (item.type === 'none') {
      return <React.Fragment key={key}></React.Fragment>;
    }

    if (item.type === 'tags') {
      return (
        <TagsInput
          key={key}
          label={item.title}
          placeholder={item.alt}
          {...form.getInputProps(fieldKey)}
        />
      );
    }

    if (item.type === 'check') {
      return (
        <Checkbox
          key={key}
          label={item.title}
          {...form.getInputProps(fieldKey, { type: 'checkbox' })}
            
        />
      );
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

    if (item.type === 'password') {
      return (
        <PasswordInput
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
          data={item.options ?? []}
          searchable
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
