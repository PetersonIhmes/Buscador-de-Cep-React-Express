import {useState} from 'react';
import {FiSearch} from 'react-icons/fi';
import './style.css';
import api from './services/api';

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});
 async function handleSearch() {
    if (input === ''){
      alert ("preencha algum cep")
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")
    } catch {
      alert ("Erro ao Buscar");
      setInput("")
    }
  }
  return (
    <div className="conteiner">
        <h1 className="title"> Buscador de Cep </h1>
        
        <div className="conInput">
        <input type="text"
        placeholder="Digite seu Cep.."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        
    
        <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size="25" color="#fff"/>
        </button>
        </div>
      
      {Object.keys(cep).legth > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logadouro} </span>
          <span>Complemento:{cep.complemento}</span>
          <span> Bairro: {cep.bairro} </span>
          <span> Estado:{cep.uf}</span>
        </main>
      )}
      
    </div>
  );
}

export default App;
