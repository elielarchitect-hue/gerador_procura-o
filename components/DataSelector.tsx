
import React from 'react';
import type { ProcuracaoData } from '../types';

interface DataSelectorProps {
  data: ProcuracaoData[];
  onRecordSelect: (record: ProcuracaoData) => void;
  selectedRecord: ProcuracaoData | null;
}

const DataSelector: React.FC<DataSelectorProps> = ({ data, onRecordSelect, selectedRecord }) => {
  if (data.length === 0) {
    return null;
  }
  
  const headers: {key: keyof ProcuracaoData; label: string}[] = [
      { key: 'outorgante_nome', label: 'Outorgante' },
      { key: 'outorgante_cpf', label: 'CPF Outorgante' },
      { key: 'procurador_nome', label: 'Procurador' },
      { key: 'procurador_cpf', label: 'CPF Procurador' },
      { key: 'veiculo_marca_modelo', label: 'Veículo' },
      { key: 'veiculo_placa', label: 'Placa' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
            <tr>
              {headers.map(header => (
                <th key={header.key} scope="col" className="px-6 py-3">{header.label}</th>
              ))}
              <th scope="col" className="px-6 py-3 text-right">
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const isSelected = selectedRecord && JSON.stringify(selectedRecord) === JSON.stringify(row);
              return (
                <tr key={index} className={`border-b hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : 'bg-white'}`}>
                  {headers.map(header => (
                    <td key={header.key} className="px-6 py-4">{String(row[header.key] || '')}</td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onRecordSelect(row)}
                      className={`font-medium py-2 px-4 rounded-md transition-colors ${
                        isSelected 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {isSelected ? 'Selecionado' : 'Gerar'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataSelector;
