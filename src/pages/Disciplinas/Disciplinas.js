import { useState, useEffect } from 'react';
import axios from '../../services/axios';
import Loading from '../../components/Loading/Loading';
import AddDisciplina from '../../components/AddUser/AddDisciplina';

import './Disciplinas.scss';

export default function Disciplinas() {
  const [cursos, setCursos] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    const getCursos = await axios.get('/cursos');
    const getProfessores = await axios.get('/professores');
    setCursos(getCursos.data);
    setProfessores(getProfessores.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  function findProf(id) {
    const professor = professores.find((prof) => prof.disciplinaId === id);
    return professor.name;
  }

  const handleOpen = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <AddDisciplina
        isOpen={isOpen}
        handleOpen={handleOpen}
        getData={getData}
      />
      <div className={`overlay ${isOpen ? 'open' : ''}`}></div>
      <h1 className={`${isOpen ? 'formopen' : ''}`}>Disciplinas</h1>
      <div className="main_content_list">
        {cursos.map((curso) => (
          <article className="list_item" key={curso.id}>
            <h3>{curso.name}</h3>
            <ul className="item_sublist">
              {curso.disciplinas.map((disciplina) => (
                <li data-id={disciplina.id} key={disciplina.id}>
                  {disciplina.name}
                  <span>Professor(a): {findProf(disciplina.id)}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
        <div className="add_data" onClick={handleOpen}>
          <h3>Adicionar Disciplina</h3>
        </div>
      </div>
    </>
  );
}
