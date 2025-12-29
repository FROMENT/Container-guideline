import React, { useState, useEffect } from 'react';
import { SDLCPhase, ModuleItem, GeneratedContentState } from './types.ts';
import { CURRICULUM } from './constants.ts';
import { generateModuleContent } from './services/geminiService.ts';
import PipelineVisualizer from './components/PipelineVisualizer.tsx';
import { MarkdownRenderer } from './components/MarkdownRenderer.tsx';
import { ChatAssistant } from './components/ChatAssistant.tsx';
import { ShieldAlert, Info, Menu, ChevronRight, Lock, Github, ExternalLink, Shield, Box, Server, Activity } from 'lucide-react';

const ICONS = {
  [SDLCPhase.DESIGN]: Shield,
  [SDLCPhase.BUILD]: Box,
  [SDLCPhase.DEPLOY]: Server,
  [SDLCPhase.RUNTIME]: Activity
};

const App: React.FC = () => {
  const [activePhase, setActivePhase] = useState<SDLCPhase>(SDLCPhase.DESIGN);
  const [activeModuleId, setActiveModuleId] = useState<string>(CURRICULUM[0].id);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContentState>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter modules by active phase
  const phaseModules = CURRICULUM.filter(m => m.phase === activePhase);

  // Load content when module changes
  useEffect(() => {
    const loadContent = async () => {
      // Return if already cached (check for undefined to handle empty strings if they occurred)
      if (generatedContent[activeModuleId] !== undefined) return;

      setIsLoading(true);
      const module = CURRICULUM.find(m => m.id === activeModuleId);
      if (module) {
        try {
          const text = await generateModuleContent(module.promptTopic);
          setGeneratedContent(prev => ({
            ...prev,
            [activeModuleId]: text
          }));
        } catch (error) {
          console.error("Content load failed", error);
        }
      }
      setIsLoading(false);
    };

    loadContent();
  }, [activeModuleId, generatedContent]);

  // Handle phase change
  const handlePhaseChange = (phase: SDLCPhase) => {
    setActivePhase(phase);
    // Find first module of this phase
    const firstModule = CURRICULUM.find(m => m.phase === phase);
    if (firstModule) {
      setActiveModuleId(firstModule.id);
    }
  };

  const ActiveIcon = ICONS[activePhase] || Info;

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col text-gray-200">
      
      {/* Navbar */}
      <header className="bg-rh-black border-b border-gray-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-rh-red p-1.5 rounded">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  OpenShift <span className="text-red-500">Secure</span>
                </h1>
                <p className="text-xs text-gray-400 -mt-1">SDLC & Container Security</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <span className="text-sm text-gray-400 bg-gray-900 px-3 py-1 rounded-full border border-gray-700">
                AI-Powered Guide
              </span>
              
              <div className="flex items-center gap-6 border-l border-gray-700 pl-6">
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  title="Live Deployment Placeholder"
                  onClick={(e) => e.preventDefault()}
                >
                  <ExternalLink className="w-5 h-5" />
                  <span className="text-sm font-medium">Live Demo</span>
                </a>

                <a 
                  href="https://github.com/openshift/secure-sdlc-guide" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span className="text-sm font-medium">v1.1.0</span>
                </a>
              </div>
            </div>

            <button 
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Pipeline Visualization */}
      <PipelineVisualizer 
        currentPhase={activePhase} 
        onSelectPhase={handlePhaseChange} 
      />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar / Module List */}
        <aside className={`
            md:w-64 flex-shrink-0 
            ${mobileMenuOpen ? 'block' : 'hidden'} md:block
          `}>
          <div className="sticky top-24">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              {activePhase} Modules
            </h3>
            <div className="space-y-2">
              {phaseModules.map(module => (
                <button
                  key={module.id}
                  onClick={() => {
                    setActiveModuleId(module.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group
                    ${activeModuleId === module.id 
                      ? 'bg-gray-800 text-white border-l-4 border-rh-red shadow-md' 
                      : 'hover:bg-gray-800/50 text-gray-400 hover:text-gray-200'}
                  `}
                >
                  <span className="text-sm font-medium">{module.title}</span>
                  {activeModuleId === module.id && <ChevronRight className="w-4 h-4 text-rh-red" />}
                </button>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gray-900 rounded-xl border border-gray-800">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-yellow-500 mt-0.5" />
                <p className="text-xs text-gray-400 leading-relaxed">
                  Always verify AI-generated security configurations in a non-production environment before deploying.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="bg-card-bg rounded-2xl border border-gray-800 overflow-hidden shadow-2xl min-h-[600px] flex flex-col">
            
            {/* Module Header */}
            <div className="p-8 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-card-bg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <ActiveIcon className="w-6 h-6 text-rh-red" />
                </div>
                <span className="text-sm text-rh-red font-semibold tracking-wider uppercase">
                  {activePhase}
                </span>
              </div>
              
              {CURRICULUM.find(m => m.id === activeModuleId) && (
                <>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {CURRICULUM.find(m => m.id === activeModuleId)?.title}
                  </h2>
                  <p className="text-gray-400 max-w-2xl">
                    {CURRICULUM.find(m => m.id === activeModuleId)?.shortDesc}
                  </p>
                </>
              )}
            </div>

            {/* Content Body */}
            <div className="p-8 flex-1">
              {isLoading ? (
                 <div className="space-y-6 animate-pulse">
                   <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                   <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                   <div className="h-32 bg-gray-800 rounded w-full"></div>
                   <div className="h-4 bg-gray-800 rounded w-2/3"></div>
                 </div>
              ) : (
                <MarkdownRenderer content={generatedContent[activeModuleId] || ''} />
              )}
            </div>
          </div>
        </main>
      </div>

      <ChatAssistant />
    </div>
  );
};

export default App;