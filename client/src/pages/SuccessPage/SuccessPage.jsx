import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 24px;
  color: #555;
  margin-bottom: 40px;
`;

const AnimationContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #ff4081;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeAnimation} 1s ease-in-out;
`;

const Animation = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff;
`;

const SuccessPage = () => {
  return (
    <Container>
      <Title>Success!</Title>
      <Message>Your order has been placed successfully.</Message>
      <AnimationContainer>
        <Animation />
      </AnimationContainer>
    </Container>
  );
};

export default SuccessPage;
