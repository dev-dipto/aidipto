import type { ChatMessageItem } from '../../lib/assistant';

interface ChatMessageProps {
  message: ChatMessageItem;
  onSuggestion: (text: string) => void;
}

export function ChatMessage({ message, onSuggestion }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
          isUser
            ? 'rounded-br-md bg-azure text-void'
            : 'rounded-bl-md border border-hairline bg-panel text-mist'
        }`}
      >
        {message.text}
      </div>

      {!isUser && message.suggestions && message.suggestions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {message.suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSuggestion(suggestion)}
              className="rounded-full border border-hairline px-3 py-1 text-[12px] text-muted transition-colors hover:border-azure/50 hover:text-mist"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatMessage;
