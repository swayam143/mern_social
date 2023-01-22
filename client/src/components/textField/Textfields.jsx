import "./TextFields.css";

export const TextFields1 = ({
  type,
  classNames,
  placeholder,
  value,
  onChange,
  name,
}) => {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      className={`${classNames} field1`}
      type={type}
      placeholder={placeholder}
    />
  );
};

export const TextFields2 = ({
  type,
  classNames,
  placeholder,
  value,
  onChange,
  name,
}) => {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      className={`${classNames} field2`}
      type={type}
      placeholder={placeholder}
    />
  );
};
