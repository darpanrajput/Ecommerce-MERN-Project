export function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1).concat("...") : str;
}

export const NO_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";

export const l = (fileName, msg) => {

  console.log(`${fileName}=>${msg}`);
  return;
}