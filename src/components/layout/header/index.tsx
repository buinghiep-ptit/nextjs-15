import HeaderLeft from "./header-left";
import HeaderRight from "./header-right";
import NavbarMenu from "./navbar-menu";
import { Container } from "@/components/ui/container";

export default function Header() {
  return (
    <header className="w-full fixed top-0 left-0 right-0 z-9">
      <Container className="py-4">
        <div className="rounded-[20px] min-h-[84px] bg-white px-6 py-5">
          {/* Mobile Layout - Stack vertically */}
          <div className="md:hidden flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <HeaderLeft />
              <HeaderRight />
            </div>
            <div className="flex justify-center">
              <NavbarMenu />
            </div>
          </div>

          {/* Desktop Layout - Grid với 3 cột để đảm bảo navbar luôn ở giữa */}
          <div className="hidden md:grid grid-cols-3 items-center h-full min-h-[60px]">
            {/* Left Section - Logo + Artist Dropdown */}
            <div className="flex justify-start">
              <HeaderLeft />
            </div>

            {/* Center Section - Navigation Menu */}
            <div className="flex justify-center">
              <NavbarMenu />
            </div>

            {/* Right Section - Action Icons */}
            <div className="flex justify-end">
              <HeaderRight />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
