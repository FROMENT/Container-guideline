import React from 'react';
import { PROJECT_ECOSYSTEM } from '../constants.ts';
import { Shield, Sword, Compass, Box, ExternalLink } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  'Sword': Sword,
  'Shield': Shield,
  'Compass': Compass,
  'Container': Box
};

export const NetworkDiscovery: React.FC = () => {
  return (
    <div className="bg-rh-black border-y border-gray-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
          Network Discovery // WetAndSea Ecosystem
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECT_ECOSYSTEM.map((project) => {
            const Icon = ICON_MAP[project.iconName] || Box;
            return (
              <a 
                key={project.name}
                href={project.url}
                target={project.current ? '_self' : '_blank'}
                rel="noreferrer"
                className={`
                  group block p-4 rounded-xl border transition-all duration-300
                  ${project.current 
                    ? 'bg-gray-800 border-rh-red cursor-default' 
                    : 'bg-card-bg border-gray-700 hover:border-blue-400 hover:bg-gray-800'}
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${project.current ? 'bg-rh-red/20 text-rh-red' : 'bg-gray-700/50 text-gray-400 group-hover:text-blue-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {!project.current && <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />}
                </div>
                <h5 className={`font-bold ${project.current ? 'text-white' : 'text-gray-200 group-hover:text-blue-300'}`}>
                  {project.name}
                </h5>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {project.desc}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};