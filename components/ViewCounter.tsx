import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { incrementAndGetViews } from '../services/supabaseService.ts';

interface Props {
  moduleId: string;
}

export const ViewCounter: React.FC<Props> = ({ moduleId }) => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    
    incrementAndGetViews(moduleId).then((val) => {
      if (mounted) {
        setCount(val);
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, [moduleId]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 bg-gray-900 rounded-full border border-gray-800">
        <div className="w-4 h-4 bg-gray-700 rounded-full animate-pulse" />
        <div className="w-8 h-3 bg-gray-700 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-gray-900 rounded-full border border-gray-700 text-gray-400 text-xs font-mono" title="Unique Views">
      <Eye className="w-3 h-3" />
      <span>{count !== null ? count.toLocaleString() : 'N/A'}</span>
    </div>
  );
};