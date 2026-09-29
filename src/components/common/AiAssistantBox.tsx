import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface AiAssistantBoxProps {
  title: string;
  recommendation: string;
  reasoning: string[];
  suggestedActions?: { label: string; onClick: () => void; isPrimary?: boolean }[];
  defaultExpanded?: boolean;
  className?: string;
  badgeLabel?: string;
}

export const AiAssistantBox: React.FC<AiAssistantBoxProps> = ({
  title,
  recommendation,
  reasoning,
  suggestedActions = [],
  defaultExpanded = true,
  className = '',
  badgeLabel = 'AI-assisted recommendation'
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`bg-[#F4F8FA] border border-[#B9D5E8] rounded p-4 text-[#17212B] ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 p-1 bg-[#123B63] text-white rounded">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#123B63] bg-[#E1EEF6] px-2 py-0.5 rounded border border-[#BAD5E6]">
                {badgeLabel}
              </span>
              <span className="text-xs text-[#66727E]">Decision Authority: Government Officer</span>
            </div>
            <h4 className="text-sm font-semibold text-[#123B63] mt-1">{title}</h4>
          </div>
        </div>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#2F6F95] hover:text-[#123B63] text-xs font-medium flex items-center gap-1 focus:outline-none"
        >
          {isExpanded ? (
            <>Hide Analysis <ChevronUp className="w-3.5 h-3.5" /></>
          ) : (
            <>View Analysis <ChevronDown className="w-3.5 h-3.5" /></>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-[#D0E2EE] text-xs space-y-2.5">
          <div className="bg-white p-3 rounded border border-[#D0E2EE]">
            <span className="font-semibold text-[#123B63] block mb-1">Synthesized Recommendation:</span>
            <p className="text-[#17212B] leading-relaxed">{recommendation}</p>
          </div>

          <div>
            <span className="font-semibold text-[#485968] uppercase text-[11px] tracking-wide block mb-1.5">
              Supporting Factors & Empirical Rationale:
            </span>
            <ul className="space-y-1.5 pl-1">
              {reasoning.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[#334155]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#287D4A] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 pt-1 text-[11px] text-[#66727E]">
            <AlertCircle className="w-3.5 h-3.5 text-[#A66A00]" />
            <span>Advisory output only. Verification by departmental technical officer is mandatory before official procurement action.</span>
          </div>

          {suggestedActions.length > 0 && (
            <div className="pt-2 flex flex-wrap gap-2">
              {suggestedActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.onClick}
                  className={`text-xs px-3 py-1.5 rounded font-medium transition-colors ${
                    action.isPrimary 
                      ? 'bg-[#123B63] text-white hover:bg-[#0D2A47]' 
                      : 'bg-white border border-[#B9D5E8] text-[#123B63] hover:bg-[#EAF2F8]'
                  }`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
