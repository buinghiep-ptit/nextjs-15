"use client";

import React, { useState } from "react";
import SocialPostCard from "./social-post-card";
import PostModal from "./post-modal";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  content: string;
  timestamp: string;
  reactions: {
    emoji: string;
    count: number;
    isActive?: boolean;
  }[];
  replies?: Comment[];
  level: number;
  replyTo?: string;
}

interface PostWithModalProps {
  author: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  timestamp: string;
  views: number;
  comments: number;
  content: string;
  image?: string;
  reactions: {
    emoji: string;
    count: number;
    isActive?: boolean;
  }[];
  commentList?: Comment[];
}

export default function PostWithModal(props: PostWithModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <SocialPostCard
        {...props}
        onCommentClick={handleOpenModal}
        onImageClick={handleOpenModal}
      />

      <PostModal isOpen={isModalOpen} onClose={handleCloseModal} post={props} />
    </>
  );
}
