import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { BiUser, BiX, BiBook, BiBookOpen } from 'react-icons/bi';
import { FaChalkboardTeacher } from 'react-icons/fa';

import logo from '../../assets/svg/logo.svg';

import './Sidebar.scss';

export default function Sidebar({ menuOpen, handleMenu }) {
  return (
    <aside className={`${menuOpen ? 'open' : ''}`}>
      <span className="close_menu" onClick={handleMenu}>
        <BiX />
      </span>
      <figure>
        <img alt="uniadm logo" src={logo} />
      </figure>
      <nav>
        <Link to="/university_adm/cursos" onClick={handleMenu}>
          <BiBook />
          Cursos
        </Link>
        <Link to="/university_adm/disciplinas" onClick={handleMenu}>
          <BiBookOpen />
          Disciplinas
        </Link>
        <Link to="/university_adm/alunos" onClick={handleMenu}>
          <BiUser />
          Alunos
        </Link>
        <Link to="/university_adm/professores" onClick={handleMenu}>
          <FaChalkboardTeacher />
          Professores
        </Link>
      </nav>
    </aside>
  );
}

Sidebar.propTypes = {
  handleMenu: PropTypes.func.isRequired,
};
