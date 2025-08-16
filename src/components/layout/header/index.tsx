import { Suspense } from "react";
import HeaderLeft from "./header-left";
import HeaderRight from "./header-right";
import { Container } from "@/components/ui/container";

type HeaderProps = {
  showArtistDropdown?: boolean;
};

export default function Header({ showArtistDropdown = true }: HeaderProps) {
  return (
    <header className="w-full fixed top-0 left-0 right-0 z-9">
      <Container className="py-4">
        <div className="rounded-[20px] min-h-[84px] bg-white px-6 flex justify-between items-center">
          <HeaderLeft showArtistDropdown={showArtistDropdown} />
          <Suspense fallback={<div>Loading...</div>}>
            <HeaderRight />
          </Suspense>
        </div>
      </Container>
    </header>
  );
}
