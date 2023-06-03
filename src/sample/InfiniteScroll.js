import { useState, useEffect } from "react";
import axios from "axios";
import Content from "./Content";

const InfiniteScroll = () => {
  const [data, setData] = useState([]); // 불러온 영화 데이터를 저장하는 배열
  const [isLoading, setIsLoading] = useState(false); // 데이터 로딩 중인지 여부를 나타내는 상태 변수입니다.
  const [page, setPage] = useState(1); // 현재 페이지 번호를 나타내는 상태 변수입니다.

  const fetchData = async () => {
    // 함수는 영화 데이터를 불러오는 역할
    setIsLoading(true); // 데이터 로딩
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`,
        {
          method: "GET", //method 지정을 하지 않을 경우에 default 값은 GET이다. 사실상 필요 없는 코드
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + process.env.REACT_APP_API_KEY,
          },
        }
      );
      const newData = response.data.results;

      setData((prevData) => [...prevData, ...newData]); // 새로운 데이터를 기존 데이터 배열에 추가
      setPage((prevPage) => prevPage + 1); // 페이지 번호를 업데이트
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // 로딩이 끝난 후 false
    }
  };

  useEffect(() => {
    fetchData(); // 초기 데이터 로딩
  }, []); // 컴포넌트가 마운트되었을 때, 한 번만 실행

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 이벤트를 처리하는 함수
      if (
        // 로딩 중이 아니고, 스크롤이 페이지의 맨 아래에 도달했을 때만 데이터를 다시 로드
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
      {data.map((item, index) => (
        <Content key={item.id} content={item}>
          {item.title}
        </Content>
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default InfiniteScroll;
