export const getImgSrc = (id:number) => {
    let img_id = id ? id : 1;
    return `https://picsum.photos/id/${img_id}/600/600`;
};