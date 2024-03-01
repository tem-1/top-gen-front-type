import { FunctionComponent, useEffect, useState } from "react";
import { CldVideoPlayer } from "next-cloudinary";
import { imgUrl } from "@/hooks/img";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({ src }) => {
  const [playerId, setPlayerId] = useState(null);
  console.log("props -----------", src);
  useEffect(() => {
    const id: any = Math.random().toString(36).substring(7);
    setPlayerId(id);
  }, []);
  return (
    <div>
      <CldVideoPlayer
        id={`${playerId}`}
        width="800"
        height="800"
        src={`https://topgeniuses.tanuweb.cloud/uploads/1708753814150-videoplayback.mp4`}
      />
    </div>
  );
};

export default VideoPlayer;
