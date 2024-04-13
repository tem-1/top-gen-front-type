import { FunctionComponent, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "next-cloudinary/dist/cld-video-player.css";
import { CldVideoPlayer } from "next-cloudinary";
import { imgUrl } from "@/hooks/img";
import { useCourseContext } from "@/states/state";
import axios from "axios";
import BestDiv from "../components/Layout/BestDiv";
import Image from "next/image";
interface FreeLessonPageProps { }
const FreeLessonPage: FunctionComponent<FreeLessonPageProps> = () => {
    const { lessonList, additional } = useCourseContext();
    console.log(lessonList)
    const activeLessons = lessonList.filter((lesson: any) => lesson.freeLesson === "active");

    return (
        <Layout>
            <BestDiv>
                <div className="flex mt-12 flex-wrap gap-12 ">
                    {activeLessons.map((lesson: any, i: number) => (
                        <div key={lesson._id} className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                            <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                <CldVideoPlayer
                                    id={`${Math.random().toString(36).substring(7)}`}
                                    width="800"
                                    height="200"
                                    controls={true}
                                    src={`${imgUrl}/${lesson?.video}`}
                                />
                            </div>
                            <div className="p-6">
                                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                    {i + 1} : {lesson.title}
                                </h5>
                                <p className="block font-sans text-sm underline antialiased font-light leading-relaxed text-inherit">
                                    Үнэгүй хичээл
                                </p>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </BestDiv>
        </Layout >
    );
};

export default FreeLessonPage;
