// File: FormSection.tsx
import Input from "@/components/atoms/Input";
import Form from "@/components/molecules/Form";
import React from "react";

interface FormSectionProps {
  inputs: Array<{
    name: string;
    value: string;
    placeholder?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormSection: React.FC<FormSectionProps> = ({ inputs, onSubmit }) => {
  return (
    <Form onSubmit={onSubmit}>
      {inputs.map((input) => (
        <Input
          key={input.name}
          name={input.name}
          value={input.value}
          placeholder={input.placeholder}
          onChange={input.onChange}
        />
      ))}
    </Form>
  );
};

export default FormSection;
