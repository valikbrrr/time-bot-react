const MonthBranch = () => {
  return (
    <div className="container bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden">
      <div className="my-10">
        <div className="text-center pt-8 text-4xl mb-4">Месяц</div>
        <div className="text-center text-3xl mb-20 w-full">Выберите формат ввода времени</div>
        <div className="flex">
          <div className="w-[70%] mx-[15%]">
            <div className="flex flex-col items-center pt-5">
              <button
                className='bg-emerald-600 rounded-xl p-2 w-full mb-4'
              >
                Добавить часы за месяц
              </button>
              <button
                className='bg-emerald-600 rounded-xl p-2 w-full'
              >
                Посмотреть ранее введённые часы
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthBranch;