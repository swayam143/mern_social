import "./Heading.css";

export const Heading1 = ({ title, classNames }) => {
  return <h1 className={`${classNames} Heading1`}>{title}</h1>;
};
