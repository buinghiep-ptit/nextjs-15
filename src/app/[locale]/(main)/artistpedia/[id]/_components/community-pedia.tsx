"use client";

import { ButtonGradient } from "@/components/ui/button-gradient";
import { Container } from "@/components/ui/container";
import { H1, H4 } from "@/components/ui/typography";
import Image from "next/image";
import JoinCommunityModal from "./join-community-modal";
import { useState } from "react";
import { CommunityPedia as CommunityPediaType } from "@/types/community.type";
import { getImageWithFallback } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { communityApiRequest } from "@/services/community.servce";
import { toast } from "react-hot-toast";

export default function CommunityPedia({
  community,
}: {
  community: CommunityPediaType;
}) {
  const [isJoinCommunityModalOpen, setIsJoinCommunityModalOpen] =
    useState(false);

  const { mutate: joinCommunity, isPending } = useMutation({
    mutationFn: (data: { userName: string; communityHashedId: string }) => {
      return communityApiRequest.joinCommunity({
        communityHashedId: data.communityHashedId,
        userName: data.userName,
        avartarImgUrl: "",
      });
    },
  });

  const kols = community?.kols?.length ? community.kols : [community];

  return (
    <div className="w-full mx-auto bg-[var(--accent-foreground)] text-white">
      <div className="relative w-full aspect-[8/3]">
        <img
          src={getImageWithFallback(community?.coverUrl ?? "", "cover")}
          alt="TaynguyenSound Band Cover"
          className="object-cover w-full h-full"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" /> */}
      </div>

      <Container>
        <div className="flex items-center justify-between py-7">
          <H1 className="text-[40px] md:text-[56px] lg:text-[72px] font-bold font-phu-du text-primary-foreground">
            {community?.name}
          </H1>

          <div
            className="p-2 rounded-full transition-all duration-300 ease-in-out hover:scale-105 "
            style={{
              background: "rgba(255, 255, 255, 0.10)",
            }}
          >
            <ButtonGradient
              onClick={() => setIsJoinCommunityModalOpen(true)}
              className="h-16 font-bold text-lg flex items-center gap-2"
              isOutlined
            >
              Tham gia cộng đồng
              <Image
                src="/icons/arrow-right.svg"
                alt="Arrow Right"
                width={24}
                height={24}
              />
            </ButtonGradient>
          </div>
        </div>

        <div
          className=" w-full h-0.25 mb-10 rounded-[1px]"
          style={{
            background: "rgba(255, 255, 255, 0.20)",
          }}
        />

        <div className="pb-20">
          <div className="flex items-center gap-2 mb-8 mt-10">
            <Image
              src="/images/info/profile-icon.svg"
              alt="Star"
              width={28}
              height={28}
            />
            <H4 className="text-xl font-bold text-primary-foreground">
              Profile
            </H4>
          </div>

          <div className="flex gap-6 mb-8">
            {kols.map((member) => (
              <button key={member.id} className="group relative cursor-pointer">
                <div className="relative w-24 h-24 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-110">
                  <img
                    src={getImageWithFallback(member.imageUrl ?? "", "avatar")}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="object-cover group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                  {member.name}
                </div>
              </button>
            ))}
          </div>

          <div className="max-w-4/7 text-[#F8F9FA] text-[15px]">
            {community?.bioDescription}
          </div>
        </div>
      </Container>

      <JoinCommunityModal
        isOpen={isJoinCommunityModalOpen}
        onClose={() => setIsJoinCommunityModalOpen(false)}
        onSave={(data) => {
          joinCommunity(data, {
            onSuccess: () => {
              setIsJoinCommunityModalOpen(false);
              toast.success("Yêu cầu đã được gửi");
            },
          });
        }}
        isLoading={isPending}
        initialData={{
          userName: "",
          avatar: "/icons/profile-icon.svg",
          communityHashedId: community?.communityHashedId ?? "",
          communityName: community?.name ?? "",
        }}
      />
    </div>
  );
}
