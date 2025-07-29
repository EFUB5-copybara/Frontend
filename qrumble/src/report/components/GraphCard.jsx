import React from "react";
import styled from "styled-components";

function GraphCard({ children, title }) {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

const Card = styled.div`
  width: 320px;
  height: 234px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  background: ${({ theme }) => theme.colors.white};
`;

const CardTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.sub16SB};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 15px;
  margin-top: 11px;
  margin-left: 14px;
  text-align: left;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default GraphCard;