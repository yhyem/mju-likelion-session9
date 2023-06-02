import React, { useState, useEffect } from "react";
import axios from "axios";
import Content from "./Content";

const apiKey = process.env.REACT_APP_API_KEY;

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=${page}`
      );
      const newData = response.data.results;

      setData((prevData) => [...prevData, ...newData]);
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // 초기 데이터 로딩
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !isLoading &&
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight
      ) {
        fetchData();
        console.log("데이터 새로 로딩");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, page]);

  return (
    <div>
      {data.map((item) => (
        <Content key={item.id} content={item}>
          {item.title}
        </Content>
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default InfiniteScroll;
