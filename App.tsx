
import React, { useState } from 'react';
import type { ProcuracaoData } from './types';
import DocumentViewer from './components/DocumentViewer';
import Header from './components/Header';
import ProcuracaoForm from './components/ProcuracaoForm';

const App: React.FC = () => {
  const [record, setRecord] = useState<ProcuracaoData | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const handleFormSubmit = (data: ProcuracaoData) => {
    setRecord(data);
    setShowPreview(true);
  };

  const handleEdit = () => {
    setShowPreview(false);
  };

  const handleNewProcuracao = () => {
    setRecord(null);
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {!showPreview ? (
          <ProcuracaoForm onFormSubmit={handleFormSubmit} initialData={record} />
        ) : (
          record && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-center">Visualização do Documento</h2>
              <DocumentViewer record={record} onEdit={handleEdit} onNew={handleNewProcuracao} />
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default App;
