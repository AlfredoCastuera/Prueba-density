import React, { useCallback } from 'react'
import Button from '../components/Button'
import Display from '../components/Display'
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { selectCounter, increment, decrement } from '../Redux/features/counterSlice'

const Counter = () => {
  const counter = useAppSelector(selectCounter);
  const dispatch = useAppDispatch();

  const incrementByOne = useCallback(()=>{
    dispatch(increment())
  },[]);
  const decrementByOne = useCallback(()=>{
    dispatch(decrement())
  },[]);

  return (
    <>
      <Display value={counter} />
      <Button onClick={incrementByOne}>incrementar</Button>
      <Button onClick={decrementByOne}>decrementar</Button>
    </>
  )
}

export default Counter