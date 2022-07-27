import './App.css';
import { createStore } from 'redux';
import { useSelector } from 'react-redux'; // useSelector 를 통해 카운터가 스토어의 value 값을 가져온다
import { Provider } from 'react-redux'; //  provider 를 통해 애플리케이션에 공급
import { useDispatch } from 'react-redux' // 버튼을 눌렀을 때 state 값을 바꾸는 dispatch 

import {createSlice, configureStore} from '@reduxjs/toolkit'; 

const counterSlice = createSlice({
  name : 'counter', // 슬라이스의 이름
  initialState : {value : 0}, // 스토어는 초기 값이 필요
  reducers : {
    up : (state, action) => {
      state.value = state.value + action.payload; // up 타입일 때 처리해야하는 리듀서 (dispatch 역할)
    }
  }
});

const store = configureStore({
  // 객체를 전달하고 필수적으로 reducer 전달
  reducer : {
    counter : counterSlice.reducer // up을 포함하여 counterSlice 안에 들어있는 리듀서 여러가지들을 하나로 해준다.
  }
}) 

function Counter(){
  const dispatch = useDispatch();
  //const count = useSelector(state => state.value) // 기존 리덕스의 useSelector
  const count = useSelector(state => {
    return state.counter.value // count 값은 counterSlice의 전달한 value 초기값
  }) 

  return (
    <div>
      <button onClick={()=>{
        // dispatch({type : 'up', step : 2}); 기존 리덕스
        dispatch(counterSlice.actions.up(2)) 
      }}>+</button>{count}
    </div>
  )
}


function App() {
  return (
    <Provider store={store}>
      <div>
        <Counter></Counter>
      </div>
    </Provider>
  );
}

export default App;
