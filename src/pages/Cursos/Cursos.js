import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/axios';
import Loading from '../../components/Loading/Loading';

import { BiUser, BiBookOpen } from 'react-icons/bi';

import './Cursos.scss';

export default function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    console.log('oi');
    async function getData() {
      setIsLoading(true);
      const getCursos = await axios.get('/cursos');
      setCursos(getCursos.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  return (
    <>
      <Loading isLoading={isLoading} />
      <h1>Cursos</h1>
      <div className="list_cursos">
        {cursos.map((curso) => (
          <article className="curso_item" key={curso.id}>
            <h3>
              <Link to={`/university_adm/cursos/${curso.id}`}>
                {curso.name}
              </Link>
            </h3>
            <ul className="curso_info">
              <li title="Quantidade de Alunos">
                <BiUser />
                {curso.alunos.length}
              </li>
              <li title="Quantidade de Disciplinas">
                <BiBookOpen />
                {curso.disciplinas.length}
              </li>
            </ul>
          </article>
        ))}
        <div className="add_data">
          <h3>Adicionar Curso</h3>
        </div>
      </div>
    </>
  );
}
