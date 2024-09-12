import BackArrow from "../../assets/BackArrow"

const CreateNewProject = () => {
    return (
        <div className="bg-[#26425A] w-full h-full min-h-screen min-w-screen overflow-hidden flex flex-col justify-between">
            <BackArrow lastPage={"/addhoursproject"} />
            <div className="pt-8 px-[10%]">
                <div className="text-center text-white text-3xl mb-4">
                    Введите название нового проекта
                </div>
            </div>
            <div className="flex justify-center mb-40">
                <div className="w-[60%]">
                    <input className="w-full h-8 py-1 px-2 rounded-xl outline-none" type="text" placeholder="Введите название проекта..." />
                </div>
            </div>
        </div>
    )
}

export default CreateNewProject