// components/Navbar.js
import React from 'react';
import { useSelector } from 'react-redux';
import { CartIcon } from '../constants/icons';
import styled from 'styled-components';

const Nav = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--clr-primary-5);
  box-shadow: var(--light-shadow);
`;

const NavCenter = styled.div`
  width: 90vw;
  max-width: var(--max-width);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavHeader = styled.h3`
  color: var(--clr-primary-1);
`;

const CartIconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CartContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const CartValue = styled.div`
  position: absolute;
  top: -10px;
  right: -16px;
  background: var(--clr-primary-1);
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--clr-white);
  font-size: 0.75rem;
  padding: 12px;
`;

const Navbar = () => {
  const { totalAmount } = useSelector((state) => state.cart);

  return (
    <Nav>
      <NavCenter>
        <NavHeader>UMC Playlist</NavHeader>
        <CartIconContainer>
          <CartContainer>
            <CartIcon />
            <CartValue>{totalAmount}</CartValue>
          </CartContainer>
        </CartIconContainer>
      </NavCenter>
    </Nav>
  );
};

export default Navbar;
