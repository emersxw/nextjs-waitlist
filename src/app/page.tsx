"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { StatusMessage } from "@/components/molecules/StatusMessage";
import { WaitlistForm } from "@/components/organisms/WaitlistForm";
import { type InputStatus, type FormFields } from "@/types";

const INITIAL_FORM_STATE: FormFields = {
  name: "",
  email: "",
};

const LOADING_DELAY = 100;
const RESPONSE_DELAY = 10;

export default function WaitlistPage() {
  const [formData, setFormData] = useState<FormFields>(INITIAL_FORM_STATE);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<InputStatus>("idle");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, LOADING_DELAY));

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      await new Promise((resolve) => setTimeout(resolve, RESPONSE_DELAY));

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(`Olá ${data.name}! Você está na lista de espera.`);
        setFormData(INITIAL_FORM_STATE);
      } else {
        setStatus("error");
        setMessage(`Erro: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setMessage("Ocorreu um erro. Por favor, tente novamente.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Inquitab</h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Obtenha respostas instantâneas para suas questões online com apenas alguns cliques.
            Perfeito para estudantes que buscam entender tópicos complexos rapidamente.
          </p>
        </div>

        <div className="max-w-sm mx-auto mb-16">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-px rounded-xl mb-6">
            <div className="bg-black rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-white uppercase tracking-wider">Beta Fechado</span>
              </div>
              <p className="text-sm text-center text-zinc-300 mb-2">
                Estamos selecionando um grupo limitado de usuários para testar o Inquitab
              </p>
              <p className="text-xs text-center text-zinc-400 mb-3">
                Os usuários beta terão acesso vitalício gratuito à extensão
              </p>
              <div className="text-center border-t border-zinc-800 pt-3">
                <p className="text-xs text-zinc-400">
                  Após o período beta, a extensão custará
                  <span className="text-white font-medium ml-1">R$ 10/mês</span>
                </p>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-center mb-6">Entre na Lista de Espera</h2>
          <WaitlistForm
            formData={formData}
            status={status}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            translations={{
              name: "Nome",
              email: "E-mail",
              join: "Participar",
              joining: "Processando...",
            }}
          />
          <div className="mt-4">
            <StatusMessage status={status} message={message} />
          </div>
        </div>

        <div className="mb-16 rounded-lg overflow-hidden shadow-2xl">
          <video 
            className="w-full"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="/videos/demo.mp4" type="video/mp4" />
            Seu navegador não suporta a tag de vídeo.
          </video>
        </div>

        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-600/20 mb-6">
            <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.4 7.5C22.2 8.3 22.2 9.6 21.4 10.3L18.6 13.1L15.8 10.3C15 9.6 15 8.3 15.8 7.5C16.5 6.7 17.8 6.7 18.6 7.5L19.2 8.1L19.8 7.5C20.6 6.7 21.9 6.7 22.6 7.5H21.4ZM13 19.9L14.3 21.2C13.6 21.7 12.6 22 11.5 22C8.5 22 6 19.5 6 16.5V13.7L4.7 15C4.3 15.4 3.7 15.4 3.3 15L2.7 14.4C2.3 14 2.3 13.4 2.7 13L6.7 9C7.1 8.6 7.7 8.6 8.1 9L12.1 13C12.5 13.4 12.5 14 12.1 14.4L11.5 15C11.1 15.4 10.5 15.4 10.1 15L8.8 13.7V16.5C8.8 17.9 10 19 11.4 19C12.2 19 12.9 18.6 13.4 18.1L14.7 19.4C14.3 19.8 13.7 19.9 13.1 19.9H13Z"/>
            </svg>
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Powered by AI
            </span>
          </div>
          <h2 className="text-3xl font-semibold mb-4">Inteligência Artificial Avançada</h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            O Inquitab utiliza modelos de IA de última geração para analisar questões, 
            identificar respostas corretas e fornecer explicações detalhadas que ajudam 
            você a realmente entender o conteúdo.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-12">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img 
                  src="/images/step1.png" 
                  alt="Passo 1: Detecção automática" 
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Detecção Inteligente</h3>
              <p className="text-center text-zinc-500 dark:text-zinc-400">
                O Inquitab identifica automaticamente as questões na página
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img 
                  src="/images/step2.png" 
                  alt="Passo 2: Destaque da resposta" 
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Resposta Instantânea</h3>
              <p className="text-center text-zinc-500 dark:text-zinc-400">
                A extensão destaca automaticamente a resposta correta e fornece explicações detalhadas
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Respostas Rápidas</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Obtenha explicações instantâneas com apenas dois cliques</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Análise Inteligente</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Respostas baseadas em IA que ajudam você a entender conceitos</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Fácil de Usar</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Interface simples que funciona em qualquer plataforma de aprendizado</p>
          </div>
        </div>
      </div>
    </main>
  );
}
