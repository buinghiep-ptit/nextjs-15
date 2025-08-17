import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CurrentUserCardProps {
  userName: string;
  userAvatar: string;
}

export default function CurrentUserCard({
  userName,
  userAvatar,
}: CurrentUserCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 pt-5 overflow-hidden flex flex-col items-center gap-3">
      {/* Artist Image */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-18 md:h-18 rounded-full overflow-hidden">
        <Avatar className="w-full h-full">
          <AvatarImage
            src={userAvatar}
            alt="Profile Avatar"
            className="object-cover"
          />
          <AvatarFallback className="text-2xl bg-gray-200">
            {userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Info Section */}
      <h5 className="text-sm md:text-base lg:text-lg font-bold">{userName}</h5>
    </div>
  );
}
