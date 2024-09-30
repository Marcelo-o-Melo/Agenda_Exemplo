"use client";
import { useState } from "react";
import db from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

interface FormProps {
    onClose: () => void;
    selectedDate: string;
}

export default function Form({ onClose, selectedDate }: FormProps) {
    const [nome, setNome] = useState('');
    const [data, setData] = useState(selectedDate);
    const [desc, setDesc] = useState('');
    const [hora, setHora] = useState('');

    const salvarForm = async () => {
        try {
            //adiciona um novo item à coleção 'eventos'
            await addDoc(collection(db, 'eventos'), {
                nome,
                data,
                desc,
                hora
            });
            console.log('Evento salvo com sucesso!');
            onClose(); //fecha e salva
        } catch (error) {
            console.error("Erro ao salvar o evento: ", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-4xl"
                >
                    &times; {/* X */}
                </button>
                <h2 className="mb-4">Adicionar Evento</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Nome do evento"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="mb-2 p-1 border border-gray-300 rounded w-full"
                    />
                    <input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="mb-2 p-1 border border-gray-300 rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="mb-2 p-1 border border-gray-300 rounded w-full"
                    />
                    <input
                        type="time"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        className="mb-2 p-1 border border-gray-300 rounded w-full"
                    />
                </div>
                <button
                    onClick={salvarForm}
                    className="mt-4 p-2 bg-blue-500 rounded text-white w-full hover:bg-blue-600"
                >
                    Salvar
                </button>
            </div>
        </div>
    );
}
