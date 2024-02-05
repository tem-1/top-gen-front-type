import { FunctionComponent } from "react";
import detailBg from "@/pages/assets/detailBg.png";
import Image from "next/image";
import Layout from "../components/Layout/Layout";
import bgCover from "@/pages/assets/Section.png";
interface DetailProps {}

const Detail: FunctionComponent<DetailProps> = () => {
  const data = [
    {
      name: "Монгол хэл  яазгуурын ойлголт",
      time: "00:23:12",
    },
    {
      name: "Монгол хэлний яазгуурын ойлголт ",
      time: "00:23:12",
    },
    {
      name: "Монгол хэлний яазгуурын ойлголт",
      time: "00:23:12",
    },
    {
      name: "Монгол хэлний яазгуурын ойлголт",
      time: "00:23:12",
    },
    {
      name: "Монгол хэлний яазгуурын ойлголт",
      time: "00:23:12",
    },
  ];
  return (
    <Layout>
      <Image
        className="h-[400px]"
        src={bgCover}
        width={1920}
        height={600}
        alt="bg"
      />
      <div className="container border h-auto my-12 flex gap-10">
        <div>
          {" "}
          <Image src={detailBg} alt="" width={763} height={542} />
          <div className="h-[300px]"></div>
        </div>

        <div className="border p-4 rounded-lg ">
          <h1 className=" flex w-full justify-start items-center pt-2 text-xl">
            {" "}
            Сургалтын хөтөлбөр
          </h1>
          {data.map((el, i) => (
            <div
              className="borderColor
              p-4 rounded-xl  my-4 fontMain font-bold"
              key={i}
            >
              <div className="flex items-center h-full">
                <div className="mx-2"> {i}.</div>
                <div>{el.name}</div>
                <div className="ml-12 flex justify-end ">
                  <button className="borderColor text-black p-2 rounded-lg">
                    {" "}
                    тест{" "}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
