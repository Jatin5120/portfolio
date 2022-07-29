import React from "react";
import styledComponents from "styled-components";
import { AppColors, TextTheme } from "../constant/constant";
import { screen } from "../constant/stringConstants";

const { fontFamily: fontFamilyH6, fontSize: fontSizeH6 } = TextTheme.heading6;
const {
  fontFamily: fontFamilySub2,
  fontSize: fontSizeSub2,
} = TextTheme.subtitle2;

const CardMain = styledComponents.div`
    display: flex;
    justify-content: space-between;
    background-color: ${AppColors.background300};
    border-radius: 25px;
    padding: 1.5em;
    max-width: 800px;
  color: ${AppColors.white};
 align-self: center;
  justify-self: center;
`;

const RightProjectSection = styledComponents.div`
   
    padding: 1.5em;
   width:60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Titles = styledComponents.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  
    font-size: ${fontSizeH6};
    font-family: ${fontFamilyH6};

    @media(max-width:${screen.mobile}px){
        font-size:${TextTheme.body2.fontSize};
    }
    
`;

const Icon = styledComponents.img`
    height: 70px;
    width: 70px;
   
    
  
`;

const ProjectName = styledComponents.div`
   padding-left:.5em;
    width:80%;
    
`;

const TagNames = styledComponents.div`
   
    display: flex;
    flex-wrap: wrap;
    margin-top: 2.7em;
    font-size: ${fontSizeSub2};
    font-family: ${fontFamilySub2};
    // border:2px solid white;
@media(max-width:${screen.mobile}px){
        font-family:${TextTheme.caption.fontFamily};
        font-size:${TextTheme.caption.fontSize};
        display:block;
    }  
`;
const SingleTag = styledComponents.div`
    background: ${AppColors.primary300};
    border-radius: 10px;
    padding: .5em 1.5em;
    margin-right: 1.5em;
    // border:2px solid black;
     @media(max-width:${screen.mobile}px){
        margin: 0 0 1em 0;
    }
   
`;

const Expand = styledComponents.div`
  
    text-align: right;
    font-size: ${fontSizeSub2};
    font-family: ${fontFamilySub2};
   padding-top:1em;
`;

const Counter = styledComponents.div`
   width:40px;
   height:40px;
    background:${AppColors.background700};
    border-radius:50%;
    text-align:center;
    line-height:24px;
    padding:.5em .5em;
     margin:2em 0 0 1em;
`;

const TagsOuter = styledComponents.div`
    display:flex;
    
   
`;

export {
  CardMain,
  RightProjectSection,
  Titles,
  Icon,
  ProjectName,
  TagNames,
  SingleTag,
  Expand,
  Counter,
  TagsOuter,
};
