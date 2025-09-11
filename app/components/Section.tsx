import React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <section className="my-12 px-4 sm:px-8 lg:px-16">
      <h2 className="text-2xl font-light tracking-wide mb-8 text-center">
        {title}
      </h2>
      <div className="flex flex-wrap gap-4">{children}</div>
    </section>
  );
};

export default Section;
