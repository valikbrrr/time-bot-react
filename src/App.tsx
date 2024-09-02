// import { useEffect } from 'react';
import './App.css';

// const tg = window.Telegram?.WebApp;

function App() {

  // useEffect(() => {
  //     tg.ready(); // Инициализация
  // }, []);


  // const onClose = () => {
  //   tg.close()
  // }

  return (
    <div className="bg-[#26425A] w-screen h-screen">
      <div className="text-center pt-8">Добро пожаловать!</div>
      <div className="text-center">Выберите формат ввода времени</div>
      <div className="">      
      </div>
      <div className="flex justify-evenly pt-5">
      <button className='bg-emerald-600 rounded-xl p-2'>Учёт времени по месяцам</button>

      <button className='bg-emerald-600 rounded-xl p-2'>Учёт времени по проектам</button>
      </div>
    </div>
  );
}

export default App;