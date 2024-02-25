import { FunctionComponent } from "react";
import NewsList from "../components/cards/NewsCard";
import Layout from "../components/Layout/Layout";
import BestDiv from "../components/Layout/BestDiv";

interface NewsPageProps {}

const NewsPage: FunctionComponent<NewsPageProps> = () => {
  return (
    <Layout>
      <div className=" h-[120px] w-full  mainColor">
        <h1 className="font-semibold container text-white text-2xl flex h-full items-center">
          Мэдээ
        </h1>
      </div>
      <BestDiv>
        <div className=" h-screen  mt-[200px]  ">
          <NewsList />
          <div className=" my-8">
            <NewsList />
          </div>
        </div>
      </BestDiv>
    </Layout>
  );
};

export default NewsPage;
