export enum SDLCPhase {
  DESIGN = 'Design & Base Images',
  BUILD = 'Build & Registry',
  DEPLOY = 'Deployment & Config',
  RUNTIME = 'Runtime & Monitoring'
}

export interface ModuleItem {
  id: string;
  title: string;
  phase: SDLCPhase;
  shortDesc: string;
  promptTopic: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface GeneratedContentState {
  [moduleId: string]: string;
}
