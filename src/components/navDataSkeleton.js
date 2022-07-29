import React, { forwardRef, useEffect, useState } from "react";
import { NavLinkList, NavAnchor } from "./navBarStyle";
import { Strings } from "../constant/stringConstants";

const NavDataSkeleton = (props, ref) => {
  let activeSection = Strings.home;

  const {
    method,
    change,
    active,
    changingActive,
    stateCheck,
    setHanburgStateCheck,
  } = props;
  const { homeRef, aboutRef, projectRef, experienceRef, contactRef } = ref;

  return (
    <>
      <NavLinkList
        label={Strings.home}
        active={active}
        onClick={() => {
          change();
          changingActive(Strings.home);
          method(homeRef.current);
          if (window.innerWidth < 700) {
            setHanburgStateCheck();
          }
        }}
      >
        <NavAnchor active={active}>{Strings.home}</NavAnchor>
      </NavLinkList>

      <NavLinkList
        label={Strings.about}
        active={active}
        onClick={() => {
          change();
          changingActive(Strings.about);
          method(aboutRef.current);
          if (window.innerWidth < 700) {
            setHanburgStateCheck();
          }
        }}
      >
        <NavAnchor active={active}>{Strings.about}</NavAnchor>
      </NavLinkList>

      <NavLinkList
        label={Strings.projects}
        active={active}
        onClick={() => {
          change();
          changingActive(Strings.projects);
          method(projectRef.current);
          if (window.innerWidth < 700) {
            setHanburgStateCheck();
          }
        }}
      >
        <NavAnchor active={active}>{Strings.projects}</NavAnchor>
      </NavLinkList>
      <NavLinkList
        label={Strings.contact}
        active={active}
        onClick={() => {
          change();
          changingActive(Strings.contact);
          method(contactRef.current);
          if (window.innerWidth < 700) {
            setHanburgStateCheck();
          }
        }}
      >
        <NavAnchor active={active}>{Strings.contact}</NavAnchor>
      </NavLinkList>
    </>
  );
};

export default forwardRef(NavDataSkeleton);
