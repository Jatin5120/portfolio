import React, { forwardRef, useEffect } from "react";
import { NavListHanburg } from "./navBarStyle";
import NavDataSkeleton from "./navDataSkeleton";

const NavDataMobile = (props, ref) => {
  const {
    method,
    change,
    stateCheck,
    active,
    changingActive,
    setHanburgStateCheck,
  } = props;
  const { homeRef, aboutRef, projectRef, experienceRef, contactRef } = ref;

  useEffect(() => {
    console.log(stateCheck);
  }, [stateCheck]);

  return (
    <NavListHanburg state={stateCheck}>
      <NavDataSkeleton
        method={method}
        change={change}
        active={active}
        changingActive={changingActive}
        ref={{ homeRef, aboutRef, projectRef, experienceRef, contactRef }}
        stateCheck={stateCheck}
        setHanburgStateCheck={setHanburgStateCheck}
      />
    </NavListHanburg>
  );
};

export default forwardRef(NavDataMobile);
