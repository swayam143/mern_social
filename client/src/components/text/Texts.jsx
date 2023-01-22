import "./Text.css";

export const Text1 = ({ title, classNames }) => {
  return <p className={`${classNames} text1`}>{title}</p>;
};

export const Heading1 = ({ title, classNames }) => {
  return <h5 className={`${classNames} `}>{title}</h5>;
};

export const MainHeading = ({ title, classNames }) => {
  return <h5 className={`${classNames} main_heading `}>{title}</h5>;
};
