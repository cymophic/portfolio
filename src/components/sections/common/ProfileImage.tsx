"use client";

import { useState } from "react";
import Image from "next/image";
import { profileInfo } from "@/lib/site";
import Skeleton from "@/components/ui/Skeleton";

type Props = {
  width: number;
  height: number;
};

export default function ProfileImage({ width, height }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <Skeleton
          shape="circle"
          className="shrink-0"
          style={{ width: width, height: height }}
        />
      )}
      <Image
        src={profileInfo.image}
        alt="Profile picture"
        width={width}
        height={height}
        priority
        onLoad={() => setLoaded(true)}
        className={`rounded-full object-cover ${loaded ? "block" : "hidden"}`}
      />
    </>
  );
}