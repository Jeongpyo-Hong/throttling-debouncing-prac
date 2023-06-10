import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let timerId = null;
  const [state, setState] = useState(true);
  const nav = useNavigate();

  // 메모리 누수 방지
  useEffect(() => {
    return () => {
      //언마운트 될 때 일어나는 동작 설정
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  });

  const throttle = (delay) => {
    if (timerId) {
      // timerId가 있으면 바로 함수 종료
      return;
    }
    setState(!state);
    console.log(`API 요청 실행! ${delay}ms 동안 추가 요청을 받지 않음`);
    timerId = setTimeout(() => {
      console.log(`${delay}ms 지남. 추가 요청 받음`);
      timerId = null;
    }, delay);
  };

  // 반복적인 이벤트 이후, delay 지나면 function 실행
  // 2초 안에 버튼을 누르면 timer 아이디가 있는 상태이므로 계속해서 timerId를 초기화함
  const debounce = (delay) => {
    if (timerId) {
      // 할당되어 있는 timerId에 해당하는 타이머 제거
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      console.log(`마지막 요청으로부터 ${delay}ms 지났으므로 API 요청 실행`);
      timerId = null;
    }, delay);
  };

  return (
    <div
      style={{
        padding: "0 20px",
      }}
    >
      <h1>Button 이벤트 해제</h1>
      <button onClick={() => throttle(2000)}>쓰로틀링 버튼</button>
      <button onClick={() => debounce(2000)}>디바운싱 버튼</button>
      <div>
        <button onClick={() => nav("/company")}>페이지 이동</button>
      </div>
    </div>
  );
};

export default Home;
