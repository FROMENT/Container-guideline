import React, { useState, useEffect, useCallback } from 'react';
import { SDLCPhase, GeneratedContentState } from './types.ts';
import { CURRICULUM, EXTERNAL_LINKS } from './constants.ts';
import { generateModuleContent } from './services/geminiService.ts';
import PipelineVisualizer from './components/PipelineVisualizer.tsx';
import { MarkdownRenderer } from './components/MarkdownRenderer.tsx';
import { ChatAssistant } from './components/ChatAssistant.tsx';
import { NetworkDiscovery } from './components/NetworkDiscovery.tsx';
import { ViewCounter } from './components/ViewCounter.tsx';
import { ShieldAlert, Info, Menu, ChevronRight, Lock, Github, ExternalLink, Shield, Box, Server, Activity, ShoppingBag, Coffee, X } from 'lucide-react';

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

  const phaseModules = CURRICULUM.filter(m => m.phase === activePhase);

  const loadContent = useCallback(async (moduleId: string) => {
    if (generatedContent[moduleId]) return;

    setIsLoading(true);
    const module = CURRICULUM.find(m => m.id === moduleId);
    if (module) {
      try {
        const text = await generateModuleContent(module.promptTopic);
        setGeneratedContent(prev => ({
          ...prev,
          [moduleId]: text
        }));
      } catch (error) {
        console.error("Failed to load module content:", error);
      }
    }
    setIsLoading(false);
  }, [generatedContent]);

  useEffect(() => {
    loadContent(activeModuleId);
  }, [activeModuleId, loadContent]);

  const handlePhaseChange = (phase: SDLCPhase) => {
    setActivePhase(phase);
    const firstModule = CURRICULUM.find(m => m.phase === phase);
    if (firstModule) {
      setActiveModuleId(firstModule.id);
    }
  };

  const currentModule = CURRICULUM.find(m => m.id === activeModuleId);
  const ActiveIcon = ICONS[activePhase] || Info;

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col text-gray-200 font-sans">
      
      {/* Navbar */}
      <header className="bg-rh-black border-b border-gray-800 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-rh-red to-red-900 p-1.5 rounded-lg shadow-inner">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight leading-none">
                  WetAndSea<span className="text-rh-red">.AI</span>
                </h1>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Security Engineering</p>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              
              {/* External Commercial Links */}
              <div className="flex items-center gap-3 border-r border-gray-700 pr-6 mr-2">
                 <a href={EXTERNAL_LINKS.ETSY} target="_blank" rel="noopener" className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 hover:bg-orange-900/30 border border-gray-700 hover:border-orange-500 transition-all">
                    <ShoppingBag className="w-4 h-4 text-orange-400 group-hover:text-orange-300" />
                    <span className="text-xs font-medium text-gray-300 group-hover:text-white">Shop</span>
                 </a>
                 <a href={EXTERNAL_LINKS.KOFI} target="_blank" rel="noopener" className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 hover:bg-pink-900/30 border border-gray-700 hover:border-pink-500 transition-all">
                    <Coffee className="w-4 h-4 text-pink-400 group-hover:text-pink-300" />
                    <span className="text-xs font-medium text-gray-300 group-hover:text-white">Support</span>
                 </a>
              </div>

              {/* Functional Links */}
              <div className="flex items-center gap-5">
                <a href={EXTERNAL_LINKS.DOCS} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Documentation</a>
                <a 
                  href={EXTERNAL_LINKS.GITHUB}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-dark-bg/95 backdrop-blur-sm md:hidden pt-20 px-6 animate-fade-in-up">
           <div className="space-y-6">
              <div className="flex flex-col gap-4 border-b border-gray-800 pb-6">
                <a href={EXTERNAL_LINKS.ETSY} className="flex items-center gap-3 text-orange-400 font-semibold text-lg">
                  <ShoppingBag className="w-5 h-5" /> Etsy Shop
                </a>
                <a href={EXTERNAL_LINKS.KOFI} className="flex items-center gap-3 text-pink-400 font-semibold text-lg">
                  <Coffee className="w-5 h-5" /> Ko-fi Support
                </a>
              </div>
              <div>
                <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-3">Modules</h4>
                {/* Simplified module list for mobile menu context could go here, 
                    but we rely on the sidebar logic mostly. Just showing generic links. */}
                 <a href={EXTERNAL_LINKS.DOCS} className="block py-2 text-gray-300">Full Documentation</a>
                 <a href={EXTERNAL_LINKS.GITHUB} className="block py-2 text-gray-300">GitHub Repository</a>
              </div>
           </div>
        </div>
      )}

      {/* Network Discovery Bar */}
      <NetworkDiscovery />

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
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rh-red"></span>
              {activePhase} Phase
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
                  Always verify AI-generated security configurations in a non-production environment.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="bg-card-bg rounded-2xl border border-gray-800 overflow-hidden shadow-2xl min-h-[600px] flex flex-col relative">
            
            {/* Module Header */}
            <div className="p-8 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-card-bg relative">
              <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <ActiveIcon className="w-6 h-6 text-rh-red" />
                    </div>
                    <span className="text-sm text-rh-red font-semibold tracking-wider uppercase">
                      {activePhase}
                    </span>
                  </div>
                  {/* View Counter */}
                  {currentModule && <ViewCounter moduleId={currentModule.id} />}
              </div>
              
              {currentModule && (
                <>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {currentModule.title}
                  </h2>
                  <p className="text-gray-400 max-w-2xl">
                    {currentModule.shortDesc}
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