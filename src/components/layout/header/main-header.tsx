import NavbarMenu from "./navbar-menu";
import HeaderLeft from "./header-left";
import HeaderRight from "./header-right";

export default function MainHeader() {
  return (
    <header
      className="w-full py-4 px-8 min-h-[76px] flex items-center justify-between"
      style={{
        background: `url("/images/bg-navbar.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Logo */}
      <HeaderLeft />

      {/* Navigation Menu */}
      <NavbarMenu />

      {/* Action Icons */}

      <HeaderRight />
    </header>
  );
}
