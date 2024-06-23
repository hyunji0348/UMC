import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { increase, decrease, removeItem, clearCart, calculateTotals } from '../redux/cartSlice';
import CartItem from './CartItem';
import { CartIcon } from '../constants/icons';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, totalAmount, totalPrice } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  if (cartItems.length === 0) {
    return (
      <Container>
        <h2><CartIconWrapper><CartIcon /></CartIconWrapper> 장바구니</h2>
        <EmptyCart>장바구니에 음악이 없습니다.</EmptyCart>
      </Container>
    );
  }

  return (
    <Container>
      <h2><CartIconWrapper><CartIcon /></CartIconWrapper> 장바구니</h2>
      <Items>
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </Items>
      <CartFooter>
        <h4>총 수량: {totalAmount}</h4>
        <h4>총 가격: {totalPrice}원</h4>
        <ClearCartButton onClick={() => dispatch(clearCart())}>장바구니 비우기</ClearCartButton>
      </CartFooter>
    </Container>
  );
};

export default Cart;

const Container = styled.div`
  padding: 2rem;
  h2 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const EmptyCart = styled.p`
  text-align: center;
  margin-top: 2rem;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CartFooter = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClearCartButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const CartIconWrapper = styled.span`
  width: 1.5rem; /* 아이콘 크기 조절 */
  height: auto;
`;
