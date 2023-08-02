import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { selectPhones } from 'redux/phonebook/selector';
import { addContact } from 'redux/phonebook/operations';
import * as S from './ContactForm.styled';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const phones = useSelector(selectPhones);

  const handleSubmit = event => {
    event.preventDefault();
    const existingName = phones.some(
      item => item.name.toLowerCase() === name.toLowerCase()
    );
    const existingNumber = phones.find(item => item.number === number);

    if (existingName) {
      return alert(`Contact "${name}" is already in contacts list`);
    } else if (existingNumber) {
      return alert(`Number "${number}" is already in contacts list`);
    }

    const newContact = {
      name,
      number,
    };

    dispatch(addContact(newContact));

    setName('');
    setNumber('');
  };

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  return (
    <S.Form autoComplete="off" onSubmit={handleSubmit}>
      <S.Label>
        Name
        <S.Input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Enter name"
          required
          onChange={handleChange}
        />
      </S.Label>
      <S.Label>
        Number
        <S.Input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="Enter number"
          required
          onChange={handleChange}
        />
      </S.Label>
      <S.Button type="submit" disabled={!name || !number}>
        Add Contact
      </S.Button>
    </S.Form>
  );
};

export default ContactForm;
