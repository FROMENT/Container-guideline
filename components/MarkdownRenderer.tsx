import React from 'react';
import { GLOSSARY } from '../constants.ts';
import { GlossaryTooltip } from './GlossaryTooltip.tsx';

interface Props {
  content: string;
}

// A lightweight markdown renderer to avoid heavy dependencies for this demo.
export const MarkdownRenderer: React.FC<Props> = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let listBuffer: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    // Code Blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        elements.push(
          <div key={`code-${index}`} className="my-4 bg-gray-900 rounded-lg p-4 overflow-x-auto border border-gray-700">
            <pre className="text-sm font-mono text-green-400">
              {codeBlockContent.join('\n')}
            </pre>
          </div>
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        // Start of code block
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    // Flush list if line is not a list item
    if (!line.trim().startsWith('- ') && !line.trim().match(/^\d+\./) && listBuffer.length > 0) {
        elements.push(<ul key={`list-${index}`} className="list-disc pl-6 mb-4 space-y-1 text-gray-300">{[...listBuffer]}</ul>);
        listBuffer = [];
    }

    // Headers
    if (line.startsWith('### ')) {
      elements.push(<h3 key={index} className="text-xl font-bold text-white mt-6 mb-3">{parseInline(line.replace('### ', ''))}</h3>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={index} className="text-2xl font-bold text-rh-red mt-8 mb-4 border-b border-gray-700 pb-2">{parseInline(line.replace('## ', ''))}</h2>);
    } else if (line.startsWith('# ')) {
      elements.push(<h1 key={index} className="text-3xl font-bold text-white mt-4 mb-6">{parseInline(line.replace('# ', ''))}</h1>);
    } 
    // Lists
    else if (line.trim().startsWith('- ')) {
       const text = line.trim().substring(2);
       listBuffer.push(<li key={`li-${index}`}>{parseInline(text)}</li>);
    }
    // Paragraphs / Empty lines
    else if (line.trim() === '') {
      // ignore empty lines generally
    } else {
      elements.push(<p key={index} className="mb-3 text-gray-300 leading-relaxed">{parseInline(line)}</p>);
    }
  });
   
  // Flush remaining list
  if (listBuffer.length > 0) {
      elements.push(<ul key={`list-end`} className="list-disc pl-6 mb-4 space-y-1 text-gray-300">{[...listBuffer]}</ul>);
  }

  return <div className="markdown-body">{elements}</div>;
};

// Helper for bold/italic/code/glossary inline
const parseInline = (text: string): React.ReactNode[] => {
  // First split by code blocks and bold to identify "formatted" zones vs "plain" zones
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  
  return parts.map((part, i) => {
    // Check for inline code
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-gray-800 text-yellow-300 px-1 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
    }
    // Check for bold
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }
    
    // If it's plain text, scan for glossary terms
    return processGlossaryTerms(part, i);
  }).flat(); // Flatten the array since processGlossaryTerms returns an array
};

// Helper to inject Tooltips for known glossary terms
const processGlossaryTerms = (text: string, keyPrefix: number): React.ReactNode[] => {
  // Create a regex that matches any of the keys in GLOSSARY, case-insensitive, word boundary
  const terms = Object.keys(GLOSSARY);
  if (terms.length === 0) return [text];

  const regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const upperPart = part.toUpperCase();
    if (GLOSSARY[upperPart]) {
      return (
        <GlossaryTooltip 
          key={`${keyPrefix}-${index}`} 
          term={part} 
          definition={GLOSSARY[upperPart]} 
        />
      );
    }
    return part;
  });
};