import HeaderLeft from "./header-left";
import HeaderRight from "./header-right";
import { Container } from "@/components/ui/container";

export default function Header() {
  return (
    <header className="w-full fixed top-0 left-0 right-0 z-999">
      <Container className="py-4">
        <div className="rounded-[20px] min-h-[84px] bg-white flex items-center justify-between px-6 py-5">
          {/* Logo */}

          <HeaderLeft />

          {/* Navigation Menu */}
          {/* <NavbarMenu /> */}

          {/* Action Icons */}

          <HeaderRight />
        </div>
      </Container>
    </header>
  );
}
