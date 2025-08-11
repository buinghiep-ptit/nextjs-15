import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Author } from "@/types/post.type";

interface MentionSuggestion extends Author {
  id: string;
}

interface ReplyInputEnhancedProps {
  currentUser: Author;
  replyToUser?: Author;
  placeholder?: string;
  onSubmit: (content: string, mentions: Author[]) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  className?: string;
  availableUsers?: MentionSuggestion[]; // Danh sách users có thể mention
  postId?: string;
  parentType?: "post" | "comment" | "reply";
}

export function ReplyInputEnhanced({
  currentUser,
  replyToUser,
  placeholder = "Viết bình luận...",
  onSubmit,
  onCancel,
  isSubmitting = false,
  className = "",
  availableUsers = [],
  postId,
  parentType = "post",
}: ReplyInputEnhancedProps) {
  const [content, setContent] = useState("");
  const [mentions, setMentions] = useState<Author[]>(
    replyToUser ? [replyToUser] : []
  );
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [mentionPosition, setMentionPosition] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState<MentionSuggestion[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mentionListRef = useRef<HTMLDivElement>(null);

  // Auto-focus và set initial content với mention
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();

      if (replyToUser) {
        const initialContent = `@${replyToUser.name} `;
        setContent(initialContent);
        // Set cursor position sau mention
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.setSelectionRange(
              initialContent.length,
              initialContent.length
            );
          }
        }, 0);
      }
    }
  }, [replyToUser]);

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  // Filter users for mention suggestions
  useEffect(() => {
    if (mentionQuery.length > 0) {
      const filtered = availableUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(mentionQuery.toLowerCase()) &&
          !mentions.some((mention) => mention.name === user.name)
      );
      setFilteredUsers(filtered.slice(0, 5)); // Limit to 5 suggestions
    } else {
      setFilteredUsers([]);
    }
  }, [mentionQuery, availableUsers, mentions]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    const cursorPosition = e.target.selectionStart;

    setContent(newContent);

    // Detect @ mention
    const beforeCursor = newContent.substring(0, cursorPosition);
    const mentionMatch = beforeCursor.match(/@(\w*)$/);

    if (mentionMatch) {
      setShowMentions(true);
      setMentionQuery(mentionMatch[1]);
      setMentionPosition(cursorPosition - mentionMatch[1].length - 1);
    } else {
      setShowMentions(false);
      setMentionQuery("");
    }
  };

  const handleMentionSelect = (user: MentionSuggestion) => {
    const beforeMention = content.substring(0, mentionPosition);
    const afterCursor = content.substring(
      textareaRef.current?.selectionStart || 0
    );
    const newContent = beforeMention + `@${user.name} ` + afterCursor;

    setContent(newContent);
    setMentions((prev) => [...prev.filter((m) => m.name !== user.name), user]);
    setShowMentions(false);
    setMentionQuery("");

    // Focus back to textarea
    setTimeout(() => {
      if (textareaRef.current) {
        const newPosition = beforeMention.length + user.name.length + 2;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newPosition, newPosition);
      }
    }, 0);
  };

  const removeMention = (userToRemove: Author) => {
    setMentions((prev) =>
      prev.filter((mention) => mention.name !== userToRemove.name)
    );

    // Remove mention from content
    const mentionPattern = new RegExp(`@${userToRemove.name}\\s?`, "gi");
    setContent((prev) => prev.replace(mentionPattern, ""));
  };

  const handleSubmit = () => {
    if (content.trim() && !isSubmitting) {
      // Extract final mentions from content
      const finalMentions = mentions.filter((mention) =>
        content.includes(`@${mention.name}`)
      );

      onSubmit(content.trim(), finalMentions);
      setContent("");
      setMentions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showMentions && filteredUsers.length > 0) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        // Handle arrow navigation in mention list
        return;
      }
      if (e.key === "Enter" && filteredUsers.length > 0) {
        e.preventDefault();
        handleMentionSelect(filteredUsers[0]);
        return;
      }
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "Escape") {
      onCancel();
    }
  };

  const getPlaceholderText = () => {
    if (parentType === "reply") return `Trả lời ${replyToUser?.name}...`;
    if (parentType === "comment") return `Trả lời ${replyToUser?.name}...`;
    return placeholder;
  };

  return (
    <div className={`bg-gray-50 rounded-xl p-3 relative ${className}`}>
      <div className="flex items-start space-x-3">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback className="text-xs">
            {currentUser.name[0]}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          {/* Mentioned users tags */}
          {mentions.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {mentions.map((mention, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                >
                  @{mention.name}
                  <button
                    onClick={() => removeMention(mention)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Textarea */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleContentChange}
              onKeyDown={handleKeyDown}
              placeholder={getPlaceholderText()}
              className="w-full resize-none border-none bg-transparent text-sm placeholder-gray-500 focus:outline-none min-h-[20px] max-h-32"
              rows={1}
            />

            {/* Mention suggestions dropdown */}
            {showMentions && filteredUsers.length > 0 && (
              <div
                ref={mentionListRef}
                className="absolute bottom-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto mb-1"
              >
                {filteredUsers.map((user, index) => (
                  <button
                    key={user.id}
                    onClick={() => handleMentionSelect(user)}
                    className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 text-left text-sm"
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xs">
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      {user.isVerified && (
                        <div className="text-xs text-blue-600">Verified</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              {/* Emoji button */}
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* @ mention button */}
              <button
                className="text-gray-400 hover:text-gray-600 text-xs font-medium"
                onClick={() => {
                  if (textareaRef.current) {
                    const cursorPosition = textareaRef.current.selectionStart;
                    const newContent =
                      content.substring(0, cursorPosition) +
                      "@" +
                      content.substring(cursorPosition);
                    setContent(newContent);
                    setShowMentions(true);
                    setMentionPosition(cursorPosition);
                    setTimeout(() => {
                      if (textareaRef.current) {
                        textareaRef.current.focus();
                        textareaRef.current.setSelectionRange(
                          cursorPosition + 1,
                          cursorPosition + 1
                        );
                      }
                    }, 0);
                  }
                }}
              >
                @
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {/* Cancel button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onCancel}
                className="text-xs px-3 py-1 h-7"
              >
                Hủy
              </Button>

              {/* Submit button */}
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!content.trim() || isSubmitting}
                className="text-xs px-3 py-1 h-7 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Đang gửi...</span>
                  </div>
                ) : parentType === "post" ? (
                  "Bình luận"
                ) : (
                  "Trả lời"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
