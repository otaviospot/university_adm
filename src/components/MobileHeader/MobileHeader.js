import PropTypes from 'prop-types';
import { BiMenu } from 'react-icons/bi';

import logo from '../../assets/svg/logo.svg';

import './MobileHeader.scss';

export default function MobileHeader({ handleMenu }) {
  return (
    <header>
      <span onClick={handleMenu}>
        <BiMenu />
      </span>
      <figure>
        <img alt="uniadm logo" src={logo} />
      </figure>
    </header>
  );
}

MobileHeader.propTypes = {
  handleMenu: PropTypes.func.isRequired,
};
