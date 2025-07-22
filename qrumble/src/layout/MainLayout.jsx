import NavigationBar from "@/components/NavigationBar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function MainLayout() {
  return (
    <Container>
      <LayoutWrapper>
        <Outlet />
      </LayoutWrapper>
      <NavigationBar />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const LayoutWrapper = styled.main`
  flex: 1;
  width: 100%;
`;
