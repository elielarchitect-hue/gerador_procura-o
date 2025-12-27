
import React, { useState, FormEvent } from 'react';
import type { ProcuracaoData } from '../types';

const emptyForm: ProcuracaoData = {
  outorgante_nome: '', outorgante_cpf: '', outorgante_endereco: '', outorgante_numero: '',
  outorgante_bairro: '', outorgante_cidade_uf: '', outorgante_cep: '',
  procurador_nome: '', procurador_rg: '', procurador_cpf: '',
  veiculo_marca_modelo: '', veiculo_placa: '', veiculo_ano: '', veiculo_renavam: '',
  veiculo_chassi: '', veiculo_cor: '',
  local_assinatura: '', data_assinatura: '',
};

interface ProcuracaoFormProps {
  onFormSubmit: (data: ProcuracaoData) => void;
  initialData: ProcuracaoData | null;
}

const InputField: React.FC<{label: string; name: keyof ProcuracaoData; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean; placeholder?: string}> = 
({ label, name, value, onChange, required = true, placeholder }) => (
    <div>
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
        <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder || `Digite ${label.toLowerCase()}`}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
    </div>
);

const FormSection: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <fieldset className="border p-4 rounded-lg mb-6">
        <legend className="text-lg font-semibold px-2 text-gray-700">{title}</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
            {children}
        </div>
    </fieldset>
);


const ProcuracaoForm: React.FC<ProcuracaoFormProps> = ({ onFormSubmit, initialData }) => {
  const [formData, setFormData] = useState<ProcuracaoData>(initialData || emptyForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">Dados para a Procuração</h2>
        <p className="text-center text-gray-500 mb-8">Preencha todos os campos abaixo para gerar o documento.</p>
        <form onSubmit={handleSubmit}>
            <FormSection title="Dados do Outorgante">
                <InputField label="Nome Completo" name="outorgante_nome" value={formData.outorgante_nome} onChange={handleChange} />
                <InputField label="CPF" name="outorgante_cpf" value={formData.outorgante_cpf} onChange={handleChange} placeholder="000.000.000-00" />
                <InputField label="Endereço" name="outorgante_endereco" value={formData.outorgante_endereco} onChange={handleChange} placeholder="Rua, Av, etc." />
                <InputField label="Número" name="outorgante_numero" value={formData.outorgante_numero} onChange={handleChange} />
                <InputField label="Bairro" name="outorgante_bairro" value={formData.outorgante_bairro} onChange={handleChange} />
                <InputField label="Cidade/UF" name="outorgante_cidade_uf" value={formData.outorgante_cidade_uf} onChange={handleChange} placeholder="Ex: São Paulo/SP" />
                <InputField label="CEP" name="outorgante_cep" value={formData.outorgante_cep} onChange={handleChange} placeholder="00000-000" />
            </FormSection>

            <FormSection title="Dados do Procurador">
                <InputField label="Nome Completo" name="procurador_nome" value={formData.procurador_nome} onChange={handleChange} />
                <InputField label="RG" name="procurador_rg" value={formData.procurador_rg} onChange={handleChange} placeholder="00.000.000-0" />
                <InputField label="CPF" name="procurador_cpf" value={formData.procurador_cpf} onChange={handleChange} placeholder="000.000.000-00" />
            </FormSection>
            
            <FormSection title="Dados do Veículo">
                <InputField label="Marca/Modelo" name="veiculo_marca_modelo" value={formData.veiculo_marca_modelo} onChange={handleChange} placeholder="Ex: FIAT/UNO" />
                <InputField label="Placa" name="veiculo_placa" value={formData.veiculo_placa} onChange={handleChange} placeholder="ABC-1234" />
                <InputField label="Ano" name="veiculo_ano" value={formData.veiculo_ano} onChange={handleChange} placeholder="Ex: 2023/2024" />
                <InputField label="Renavam" name="veiculo_renavam" value={formData.veiculo_renavam} onChange={handleChange} />
                <InputField label="Chassi" name="veiculo_chassi" value={formData.veiculo_chassi} onChange={handleChange} />
                <InputField label="Cor" name="veiculo_cor" value={formData.veiculo_cor} onChange={handleChange} />
            </FormSection>

            <FormSection title="Local e Data">
                <InputField label="Local da Assinatura" name="local_assinatura" value={formData.local_assinatura} onChange={handleChange} placeholder="Ex: Rio de Janeiro" />
                <InputField label="Data da Assinatura" name="data_assinatura" value={formData.data_assinatura} onChange={handleChange} placeholder="Ex: 25 de Dezembro de 2024"/>
            </FormSection>

            <div className="mt-8 flex justify-end">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-base">
                    Gerar e Visualizar Procuração
                </button>
            </div>
        </form>
    </div>
  );
};

export default ProcuracaoForm;
