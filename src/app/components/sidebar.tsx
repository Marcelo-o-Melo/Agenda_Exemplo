"use client";
import { useEffect, useState } from "react";
import db from '../firebase/firebaseConfig';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

// interface para o evento
interface Evento {
  id: string;       // O ID do documento no Firestore
  nome: string;     
  data: string;     
  desc: string;     
  hora: string;     
}

export default function Sidebar() {
  const [eventos, setEventos] = useState<Evento[]>([]);

  //sincronização
  useEffect(() => {
    //inicializa colecao eventos
    const eventosCollection = collection(db, 'eventos');

    //pega as alterações em tempo real na coleção de eventos
    const unsubscribe = onSnapshot(eventosCollection, (eventosSnapshot) => {
      console.log("Eventos atualizados!");
      const eventosList: Evento[] = eventosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Evento, 'id'>, //Omit para garantir que é a chave correta
      }));
      setEventos(eventosList);
    }, (error) => {
      console.error("Erro ao escutar eventos: ", error);
    });

    //para de escutar quando o componente é desmontado
    return () => {
      console.log("Desmontando Sidebar, cancelando escuta");
      unsubscribe(); //cancela a escuta
    };
  }, []);

  //excluir um evento
  const excluirEvento = async (id: string) => {
    try {
      const eventoDoc = doc(db, 'eventos', id); //referência ao documento do evento
      await deleteDoc(eventoDoc); //exclui o documento
      console.log(`Evento com ID ${id} excluído com sucesso.`);
    } catch (error) {
      console.error("Erro ao excluir evento: ", error);
    }
  };

  return (
    <div className="bg-white h-screen w-[300px] p-4 text-black overflow-y-scroll h-screen">
      <h2 className="text-lg font-bold">Eventos</h2>
      <ul className="">
        {eventos.length > 0 ? (
          eventos.map(evento => (
            <li key={evento.id} className="border-b py-2">
              <strong>{evento.nome}</strong>
              <p>Data: {evento.data}</p>
              <p>Descrição: {evento.desc}</p>
              <p>Horário: {evento.hora}</p>
              <button
                onClick={() => excluirEvento(evento.id)}
                className="mt-2 p-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Excluir
              </button>
            </li>
          ))
        ) : (
          <li>Nenhum evento encontrado.</li>
        )}
      </ul>
    </div>
  );
}
