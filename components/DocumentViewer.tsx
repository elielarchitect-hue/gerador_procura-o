
import React, { useRef, useState } from 'react';
import type { ProcuracaoData } from '../types';
import { DownloadIcon, CopyIcon, CheckIcon, EditIcon, NewDocumentIcon, SpinnerIcon } from './icons';

declare const html2canvas: any;
declare const jspdf: any;

interface DocumentViewerProps {
  record: ProcuracaoData;
  onEdit: () => void;
  onNew: () => void;
}

const Highlight: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <span className="font-bold text-black bg-yellow-200 px-1 py-0.5 rounded-sm">{children}</span>
);

const DocumentViewer: React.FC<DocumentViewerProps> = ({ record, onEdit, onNew }) => {
  const documentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPdf = () => {
    const input = document.getElementById('printable-area');
    if (!input || isGeneratingPdf) return;

    setIsGeneratingPdf(true);
    
    // Temporariamente remove os destaques para um PDF mais limpo
    const highlights = input.querySelectorAll('.bg-yellow-200');
    highlights.forEach(el => el.classList.remove('bg-yellow-200', 'px-1', 'py-0.5', 'rounded-sm'));

    html2canvas(input, { scale: 2, useCORS: true })
        .then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const canvasAspectRatio = canvasWidth / canvasHeight;
            const margin = 15;
            const contentWidth = pdfWidth - (margin * 2);
            const contentHeight = contentWidth / canvasAspectRatio;

            pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, contentHeight);
            pdf.save('procuracao.pdf');
        })
        .finally(() => {
            // Adiciona os destaques de volta à visualização
            highlights.forEach(el => el.classList.add('bg-yellow-200', 'px-1', 'py-0.5', 'rounded-sm'));
            setIsGeneratingPdf(false);
        });
  };
  
  const handleCopy = () => {
    if (documentRef.current) {
        navigator.clipboard.writeText(documentRef.current.innerText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto">
        <div className="p-4 border-b flex justify-between items-center print:hidden bg-gray-50 rounded-t-lg">
            <button onClick={onNew} className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                <NewDocumentIcon className="h-5 w-5 mr-2" />
                Nova Procuração
            </button>
            <div className="flex items-center space-x-2">
                <button onClick={onEdit} className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                    <EditIcon className="h-5 w-5 mr-2" />
                    Editar
                </button>
                <button onClick={handleCopy} className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                    {copied ? <CheckIcon className="h-5 w-5 mr-2 text-green-600" /> : <CopyIcon className="h-5 w-5 mr-2" />}
                    {copied ? 'Copiado!' : 'Copiar'}
                </button>
                <button 
                    onClick={handleDownloadPdf}
                    disabled={isGeneratingPdf}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm disabled:bg-blue-400 disabled:cursor-not-allowed w-36 justify-center"
                >
                    {isGeneratingPdf ? (
                        <>
                            <SpinnerIcon className="h-5 w-5 mr-2 animate-spin"/>
                            <span>Gerando...</span>
                        </>
                    ) : (
                        <>
                            <DownloadIcon className="h-5 w-5 mr-2"/>
                            <span>Baixar PDF</span>
                        </>
                    )}
                </button>
            </div>
        </div>
        <div id="printable-area" ref={documentRef} className="p-10 md:p-16 font-sans text-gray-800 leading-relaxed uppercase bg-white">
            <h2 className="text-center font-bold text-xl mb-8">Procuração</h2>
            <p className="text-justify mb-6 indent-8">
                PELO PRESENTE INSTRUMENTO PARTICULAR DE PROCURAÇÃO EU <Highlight>{record.outorgante_nome}</Highlight> CPF: <Highlight>{record.outorgante_cpf}</Highlight> RESIDENTE NO ENDEREÇO: <Highlight>{record.outorgante_endereco}, {record.outorgante_numero}</Highlight> BAIRRO: <Highlight>{record.outorgante_bairro}</Highlight> <Highlight>{record.outorgante_cidade_uf}</Highlight> CEP: <Highlight>{record.outorgante_cep}</Highlight> NOMEIO E CONSTITUO COMO MEU PROCURADOR O SR. (A) <Highlight>{record.procurador_nome}</Highlight> R.G.: <Highlight>{record.procurador_rg}</Highlight>, CPF: <Highlight>{record.procurador_cpf}</Highlight>, COM PODERES PARA: REPRESENTAR-ME JUNTO AO DETRAN, PODENDO SOLICITAR E RETIRAR A 2ª VIA DO CRV, CRLV, EFETUAR TRANSFERÊNCIA EM MEU NOME, SOLICITAR O PRIMEIRO EMPLACAMENTO, RETIRAR O VEÍCULO DO PÁTIO, EFETUAR PARCELAMENTOS, ALTERAÇÃO DE DADOS, ALTERAÇÃO DE CARACTERÍSTICA, RECADASTRAMENTO, SOLICITAR A BAIXA DO MESMO, REATIVAÇÃO, ASSINAR O RECIBO DE TRANSFERÊNCIA, PODENDO PASSAR PARA O SEU PRÓPRIO NOME OU A TERCEIROS, ASSINAR TERMOS E DECLARAÇÕES, BAIXA DEFINITIVA DO VEÍCULO, ASSINAR DECLARAÇÃO DE RESIDÊNCIA, NÃO PODENDO SUBSTABELECER.
            </p>
            <p className="text-justify font-bold uppercase mb-4">Informações do Veículo:</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm mb-12">
                <p>MARCA/MODELO: <Highlight>{record.veiculo_marca_modelo}</Highlight></p>
                <p>PLACA: <Highlight>{record.veiculo_placa}</Highlight></p>
                <p>ANO: <Highlight>{record.veiculo_ano}</Highlight></p>
                <p>RENAVAM: <Highlight>{record.veiculo_renavam}</Highlight></p>
                <p>CHASSI: <Highlight>{record.veiculo_chassi}</Highlight></p>
                <p>COR: <Highlight>{record.veiculo_cor}</Highlight></p>
            </div>
            
            <p className="text-center mb-16">
                <Highlight>{record.local_assinatura}</Highlight>, <Highlight>{record.data_assinatura}</Highlight>
            </p>
            
            <div className="w-4/5 mx-auto text-center">
                <div className="border-t border-gray-600 pt-2 mb-1">
                    <p className="font-semibold"><Highlight>{record.procurador_nome}</Highlight></p>
                </div>
                <p className="text-sm">CPF: <Highlight>{record.procurador_cpf}</Highlight></p>
            </div>

            <p className="text-center mt-24 text-sm font-semibold">
                ASSINATURA E RECONHECER FIRMA (AUTENTICIDADE)
            </p>
        </div>
    </div>
  );
};

export default DocumentViewer;
