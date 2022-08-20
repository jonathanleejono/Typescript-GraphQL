import React from "react";
import Wrapper from "./Wrapper";
import dynamic from "next/dynamic";

const NavBarComponent = dynamic(() => import("./NavBar"), { ssr: false });

export type WrapperVariant = "small" | "regular";

interface LayoutProps {
  variant?: WrapperVariant;
}

const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <div>
      <NavBarComponent />
      <Wrapper variant={variant}>{children}</Wrapper>
    </div>
  );
};

export default Layout;
