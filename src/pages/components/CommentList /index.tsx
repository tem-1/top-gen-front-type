// import React from "react";
// import Image from "next/image";
// import { imgUrl } from "@/hooks/img";
// const ExampleComponent = ({ comment }: any) => {
//   return !comment || comment.length == 0 ? (
//     <div>loading</div>
//   ) : (
//     <div className="flex justify-center relative  w-full  ">
//       <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
//         <div className="relative flex gap-4">
//           <Image
//             width={20}
//             height={20}
//             src={`${imgUrl}/${comment?.createUser?.photo}`}
//             className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
//             alt={comment?.description}
//             loading="lazy"
//           />
//           <div className="flex flex-col w-full">
//             <div className="flex flex-row justify-between">
//               <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
//                 {" "}
//                 {comment[0]?.createUser?.firstname}{" "}
//               </p>
//               <a className="text-gray-500 text-xl" href="#">
//                 <i className="fa-solid fa-trash"></i>
//               </a>
//             </div>
//             <p className="text-gray-400 text-sm">
//               {" "}
//               Огноо: {comment?.createdAt?.slice(0, 10)}{" "}
//             </p>
//             <p className=" text-gray-400 text-sm">
//               {" "}
//               Нэр: {comment?.createUser?.name}{" "}
//             </p>
//           </div>
//         </div>
//         <p className="-mt-4 text-gray-500"> {comment?.description} </p>
//       </div>
//     </div>
//   );
// };

// export default ExampleComponent;
