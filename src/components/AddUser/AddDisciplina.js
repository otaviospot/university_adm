import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Loading from '../../components/Loading/Loading';
import { BiX } from 'react-icons/bi';
import axios from '../../services/axios';
import './AddUser.scss';

export default function AddDisciplina({ isOpen, handleOpen, getData, count }) {
  const [professores, setProfessores] = useState([]);
  const [name, setName] = useState('');
  const [cursoId, setCurso] = useState('');
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getProf = async () => {
    setIsLoading(true);
    const getProfessores = await axios.get('/professores');
    setProfessores(getProfessores.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getProf();
  }, []);

  function findProfNoCourse(p) {
    if (p.disciplinaId === '') return p;
  }

  const profNoCourse = professores.filter(findProfNoCourse);

  const handleClose = (e) => {
    handleOpen();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (name.length < 3 || name.length > 50) {
      toast.error('O nome da disciplina precisa ter entre 3 e 50 caracteres.');
      formErrors = true;
    }

    if (cursoId === 'none' || cursoId === '') {
      toast.error('Selecione o curso');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      const disciplinaId = (count + 1).toString();
      await axios.post(`/cursos/${cursoId}/disciplinas`, {
        name,
        cursoId,
      });
      await axios.put(`/professores/${id}`, {
        disciplinaId,
      });
      toast.success(`Disciplina criada com sucesso!`);
      setIsLoading(false);
      handleOpen();
      setName('');
      setCurso('');
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section data-test={count} className={`form_add ${isOpen ? 'open' : ''}`}>
      <Loading isLoading={isLoading} />
      <h2>Adicionar Disciplina</h2>
      <button className="close_formAdd" onClick={handleClose}>
        <BiX />
      </button>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>Nome da Disciplina</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </fieldset>
        <fieldset>
          <label>Curso</label>
          <select
            id="curso"
            name="curso"
            data-value={cursoId}
            onChange={(e) => setCurso(e.target.value)}
          >
            <option value="none">Selecione o Curso</option>
            <option value="1">Desenvolvimento Front-End</option>
            <option value="2">Desenvolvimento Back-End</option>
            <option value="3">Desenvolvimento Mobile</option>
          </select>
        </fieldset>
        <fieldset>
          <label>Professor</label>
          <select
            disabled={profNoCourse.length === 0 ? true : false}
            id="prof"
            name="prof"
            onChange={(e) => setId(e.target.value)}
          >
            <option value="none">
              {profNoCourse.length === 0
                ? 'Nenhum Professor Disponível'
                : 'Selecione o Professor'}
            </option>
            {profNoCourse.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.name}
              </option>
            ))}
          </select>
        </fieldset>
        <button type="submit">Adicionar Disciplina</button>
      </form>
    </section>
  );
}

AddDisciplina.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
};
