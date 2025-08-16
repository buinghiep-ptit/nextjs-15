import { NextResponse } from "next/server";

interface Artist {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  followerCount: string;
}

// Mock data for artists
const artists: Artist[] = [
  {
    id: "tayguyen",
    name: "TaynguyenSound",
    avatar: "/images/home/trending/artist-avatar.png",
    isVerified: true,
    followerCount: "2.5M",
  },
  {
    id: "sontung",
    name: "Sơn Tùng M-TP",
    avatar: "/images/home/trending/artist-avatar.png",
    isVerified: true,
    followerCount: "8.2M",
  },
  {
    id: "denvau",
    name: "Đen Vâu",
    avatar: "/images/home/trending/artist-avatar.png",
    isVerified: true,
    followerCount: "3.1M",
  },
  {
    id: "hoangthuylinh",
    name: "Hoàng Thùy Linh",
    avatar: "/images/home/trending/artist-avatar.png",
    isVerified: true,
    followerCount: "1.8M",
  },
  {
    id: "blackpink",
    name: "BLACKPINK",
    avatar: "/images/home/trending/artist-avatar.png",
    isVerified: true,
    followerCount: "15.2M",
  },
  {
    id: "bichphuong",
    name: "Bích Phương",
    avatar: "/images/home/trending/artist-avatar.png",
    isVerified: true,
    followerCount: "2.1M",
  },
];

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return NextResponse.json({
    success: true,
    data: artists,
  });
}
