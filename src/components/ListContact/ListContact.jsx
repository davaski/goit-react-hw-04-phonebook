import s from './ListContact.module.css';

export const ListContact = ({ contacts, onDelete }) => (
  <ul className={s.list}>
    {contacts.map(({ id, name, phone }) => (
      <li key={id} className={s.item}>
        {name} : {phone}
        <button className={s.button} onClick={() => onDelete(id)}>
          Delete
        </button>
      </li>
    ))}
  </ul>
);
