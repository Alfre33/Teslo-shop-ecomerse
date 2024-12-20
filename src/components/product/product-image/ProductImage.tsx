import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  width: number;
  height: number;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
}

export const ProductImageComponent = ({
  alt,
  height,
  width,
  className,
  src,
  style,
}: Props) => {
  const ImageSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/imageDefault.jpg";
  return (
    <Image
      src={ImageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  );
};
