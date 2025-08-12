import { useState, useCallback } from "react";

interface Reaction {
  emoji: string;
  count: number;
  isActive?: boolean;
}

export function useReactions(initialReactions: Reaction[]) {
  // Chỉ giữ lại reactions có count > 0
  const [reactions, setReactions] = useState<Reaction[]>(
    initialReactions.filter((reaction) => reaction.count > 0)
  );

  const toggleReaction = useCallback((emojiId: string) => {
    setReactions((prev) => {
      const newReactions = prev.map((reaction) => {
        if (reaction.emoji === emojiId) {
          const newCount = reaction.isActive
            ? reaction.count - 1
            : reaction.count + 1;
          // Nếu count = 0, loại bỏ reaction này
          if (newCount === 0) {
            return null;
          }
          return {
            ...reaction,
            count: newCount,
            isActive: !reaction.isActive,
          };
        }
        return reaction;
      });
      // Lọc bỏ các reaction có count = 0 (null)
      return newReactions.filter((r): r is Reaction => r !== null);
    });
  }, []);

  const addNewReaction = useCallback((emojiId: string) => {
    setReactions((prev) => {
      // Kiểm tra nếu reaction đã tồn tại và đang active
      const existingReaction = prev.find((r) => r.emoji === emojiId);
      if (existingReaction?.isActive) {
        // Nếu đã active thì không thêm nữa
        return prev;
      }

      if (existingReaction) {
        // Nếu tồn tại nhưng chưa active
        return prev.map((reaction) =>
          reaction.emoji === emojiId
            ? { ...reaction, count: reaction.count + 1, isActive: true }
            : reaction
        );
      }

      // Thêm reaction mới
      return [...prev, { emoji: emojiId, count: 1, isActive: true }];
    });
  }, []);

  return {
    reactions,
    toggleReaction,
    addNewReaction,
  };
}
