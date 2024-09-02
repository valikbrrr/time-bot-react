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

  console.log(tg);

  const onClose = () => {
    tg?.close()
  }

  return (
    <div className="bg-slate-700">
      <div className="">Добров пожаловать!<br /> Выберите формат ввода времени</div>
      <div className="">      <button className='bg-red-600 border-2 border-black rounded-2xl p-1' onClick={onClose}>закрыть
      </button></div>
      <button className='bg-emerald-600 align-middle '>Учёт времени по месяцам</button>
      <button className='bg-emerald-600'>Учёт времени по проектам</button>
    </div>
  );
}

export default App;