import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Loading from '../../components/Loading/Loading';
import { BiX } from 'react-icons/bi';
import axios from '../../services/axios';
import './AddUser.scss';

export default function AddAluno({ isOpen, handleOpen, getData }) {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [cursoId, setCurso] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (e) => {
    handleOpen();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;
    var regexpName = /[a-zA-Z]+\s+[a-zA-Z]+/g;

    if (name.length < 3 || name.length > 50) {
      toast.error('O nome precisa ter entre 3 e 50 caracteres.');
      formErrors = true;
    }

    if (cursoId === 'none' || cursoId === '') {
      toast.error('Selecione o curso');
      formErrors = true;
    }

    if (!regexpName.test(name)) {
      toast.error('É necessário cadastrar nome e sobrenome');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      const registration =
        Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
      await axios.post(`/cursos/${cursoId}/alunos`, {
        name,
        birthday,
        registration,
        cursoId,
      });
      toast.success(`Aluno(a) criado(a) com sucesso!`);
      setIsLoading(false);
      handleOpen();
      setName('');
      setBirthday('');
      setCurso('');
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={`form_add ${isOpen ? 'open' : ''}`}>
      <Loading isLoading={isLoading} />
      <h2>Adicionar Aluno</h2>
      <button className="close_formAdd" onClick={handleClose}>
        <BiX />
      </button>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>Nome</label>
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
          <label>Data de Nascimento</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
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
        <button type="submit">Adicionar Aluno</button>
      </form>
    </section>
  );
}

AddAluno.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
