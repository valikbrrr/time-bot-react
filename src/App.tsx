import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tg] = useState<WebApp | null>(null);

  useEffect(() => {
    const telegram = window.Telegram?.WebApp;
    if (telegram) {
      telegram.ready(); // Инициализация
    }
  }, []);

  const onClose = () => {
    if (tg) {
      tg.close();
    }
  };

  return (
    <div className="bg-slate-700">
      <button className='bg-emerald-600' onClick={onClose}>закрыть</button>
      <div className="bg-red-700">like</div>
    </div>
  );
}

export default App;