import "./TextFields.css";

export const TextFields1 = ({ type, classNames, placeholder }) => {
  return (
    <input
      className={`${classNames} field1`}
      type={type}
      placeholder={placeholder}
    />
  );
};
