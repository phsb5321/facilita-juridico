import Button from '@/components/atoms/Button';
import React from 'react';

interface FormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white shadow-md rounded p-8 mb-4">
      {children}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
