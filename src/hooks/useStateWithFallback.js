import React, { useCallback, useEffect, useRef, useState } from "react";

const useStateWithFallback = (initialState) => {
  const [state, setSate] = useState(initialState);
  const cbRef = useRef();
  console.log(cbRef)

  const updateState = useCallback((newState, cb) => {
    cbRef.current = cb;

    setSate((prev) => {
      return typeof newState === "function" ? newState(prev) : newState;
    });
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state); // Run the callback after state updates
      cbRef.current = null; // Clear it after execution ✅
    }
  }, [state]);

  return [state, updateState];
};

export default useStateWithFallback;
