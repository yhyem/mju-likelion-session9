import React from "react";
import styled from "styled-components";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const Content = ({ content }) => {
  const {
    title,
    release_date,
    original_language,
    vote_average,
    poster_path,
    first_air_date,
    name,
  } = content;

  return (
    <ContentBlock>
      <ImageBlock>
        <img
          src={poster_path ? IMAGE_URL + poster_path : ""}
          alt={title || name}
        ></img>
      </ImageBlock>
      <Contents>
        {title && <h4>{title}</h4>}
        {name && <h4>{name}</h4>}
        {release_date && (
          <p>
            {release_date.substr(0, 4)} ・ {original_language}
          </p>
        )}
        {first_air_date && (
          <p>
            {first_air_date.substr(0, 4)} ・ {original_language}
          </p>
        )}
        <Average>평균★ {vote_average}</Average>
      </Contents>
    </ContentBlock>
  );
};

const ContentBlock = styled.div`
  padding: 0.5rem;
  display: flex;
`;

const ImageBlock = styled.div`
  position: relative;
  img {
    width: 80px;
    opacity: 1;
    object-fit: cover;
    border-radius: 0.2rem;
  }
`;

const Contents = styled.div`
  h4 {
    margin: 0.3rem 0;
  }
  p {
    margin: auto;
    font-size: 0.9rem;
  }
`;

const Average = styled.div`
  color: #555765;
`;

export default Content;
