import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { increase, decrease, removeItem } from '../redux/cartSlice';
import { ChevronDown, ChevronUp } from '../constants/icons';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Item>
      <img src={item.img} alt={item.title} />
      <div>
        <h4>{item.title}</h4>
        <h5>{item.singer}</h5>
        <h4>{item.price}원</h4>
        <Quantity>
          <button onClick={() => dispatch(decrease(item.id))}>삭제<ChevronDown /></button>
          <p>{item.amount}</p>
          <button onClick={() => dispatch(increase(item.id))}>추가<ChevronUp /></button>
        </Quantity>
      </div>
      <RemoveButton onClick={() => dispatch(removeItem(item.id))}>제거</RemoveButton>
    </Item>
  );
};

export default CartItem;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 100px;
  }
  div {
    flex: 1;
    margin-left: 1rem;
  }
`;

const Quantity = styled.div`
  color: black;
  display: flex;
  align-items: center;
  button {
    background: none;
    border: none;
    cursor: pointer;
    margin: 0 0.5rem;
  }
  p {
    margin: 0;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
`;
