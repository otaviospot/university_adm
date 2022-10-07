import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../services/axios';
import Loading from '../../components/Loading/Loading';

import './Curso.scss';

export default function Curso() {
  const [curso, setCurso] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { id } = params;

  React.useEffect(() => {
    async function getDataCurso() {
      setIsLoading(true);
      const getCurso = await axios.get(`/cursos/${id}`);
      const getDisciplinas = await axios.get(`/cursos/${id}/disciplinas`);
      const getAlunos = await axios.get(`/cursos/${id}/alunos`);
      setCurso(getCurso.data);
      setDisciplinas(getDisciplinas.data);
      setAlunos(getAlunos.data);
      setIsLoading(false);
    }

    getDataCurso();
  }, [id]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <h1>{curso.name}</h1>
      <div className="list_curso_info">
        <div className="curso_disciplinas">
          <h2>Disciplinas:</h2>
          <ul className="list_disciplinas">
            {disciplinas.map((disciplina) => (
              <li key={disciplina.id}>
                <p>{disciplina.name}</p>
                <span>Semestre: {disciplina.semesterId}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="curso_alunos">
          <h2>Alunos Matriculados:</h2>
          <ul className="list_alunos">
            {alunos.map((aluno) => (
              <li key={aluno.registration}>
                <p>{aluno.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
