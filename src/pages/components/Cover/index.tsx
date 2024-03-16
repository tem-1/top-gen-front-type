import { imgUrl } from "@/hooks/img";
import { useCourseContext } from "@/states/state";
import Image from "next/image";
import { FunctionComponent } from "react";
interface BgCoverProps {}

const BgCover: FunctionComponent<BgCoverProps> = () => {
  const { additional } = useCourseContext();
  return (
    <>
      <Image
        className="w-full  justify-center  h-auto sm:h-[250px] md:h-[300px] lg:h-[600px] object-cover"
        src={`${imgUrl}/${additional?.cover}`}
        width={1920}
        height={600}
        alt="bg"
      />
    </>
  );
};

export default BgCover;
