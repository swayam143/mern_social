import "./Text.css";

export const Text1 = ({ title, classNames }) => {
  return <p className={`${classNames} text1`}>{title}</p>;
};
