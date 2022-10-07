import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Loading from '../../components/Loading/Loading';
import { BiX } from 'react-icons/bi';
import axios from '../../services/axios';
import './AddUser.scss';

export default function AddUser({ isOpen, handleOpen, getData }) {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [wage, setWage] = useState('');
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

    if (!regexpName.test(name)) {
      toast.error('É necessário cadastrar nome e sobrenome');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      const disciplinaId = '';
      await axios.post(`/professores`, {
        name,
        birthday,
        wage,
        disciplinaId,
      });
      toast.success(`Professor(a) criado(a) com sucesso!`);
      setIsLoading(false);
      handleOpen();
      setName('');
      setBirthday('');
      setWage('');
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={`form_add ${isOpen ? 'open' : ''}`}>
      <Loading isLoading={isLoading} />
      <h2>Adicionar Professor</h2>
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
          <label>Salário</label>
          <input
            type="number"
            id="wage"
            name="wage"
            value={wage}
            onChange={(e) => setWage(e.target.value)}
            required
          />
        </fieldset>
        <button type="submit">Adicionar Professor</button>
      </form>
    </section>
  );
}

AddUser.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
