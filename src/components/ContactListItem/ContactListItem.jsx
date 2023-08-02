import PropTypes from 'prop-types';
import * as S from './ContactListItem.styled';

const ContactListItem = ({ contactName, contactNumber, onClick }) => {
  return (
    <S.Item>
      <p>
        {contactName}: {contactNumber}
      </p>
      <S.Button type="button" onClick={onClick}>
        Delete
      </S.Button>
    </S.Item>
  );
};

ContactListItem.propTypes = {
  contactName: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContactListItem;
