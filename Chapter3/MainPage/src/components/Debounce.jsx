//useEffect를 사용해 Debounce를 구현한 custom hook

import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => { 
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    // setTimeout을 이용해 일정 시간(delay) 후에 debouncedValue를 업데이트합니다.
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 클린업 함수: 다음 useEffect가 실행되기 전에 기존 타이머를 제거합니다.
    // 이로써 이전에 설정된 타이머가 남아있지 않도록 합니다.
    return () => { // return 문 안에 정의된 함수는 useEffect가 다시 실행되기 전에 호출됨
      clearTimeout(timer);
    };
  }, [value]); 

  return debouncedValue;
};

export default useDebounce;