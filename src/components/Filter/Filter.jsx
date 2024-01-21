import s from './Filter.module.css';

export const Filter = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="search"
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
      placeholder="Find contacts by name"
      className={s.input}
    />
  );
};
