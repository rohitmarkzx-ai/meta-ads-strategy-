
import React from 'react';

interface ReportSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const ReportSection: React.FC<ReportSectionProps> = ({ title, icon, children }) => (
  <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
    <div className="flex items-center mb-6">
      <span className="bg-indigo-100 text-indigo-600 p-2 rounded-full mr-4">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
      </span>
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
    </div>
    <div className="pl-0 sm:pl-14">
      {children}
    </div>
  </section>
);
