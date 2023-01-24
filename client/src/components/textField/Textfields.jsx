import "./TextFields.css";

export const TextFields1 = ({
  type,
  classNames,
  placeholder,
  value,
  onChange,
  name,
  onClick,
}) => {
  return (
    <input
      onClick={onClick}
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
  style,
  onClick,
}) => {
  return (
    <input
      onClick={onClick}
      name={name}
      value={value}
      onChange={onChange}
      className={`${classNames} field2`}
      type={type}
      placeholder={placeholder}
      style={style}
    />
  );
};

export const TextArea1 = ({
  type,
  classNames,
  placeholder,
  value,
  onChange,
  name,
  style,
  onClick,
}) => {
  return (
    <textarea
      onClick={onClick}
      name={name}
      value={value}
      onChange={onChange}
      className={`${classNames} field2`}
      type={type}
      placeholder={placeholder}
      style={style}
    />
  );
};
