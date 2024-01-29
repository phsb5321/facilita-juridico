import React from "react";

type PageTemplateProps = {
  header: React.ReactNode;
  content: React.ReactNode;
};

const PageTemplate: React.FC<PageTemplateProps> = ({ header, content }) => {
  return (
    <div className="container mx-auto mb-2 py-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="text-center mb-2">
          <div className="max-w-xl mx-auto">
            <header className="text-center mb-4 mt-4">{header}</header>
          </div>
        </header>
        <main className="px-4 sm:px-6 lg:px-8">{content}</main>
      </div>
    </div>
  );
};

export default PageTemplate;
