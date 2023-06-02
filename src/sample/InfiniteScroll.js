import React, { useState, useEffect } from "react";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // 초기 데이터 로딩
    const fetchListData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=ko-KR&page=1`
        );
        setData(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListData();
  }, []);

  useEffect(() => {
    // 페이지 변경 시 데이터 로딩
    const fetchListData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=ko-KR&page=${page}`
        );
        setData((prevData) => [...prevData, ...response.data.results]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListData();
  }, [page]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=ko-KR&page=${page}`
      );
      const newData = response.data.results;

      setData((prevData) => [...prevData, ...newData]);
      setPage((prevPage) => prevPage + 1); // 페이지를 증가시킴
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default InfiniteScroll;
