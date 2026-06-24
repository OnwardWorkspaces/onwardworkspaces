import logo from './logo.svg';
import './App.css';
import './assets/css/style.css';
import './assets/css/resposive.css';
// import "./assets/scss/error.scss";
import { Counter } from './Counter';
import Header from './pages/components/Header';
import 'bootstrap/dist/css/bootstrap.css';
import Router from './route/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <main id="main-content">
      <div className="wrapper">
        <ToastContainer />
        <Router />
      </div>
    </main>
  );
}

export default App;
