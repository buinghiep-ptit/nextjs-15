import NavbarMenu from "./navbar-menu";
import HeaderLeft from "./header-left";
import HeaderRight from "./header-right";

export default function MainHeader() {
  return (
    <header
      className="w-full py-2 px-4 sm:px-6 md:px-8 min-h-[60px] sm:min-h-[70px] md:min-h-[76px]"
      style={{
        background: `url("/images/bg-navbar.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Mobile Layout - Stack vertically */}
      <div className="lg:hidden flex flex-col space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between">
          <HeaderLeft />
          <HeaderRight />
        </div>
        <div className="flex justify-center">
          <NavbarMenu />
        </div>
      </div>

      {/* Desktop Layout - Grid với 3 cột để đảm bảo navbar luôn ở giữa */}
      <div className="hidden lg:grid grid-cols-3 items-center h-full min-h-[60px]">
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
    </header>
  );
}
