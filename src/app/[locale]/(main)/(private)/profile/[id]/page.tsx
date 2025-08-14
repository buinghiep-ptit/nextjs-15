"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Container } from "@/components/ui/container";
import React from "react";
import ProfileInfo from "@/components/profile/profile-info";
import EditProfileButton from "@/components/profile/edit-profile-button";
import ProfileMoreMenu from "@/components/profile/profile-more-menu";
import ProfilePostsList from "@/components/profile/profile-posts-list";
import EditProfileModal from "@/components/profile/edit-profile-modal";

export default function ProfilePage() {
  // Mock data - in real app, this would come from props/API
  const currentUserId = "user123"; // Current logged-in user ID
  const profileUserId = "user123"; // Profile being viewed ID
  const isOwnProfile = currentUserId === profileUserId;

  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const author = {
    id: "user123",
    name: "Linh Mikenco",
    avatar: "/images/home/trending/artist-avatar.png",
    coverImage: "/images/profile/bg-header.jpg",
    isVerified: true,
    isKOL: true, // KOL status
    description:
      "Singer 🥳 Music Creator 💖 Live Show Addict 🤗 🌈\n1M+ views trên TikTok 🔥 Collab với 10k+ người hâm mộ 🥰😘",
    birthday: "Mar 01, 1997",
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (data: {
    nickname: string;
    bio: string;
    avatar?: File;
  }) => {
    console.log("Save profile data:", data);
    // TODO: Implement save profile logic
    // Update author state with new data
  };

  const handleReport = () => {
    console.log("Report user");
    // Handle report logic
  };

  const handleBlock = () => {
    console.log("Block user");
    // Handle block logic
  };

  return (
    <div>
      <div
        style={{
          background: `url("${author.coverImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="py-14"
      >
        <Container maxWidth="md" className="relative">
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-12">
            {/* Avatar Section */}
            <div className="flex-shrink-0">
              {author.isKOL ? (
                <div
                  style={{
                    background:
                      "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #0052D4 113.46%)",
                  }}
                  className="w-45 h-55 p-2 rounded-tl-[100px] rounded-tr-[100px] rounded-bl-xl rounded-br-xl flex items-center justify-center overflow-hidden"
                >
                  <Avatar className="w-full h-full rounded-tl-[100px] rounded-tr-[100px] rounded-bl-lg rounded-br-lg">
                    <AvatarImage
                      src={author.avatar}
                      alt={author.name}
                      className="object-cover"
                    />
                    <AvatarFallback>{author.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <div
                  style={{
                    background:
                      "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #0052D4 113.46%)",
                  }}
                  className="w-45 h-45 p-2 rounded-full flex items-center justify-center"
                >
                  <Avatar className="w-full h-full bg-white">
                    <AvatarImage src={author.avatar} alt={author.name} />
                    <AvatarFallback>{author.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>

            {/* Profile Info Section */}
            <div className="flex-1 min-w-0">
              <ProfileInfo
                name={author.name}
                description={author.description}
                birthday={author.isKOL ? author.birthday : undefined}
                isKOL={author.isKOL}
                isVerified={author.isVerified}
              />

              {isOwnProfile && (
                <div className="mt-6 flex justify-start">
                  <EditProfileButton onClick={handleEditProfile} />
                </div>
              )}
            </div>

            {/* Action Buttons - Positioned at top right */}
            <div className="absolute top-0 right-0">
              {isOwnProfile && (
                <ProfileMoreMenu
                  onReport={handleReport}
                  onBlock={handleBlock}
                />
              )}
            </div>
          </div>

          {/* Edit Profile Button - Below description for own profile */}
        </Container>
      </div>
      {/* Posts Section */}
      <ProfilePostsList authorName={author.name} />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        initialData={{
          nickname: author.name,
          bio: author.description,
          avatar: author.avatar,
        }}
      />
    </div>
  );
}
