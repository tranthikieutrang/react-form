import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Button } from 'antd';
import FormSV from './components/FormSV';
import ListSV from './components/ListSV';

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './store/counterSlice'

function App() {

  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="App">
      {/* <span>{count}</span>
      <Button onClick={() => dispatch(increment())} type="primary">Button</Button> */}

      <FormSV />
      <ListSV />
    </div>
  )
}

export default App
