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
    <div className="bg-slate-700 h-96 w-96">
      <button className='bg-emerald-600 h-10 w-10' onClick={onClose}>закрыть</button>
      <div className="bg-red-700 h-[100px] w-[100px]">like</div>
    </div>
  );
}

export default App;