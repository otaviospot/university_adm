import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MobileHeader from './components/MobileHeader/MobileHeader';
import Sidebar from './components/Sidebar/Sidebar';
import Cursos from './pages/Cursos/Cursos';
import Curso from './pages/Curso/Curso';
import Disciplinas from './pages/Disciplinas/Disciplinas';
import Alunos from './pages/Alunos/Alunos';
import Professores from './pages/Professores/Professores';

import './Main.scss';

export default class Main extends Component {
  state = {
    menuOpen: false,
  };

  handleMenu = () => {
    const { menuOpen } = this.state;
    menuOpen
      ? this.setState({ menuOpen: false })
      : this.setState({ menuOpen: true });
  };

  render() {
    const { menuOpen } = this.state;
    return (
      <>
        <BrowserRouter>
          <MobileHeader handleMenu={this.handleMenu} />
          <Sidebar menuOpen={menuOpen} handleMenu={this.handleMenu} />
          <div className="main_content">
            <ToastContainer autoClose={4000} />
            <Routes>
              <Route path="/" element={<Cursos />} />
              <Route path="/cursos/:id" element={<Curso />} />
              <Route path="/Cursos" element={<Cursos />} />
              <Route path="/disciplinas" element={<Disciplinas />} />
              <Route path="/alunos" element={<Alunos />} />
              <Route path="/professores" element={<Professores />} />
            </Routes>
          </div>
        </BrowserRouter>
      </>
    );
  }
}
