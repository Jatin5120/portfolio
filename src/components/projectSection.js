import React, { useState, useEffect } from "react";
import useGetCollection from "../customHooks/useGetCollection";
import useGetDoc from "../customHooks/useGetData";
import { projectData } from "../store/data";
import ProjectsCard from "./Projects";
import {
  Project,
  ProjectInner,
  TopSection,
  TopHeading,
  BottomSection,
} from "./projectSectionStyle";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { ButtonSection } from "./projectPageStyle";

const ProjectSection = ({ projects }) => {
  return (
    <Project>
      <ProjectInner>
        <TopSection>
          <TopHeading>Projects</TopHeading>
        </TopSection>
        <BottomSection>
          {projects.map((i) => (
            <ProjectsCard
              key={i.id}
              name={i.name}
              tags={i.tags}
              icon={i.icon}
            />
          ))}
        </BottomSection>
      </ProjectInner>
      <ButtonSection>
        <Button>
          <Link
            to="projects"
            style={{ textDecoration: "none", color: "white" }}
          >
            See All
          </Link>
        </Button>
      </ButtonSection>
    </Project>
  );
};

export default ProjectSection;
