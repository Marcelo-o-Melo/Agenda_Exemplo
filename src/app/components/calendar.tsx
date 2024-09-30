"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Form from './form';

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [formVisible, setFormVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>('');

    const daysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };
    
    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const previousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const renderDays = () => {
        const days = [];
        const totalDays = daysInMonth(currentMonth, currentYear);

        for (let i = 1; i <= totalDays; i++) {
            days.push(
                <div className="relative" key={i}>
                    <div className="border border-gray-300 rounded cursor-pointer shadow-lg hover:bg-gray-300" onClick={() => handleClick(i, currentMonth, currentYear)}>
                        {i}
                    </div>
                </div>
            );
        }
        return days;
    };

    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const handleClick = (dia: number, mes: number, ano: number) => {
        const dateString = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        console.log(`dia clicado: ${dia}/${mes}/${ano}`);
        setSelectedDate(dateString); // define a data selecionada no formato YYYY-MM-DD
        toggleFormVisibility(); // exibe o formulario ao clicar
    };

    const toggleFormVisibility = () => {
        setFormVisible(prev => !prev);
    };

    return (
        <div className=' w-[500px] h-[400px] bg-red border border-gray-600 rounded bg-white text-black text-2xl shadow-lg'>
            {/* Mes */}
            <div className='flex items-center text-center whitespace-nowrap bg-gray-600 w-[100%] h-[60px] shadow-lg border rounded text-white'>
                <button className='flex justify-center items-center border rounded hover:bg-gray-800 h-[33px] w-[33px] ml-20' onClick={previousMonth}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span className="border mx-auto px-5 rounded">{monthNames[currentMonth]} {currentYear}</span>
                <button className='flex rounded justify-center items-center border hover:bg-gray-800 h-[33px] w-[33px] mr-20' onClick={nextMonth}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            {/* Semana e Dia */}
            <div className="mt-5 px-5">
                {/* Semana */}
                <div className='grid grid-cols-7 gap-4 mb-2'>
                    <div className="flex items-center justify-center text-red-400">Dom</div>
                    <div className="flex items-center justify-center">Seg</div>
                    <div className="flex items-center justify-center">Ter</div>
                    <div className="flex items-center justify-center">Qua</div>
                    <div className="flex items-center justify-center">Qui</div>
                    <div className="flex items-center justify-center">Sex</div>
                    <div className="flex items-center justify-center">Sáb</div>
                </div>
                {/* Dia */}
                <div className='grid grid-cols-7 gap-4 text-center'>
                    {renderDays()}
                </div>
            </div>
            {/* Renderiza o Form com a função onClose */}
            {formVisible && <Form onClose={toggleFormVisibility} selectedDate={selectedDate}/>}
        </div>
    );
}
