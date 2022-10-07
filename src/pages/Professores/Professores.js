import { useState, useEffect } from 'react';
import axios from '../../services/axios';
import Loading from '../../components/Loading/Loading';
import AddUser from '../../components/AddUser/AddUser';

import './Professores.scss';

export default function Professores() {
  const [professores, setProfessores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    const getProfessores = await axios.get('/professores');
    setProfessores(getProfessores.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  function formatDate(dateProf) {
    const date = new Date(dateProf);
    return date.toLocaleDateString();
  }

  const handleOpen = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <AddUser isOpen={isOpen} handleOpen={handleOpen} getData={getData} />
      <div className={`overlay ${isOpen ? 'open' : ''}`}></div>
      <h1 className={`${isOpen ? 'formopen' : ''}`}>Professores</h1>
      <div className={`main_content_list ${isOpen ? 'formopen' : ''}`}>
        <ul className="item_sublist">
          {professores.map((professor) => (
            <li className="list_item professor_item" key={professor.id}>
              {professor.name}
              <div className="item_info">
                <span>Nascimento: {formatDate(professor.birthday)}</span>
                <span>Salário: {professor.wage}€</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="add_data" onClick={handleOpen}>
          <h3>Adicionar Professor</h3>
        </div>
      </div>
    </>
  );
}
