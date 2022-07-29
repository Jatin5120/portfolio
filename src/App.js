import React, { useState, useEffect, useRef } from "react";
import LeftSection from "./components/leftSection";
import NavBar from "./components/NavBar";
import styledComponents from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import app from "./store/firebase";
import useGetDoc from "./customHooks/useGetData";
import useGetCollection from "./customHooks/useGetCollection";

import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import {
  faCheckSquare,
  faCircleXmark,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";
import AboutComp from "./components/About";
import ProjectsCard from "./components/Projects";
import { Api, Strings } from "./constant/constant";
import Loading from "./assets/loading.riv";
import Rive, { useRive } from "rive-react";
import NavDataMobile from "./components/navDataMobile";
import ContactSection from "./components/contactSection";
import ProjectSection from "./components/projectSection";
import Messages from "./store/messageData";
import {
  getColl,
  getDoc,
  projectData,
  projectData as projects,
} from "./store/data";
import { Routes, Route } from "react-router-dom";
export const myContext = React.createContext();
export const navState = React.createContext();

library.add(fab, faCheckSquare, faCoffee, far, fas);

const HomeSection = styledComponents.div`

  max-width:2400px;
margin:auto;
  `;

const App = () => {
  const [post, setPost] = useState({});
  const [check, setCheck] = useState(true);
  const [clickChange, setClickChange] = useState(true);
  const [hanburgStateCheck, setHanburgStateCheck] = useState(false);
  const [navMenu, setNavMenu] = useState(false);
  const [active, setActive] = useState(Strings.home);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  const doc = "2rcG50J8OuZURthc28a0";
  const collection = "projects";

  const [projects, setProjects] = useState(null);
  const [about, setAbout] = useState(null);
  const [contact, setContact] = useState(null);
  const [socials, setSocials] = useState(null);

  useEffect(async () => {
    setProjects(await projectData({ collection: "dashboard", doc: "data" }));
    setSocials(await getColl("socials"));
    setContact(await getColl("contacts"));
    setAbout(await getDoc({ collection: "dashboard", doc: "data" }));
  }, []);

  //custom
  // const [data, setData] = useGetDoc(collection, doc);
  // const [data, error, isLoading] = useGetCollection(collection);

  // if (!isLoading) {
  //   console.log(data);
  // }

  const scrollIntoView = (myRef) => {
    if (myRef) {
      const axis = myRef.getBoundingClientRect();
      if (axis.top < window.innerHeight / 2 && axis.bottom > 0) {
        return true;
      }

      return false;
    }
  };

  const highlights = () => {
    if (scrollIntoView(projectRef.current)) {
      setActive(Strings.projects);
    } else if (scrollIntoView(aboutRef.current)) {
      setActive(Strings.about);
    } else if (scrollIntoView(contactRef.current)) {
      setActive(Strings.contact);
    } else {
      setActive(Strings.home);
    }
  };

  useEffect(() => {
    if (homeRef.current) {
      window.addEventListener("scroll", highlights);
    }
    return () => window.removeEventListener("scroll", highlights);
  });

  const { RiveComponent, rive } = useRive({
    src: Loading,
    animations: "Animation 1",
    useOffscreenRenderer: false,
  });

  const changingHanburgState = () => {
    setHanburgStateCheck((prevHanburgStateCheck) => !prevHanburgStateCheck);
  };

  const changingActiveState = (myString) => {
    setActive(myString);
  };

  const scrollToComp = (ref) => {
    if (ref != null) {
      ref.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const changingMethod = () => {
    setClickChange(!clickChange);
  };

  if (!projects || !contact || !socials || !about) {
    return <RiveComponent style={{ height: "100vh", width: "100" }} />;
  }

  return (
    <>
      {/* <Messages /> */}
      <myContext.Provider value={{ clickChange }}>
        <NavBar
          ref={{ homeRef, aboutRef, projectRef, experienceRef, contactRef }}
          method={scrollToComp}
          change={changingMethod}
          stateCheck={hanburgStateCheck}
          setHanburgStateCheck={changingHanburgState}
          active={active}
          changingActive={changingActiveState}
        />
      </myContext.Provider>
      <NavDataMobile
        ref={{ homeRef, aboutRef, projectRef, experienceRef, contactRef }}
        method={scrollToComp}
        change={changingMethod}
        stateCheck={hanburgStateCheck}
        setHanburgStateCheck={changingHanburgState}
        active={active}
        changingActive={changingActiveState}
      />
      <div ref={homeRef}>
        <HomeSection>
          <LeftSection />
        </HomeSection>
      </div>
      <div className="hello" ref={aboutRef}>
        <AboutComp about={about} />
      </div>
      <div ref={projectRef}>
        <ProjectSection projects={projects} />
      </div>
      <div ref={contactRef}>
        <ContactSection contact={contact} socials={socials} />
      </div>
    </>
  );
};

export default App;

const projectStyle = {
  maxWidth: "1750px",
  margin: "auto",
  display: "flex",
  flexWrap: "wrap",

  paddingTop: "4em",
};
