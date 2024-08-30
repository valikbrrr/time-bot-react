import { useEffect } from 'react';
import './App.css';
console.log(Window);

const tg = window.Telegram.WebApp

function App() {

  useEffect(() => {
    tg.ready()
  }, [])

  const onClose = () => {
    tg.close()
  }

  return (
    <div className="App">
      <button className='bg-emerald-600' onClick={onClose}>закрыть</button>
    </div>
  );
}

export default App;
