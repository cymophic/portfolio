import Image from "next/image";
import { profileInfo } from "@/lib/site";

type Props = {
  width: number;
  height: number;
};

export default function ProfileImage({ width, height }: Props) {
  return (
    <Image
      src={profileInfo.image}
      alt="Profile picture"
      width={width}
      height={height}
      priority
      className="rounded-full object-cover"
    />
  );
}