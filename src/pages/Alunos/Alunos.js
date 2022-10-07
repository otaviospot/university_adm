import { useState, useEffect } from 'react';
import axios from '../../services/axios';
import Loading from '../../components/Loading/Loading';
import AddAluno from '../../components/AddUser/AddAluno';

import './Alunos.scss';

export default function Alunos() {
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    const getCursos = await axios.get('/cursos');
    setCursos(getCursos.data);
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
      <AddAluno isOpen={isOpen} handleOpen={handleOpen} getData={getData} />
      <div className={`overlay ${isOpen ? 'open' : ''}`}></div>
      <h1 className={`${isOpen ? 'formopen' : ''}`}>Alunos</h1>
      <div className="main_content_list">
        {cursos.map((curso) => (
          <article className="list_item" key={curso.id}>
            <h3>{curso.name}</h3>
            <ul className="item_sublist">
              {curso.alunos.map((aluno) => (
                <li className="list_item aluno_item" key={aluno.registration}>
                  {aluno.name}
                  <div className="item_info">
                    <span>Nascimento: {formatDate(aluno.birthday)}</span>
                    <span>Matrícula: {aluno.registration}</span>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        ))}
        <div className="add_data" onClick={handleOpen}>
          <h3>Adicionar Aluno</h3>
        </div>
      </div>
    </>
  );
}
