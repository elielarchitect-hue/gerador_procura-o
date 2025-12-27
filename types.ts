
export interface ProcuracaoData {
  // Outorgante (Grantor)
  outorgante_nome: string;
  outorgante_cpf: string;
  outorgante_endereco: string;
  outorgante_numero: string;
  outorgante_bairro: string;
  outorgante_cidade_uf: string;
  outorgante_cep: string;

  // Procurador (Attorney)
  procurador_nome: string;
  procurador_rg: string;
  procurador_cpf: string;

  // Veículo (Vehicle)
  veiculo_marca_modelo: string;
  veiculo_placa: string;
  veiculo_ano: string;
  veiculo_renavam: string;
  veiculo_chassi: string;
  veiculo_cor: string;

  // Local/Data (Location/Date)
  local_assinatura: string;
  data_assinatura: string;
}
