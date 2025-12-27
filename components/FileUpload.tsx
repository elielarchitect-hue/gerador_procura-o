
import React, { useCallback, useState } from 'react';
import type { ProcuracaoData } from '../types';
import { UploadIcon } from './icons';

declare const XLSX: any;

interface FileUploadProps {
  onFileParsed: (data: ProcuracaoData[], fileName: string) => void;
  onError: (message: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileParsed, onError }) => {
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback((file: File) => {
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = event.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);
          onFileParsed(jsonData as ProcuracaoData[], file.name);
        } catch (e) {
            console.error(e);
            onError("Ocorreu um erro ao processar o arquivo. Verifique se o formato está correto.");
        }
      };
      reader.onerror = () => {
          onError("Não foi possível ler o arquivo.");
      }
      reader.readAsBinaryString(file);
    } else {
        onError("Por favor, selecione um arquivo Excel (.xlsx).");
    }
  }, [onFileParsed, onError]);

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
        <label 
            htmlFor="dropzone-file" 
            className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon className="w-10 h-10 mb-3 text-gray-400"/>
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Clique para carregar</span> ou arraste e solte</p>
                <p className="text-xs text-gray-500">Arquivo .XLSX ou .XLS</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" accept=".xlsx, .xls" onChange={handleFileChange} />
        </label>
    </div>
  );
};

export default FileUpload;
