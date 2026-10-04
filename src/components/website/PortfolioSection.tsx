import React, { useState } from 'react';
import { SiteConfig, ProjectItem } from '../../types';
import { ArrowUpRight, CheckCircle } from 'lucide-react';

interface PortfolioSectionProps {
  config: SiteConfig;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ config }) => {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  if (!config.projects || config.projects.length === 0) return null;

  return (
    <section id="portfolio" className="py-16 sm:py-20 bg-neutral-50/50 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              {config.portfolioTitle}
            </h2>
            <p className="mt-2 text-base text-neutral-600">
              {config.portfolioSubtitle}
            </p>
          </div>
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            {config.projects.length} {config.lang === 'bn' ? 'টি নির্বাচিত প্রকল্প' : 'Featured Cases'}
          </span>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {config.projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-xl border border-neutral-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Project Image */}
              <div className="relative aspect-16/10 bg-neutral-100 overflow-hidden border-b border-neutral-200/70">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                {/* Metric Overlay */}
                <div className="absolute top-3 right-3 px-3 py-1 bg-neutral-900/90 backdrop-blur-sm text-white text-xs font-semibold rounded-md shadow-sm">
                  {project.metric}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category unboxed */}
                  <div className="text-xs font-semibold text-neutral-500 mb-1.5 uppercase tracking-wide">
                    {project.category}
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    {config.lang === 'bn' ? 'যাচাইকৃত কেস স্টাডি' : 'Verified Outcome'}
                  </span>

                  <button
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-neutral-700 transition-colors"
                  >
                    <span>{project.linkText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-200">
              <div className="aspect-16/9 rounded-lg overflow-hidden mb-4 bg-neutral-100">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                {activeProject.category}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mt-1">
                {activeProject.title}
              </h3>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                {activeProject.description}
              </p>

              <div className="mt-4 p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between text-xs">
                <span className="text-neutral-600 font-medium">
                  {config.lang === 'bn' ? 'পরিমাপযোগ্য ফলাফল:' : 'Measured Result:'}
                </span>
                <span className="font-bold text-neutral-900">
                  {activeProject.metric}
                </span>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
                >
                  {config.lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
                </button>
                <a
                  href="#contact"
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{config.lang === 'bn' ? 'অনুরূপ সাইট বানান' : 'Build Similar Site'}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
