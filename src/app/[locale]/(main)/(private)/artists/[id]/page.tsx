"use client";
import React from "react";
import ArtistSlider from "../_components/artist-slider";
import PostWithModal from "@/components/post/post-with-modal";
import { Container } from "@/components/ui/container";

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

interface PostData {
  id: string;
  author: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  timestamp: string;
  views: number;
  comments: number;
  content: string;
  images?: string[];
  reactions: {
    emoji: string;
    count: number;
    isActive: boolean;
  }[];
  commentList?: Comment[];
}

export default function ArtistPage() {
  const postsData: PostData[] = [
    {
      id: "artist-post-1",
      author: {
        name: "Taylor Swift",
        avatar: "/images/home/trending/artist-avatar.png",
        isVerified: true,
      },
      timestamp: "5/8 14:20",
      views: 1234,
      comments: 456,
      content: `Excited to share behind-the-scenes moments from my latest music video! Thank you to all the amazing crew and fans for making this possible ✨🎵 #NewEra #Swifties`,
      images: ["/images/home/feed/main-img.jpg"],
      reactions: [
        { emoji: "20", count: 2341, isActive: true },
        { emoji: "7", count: 897, isActive: false },
        { emoji: "1", count: 543, isActive: false },
      ],
      commentList: [
        {
          id: "artist-comment-1",
          author: {
            name: "Swiftie Forever",
            avatar: "/images/home/trending/artist-avatar.png",
            isVerified: false,
          },
          content:
            "Taylor you're absolutely incredible! Can't wait for the full video! 💕",
          timestamp: "5/8 14:35",
          level: 0,
          reactions: [
            { emoji: "20", count: 123, isActive: true },
            { emoji: "1", count: 67, isActive: false },
          ],
        },
      ],
    },
    {
      id: "artist-post-2",
      author: {
        name: "Ed Sheeran",
        avatar: "/images/home/trending/artist-avatar.png",
        isVerified: true,
      },
      timestamp: "4/8 19:45",
      views: 876,
      comments: 234,
      content:
        "Just finished recording a new acoustic session in my home studio. Sometimes the best music comes from the simplest moments 🎸",
      images: [
        "/images/home/feed/feed-img-2.jpg",
        "/images/home/feed/feed-img-3.jpg",
      ],
      reactions: [
        { emoji: "1", count: 1567, isActive: false },
        { emoji: "7", count: 432, isActive: true },
        { emoji: "19", count: 234, isActive: false },
      ],
      commentList: [
        {
          id: "artist-comment-2",
          author: {
            name: "Music Lover",
            avatar: "/images/home/trending/artist-avatar.png",
            isVerified: false,
          },
          content:
            "Your acoustic sessions are always magical! Please release this one! 🙏",
          timestamp: "4/8 20:00",
          level: 0,
          reactions: [
            { emoji: "1", count: 89, isActive: true },
            { emoji: "7", count: 45, isActive: false },
          ],
        },
      ],
    },
    {
      id: "artist-post-3",
      author: {
        name: "Billie Eilish",
        avatar: "/images/home/trending/artist-avatar.png",
        isVerified: true,
      },
      timestamp: "3/8 16:30",
      views: 2156,
      comments: 789,
      content:
        "Working on something special for you guys... it's different from anything I've done before. Ready for a new sound? 🌙💚",
      images: [
        "/images/home/feed/main-img.jpg",
        "/images/home/feed/feed-img-2.jpg",
        "/images/home/feed/feed-img-3.jpg",
      ],
      reactions: [
        { emoji: "7", count: 3456, isActive: true },
        { emoji: "19", count: 1234, isActive: false },
        { emoji: "16", count: 876, isActive: false },
      ],
      commentList: [
        {
          id: "artist-comment-3",
          author: {
            name: "Billie Stan",
            avatar: "/images/home/trending/artist-avatar.png",
            isVerified: false,
          },
          content:
            "Yesss! I'm so ready for whatever you create! Your music always hits different 💚",
          timestamp: "3/8 16:45",
          level: 0,
          reactions: [
            { emoji: "7", count: 234, isActive: true },
            { emoji: "20", count: 156, isActive: false },
          ],
        },
      ],
    },
    {
      id: "artist-post-4",
      author: {
        name: "The Weeknd",
        avatar: "/images/home/trending/artist-avatar.png",
        isVerified: true,
      },
      timestamp: "2/8 21:15",
      views: 1876,
      comments: 567,
      content:
        "Thank you for an incredible tour! Every city, every crowd brought something special. Until next time... XO 🖤",
      images: [
        "/images/home/feed/feed-img-3.jpg",
        "/images/home/trending/artist-bg.png",
        "/images/home/feed/main-img.jpg",
        "/images/home/feed/feed-img-2.jpg",
      ],
      reactions: [
        { emoji: "20", count: 4567, isActive: false },
        { emoji: "1", count: 2345, isActive: true },
        { emoji: "7", count: 1234, isActive: false },
      ],
      commentList: [
        {
          id: "artist-comment-4",
          author: {
            name: "XO Fan",
            avatar: "/images/home/trending/artist-avatar.png",
            isVerified: false,
          },
          content:
            "The tour was absolutely incredible! Thank you for the unforgettable experience! XO 🖤",
          timestamp: "2/8 21:30",
          level: 0,
          reactions: [
            { emoji: "20", count: 345, isActive: true },
            { emoji: "1", count: 123, isActive: false },
          ],
        },
      ],
    },
    {
      id: "artist-post-5",
      author: {
        name: "Ariana Grande",
        avatar: "/images/home/trending/artist-avatar.png",
        isVerified: true,
      },
      timestamp: "1/8 12:00",
      views: 3456,
      comments: 1234,
      content:
        "Feeling grateful for all the love and support. Working on something beautiful for you all 💫 Love you endlessly, my angels 🤍",
      reactions: [
        { emoji: "20", count: 6789, isActive: true },
        { emoji: "19", count: 3456, isActive: false },
        { emoji: "1", count: 1789, isActive: false },
      ],
      images: [],
      commentList: [
        {
          id: "artist-comment-5",
          author: {
            name: "Arianator",
            avatar: "/images/home/trending/artist-avatar.png",
            isVerified: false,
          },
          content:
            "We love you so much Ari! Can't wait to hear what you're working on! 🤍✨",
          timestamp: "1/8 12:15",
          level: 0,
          reactions: [
            { emoji: "20", count: 567, isActive: true },
            { emoji: "19", count: 234, isActive: false },
          ],
        },
      ],
    },
    {
      id: "artist-post-6",
      author: {
        name: "Coldplay",
        avatar: "/images/home/trending/artist-avatar.png",
        isVerified: true,
      },
      timestamp: "6/8 09:30",
      views: 2890,
      comments: 892,
      content:
        "Sustainable tour update: We've planted over 7 million trees and reduced our carbon footprint by 47%! Music can change the world 🌍💚 Thank you for joining our mission!",
      images: [
        "/images/home/feed/main-img.jpg",
        "/images/home/feed/feed-img-2.jpg",
        "/images/home/feed/feed-img-3.jpg",
        "/images/home/trending/artist-bg.png",
        "/images/home/banner-slider-1.png",
        "/images/home/trending/trending-bg.png",
      ],
      reactions: [
        { emoji: "1", count: 5678, isActive: false },
        { emoji: "7", count: 2345, isActive: true },
        { emoji: "19", count: 1234, isActive: false },
      ],
      commentList: [
        {
          id: "artist-comment-6",
          author: {
            name: "Eco Warrior",
            avatar: "/images/home/trending/artist-avatar.png",
            isVerified: false,
          },
          content:
            "This is why we love Coldplay! Music AND making the world better! 🌍💚",
          timestamp: "6/8 09:45",
          level: 0,
          reactions: [
            { emoji: "1", count: 234, isActive: true },
            { emoji: "7", count: 156, isActive: false },
          ],
        },
      ],
    },
  ];

  return (
    <div className="">
      <ArtistSlider />

      {/* Post List Section */}
      <div
        className="py-6"
        style={{
          background: "linear-gradient(180deg, #FFF 0%, #F1F3F5 6.28%)",
        }}
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-6 col-span-2">
              {postsData.map((post) => (
                <PostWithModal
                  key={post.id}
                  author={post.author}
                  timestamp={post.timestamp}
                  views={post.views}
                  comments={post.comments}
                  content={post.content}
                  images={post.images}
                  reactions={post.reactions}
                  commentList={post.commentList}
                  variant="community"
                  onEdit={() => console.log("Edit post", post.id)}
                  onDelete={() => console.log("Delete post", post.id)}
                />
              ))}
            </div>
            <div className="space-y-6 col-span-1">
              <div className="bg-white rounded-[20px] p-6">
                <h3 className="text-lg font-semibold mb-4">Trending Artists</h3>
                <p className="text-gray-500">Quảng cáo và nội dung khác</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
