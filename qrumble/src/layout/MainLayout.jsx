import NavigationBar from "@/components/NavigationBar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function MainLayout() {
  return (
    <div>
      <LayoutWrapper>
        <Outlet />
      </LayoutWrapper>
      <NavigationBar />
    </div>
  );
}

const LayoutWrapper = styled.main`
  width: 360px;
`;
