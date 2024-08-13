import React from "react";
import styles from '../styles/CardComponent.module.css';

const carMakeToImageFormat = {
  "alfa romeo": "jpg",
  "acura": "jpg",
  "buick": "jpg",
  "chevrolet": "jpg",
  "fiat": "jpg",
  "genesis": "jpg",
  "gmc": "jpg",
  "infiniti": "jpg",
  "land rover": "jpg",
  "kia": "jpg",
  "lexus": "jpg",
  "lincoln": "jpg",
  "mercedes-benz": "jpg",
  "mini": "jpg",
  "ram": "jpg",
  "mitsubishi": "jpg",
  "volkswagen": "jpg",
  "saab": "jpg",
  "bugatti": "jpg",
  "aston martin": "jpg",
  "mclaren": "jpg",
  "rolls-royce": "jpg",
  "pagani": "jpg",
  "volvo": "jpg",
};

const getImageSrc = (name) => {
  if (!name) {
    console.error("Name is undefined or null");
    return "";
  }

  const format = carMakeToImageFormat[name.toLowerCase()] || "png";
  const formattedName = name.toLowerCase().replace(/\s+/g, '-');
  return `/original/${formattedName}.${format}`;
};

const Card = ({ name, isModel = false, currentMake }) => {
  const displayImage = isModel && currentMake
    ? getImageSrc(currentMake)
    : getImageSrc(name);

  return (
    <div className={styles.card}>
      <img
        src={displayImage}
        alt={`${name} logo`}
        className={styles.logo}
      />
      <p className={styles.makeName}>{name}</p>
    </div>
  );
};

export default Card;
