import React from 'react';
import styled from 'styled-components';

const StatusContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const BadgeSection = styled.div`
  margin-bottom: 2rem;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const Badge = styled.div`
  img {
    height: 20px;
  }
`;

const StatusPage: React.FC = () => {
  return (
    <StatusContainer>
      <h1>Project Status</h1>
      
      <BadgeSection>
        <h2>Build Status</h2>
        <BadgeContainer>
          <Badge>
            <img src="https://github.com/cyber-eco/cybereco/workflows/build/badge.svg" alt="Build Status" />
          </Badge>
        </BadgeContainer>
      </BadgeSection>
      
      <BadgeSection>
        <h2>Test Status</h2>
        <BadgeContainer>
          <Badge>
            <img src="https://github.com/cyber-eco/cybereco/workflows/tests/badge.svg" alt="Test Status" />
          </Badge>
          <Badge>
            <img src="https://codecov.io/gh/cyber-eco/cybereco/branch/main/graph/badge.svg" alt="Coverage Status" />
          </Badge>
        </BadgeContainer>
      </BadgeSection>
    </StatusContainer>
  );
};

export default StatusPage;
