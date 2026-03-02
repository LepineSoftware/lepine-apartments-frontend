import Image from 'next/image';

export const ImageLoader = (url, className, alt, width, height, quality) => {
    const loader = () => `${url}?w=${width}&h=${height}&q=${quality}`;
    return <Image loader={loader} src={url} className={className} height={height} width={width} alt={alt} />
}