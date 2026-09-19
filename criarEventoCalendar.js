// Função acionada automaticamente pelo Google Forms ao receber um novo envio.
// Cria um evento no Google Calendar com os dados preenchidos pelo cliente.
function criarEventoCalendar(e) {

  // Obtém a lista de respostas individuais do envio recebido
  var respostas = e.response.getItemResponses();

  // Monta um objeto chave-valor onde a chave é o título da pergunta
  // e o valor é a resposta digitada pelo cliente
  var dados = {};
  for (var i = 0; i < respostas.length; i++) {
    var titulo = respostas[i].getItem().getTitle();
    var valor  = respostas[i].getResponse();
    dados[titulo] = valor;
  }

  // Registra as respostas no log para fins de depuração
  // Pode ser removido após confirmar o funcionamento
  Logger.log(JSON.stringify(dados));

  // Extrai cada campo pelo nome exato da pergunta no formulário.
  // O operador || garante um valor padrão caso a resposta venha vazia.
  var nome     = dados["Nome e Sobrenome"]     || "";
  var telefone = dados["Telefone (WhatsApp)"]  || "";
  var servico  = dados["Tipo de Serviço"]      || "";
  var data     = dados["Data preferida"]       || "";
  var periodo  = dados["Período Preferido"]    || "";
  var obs      = dados["Observações"]          || "Sem observações";

  // Define o horário de início e fim com base no período escolhido.
  // A data já chega do Forms no formato ISO (AAAA-MM-DD), sem necessidade de conversão.
  var hora_inicio = (periodo === "Tarde") ? "13:00" : "08:00";
  var hora_fim    = (periodo === "Tarde") ? "17:00" : "12:00";

  // Combina a data ISO com o horário para criar objetos Date válidos
  var inicio = new Date(data + "T" + hora_inicio + ":00");
  var fim    = new Date(data + "T" + hora_fim    + ":00");

  // Cria o evento na agenda padrão do Google Calendar da conta do eletricista.
  // O título do evento exibe o tipo de serviço e o nome do cliente.
  // A descrição concentra todos os dados relevantes para o atendimento.
  CalendarApp.getDefaultCalendar().createEvent(
    servico + " — " + nome,
    inicio,
    fim,
    {
      description:
        "Cliente: "  + nome     + "\n" +
        "Telefone: " + telefone + "\n" +
        "Serviço: "  + servico  + "\n" +
        "Período: "  + periodo  + "\n" +
        "Obs: "      + obs
    }
  );
}
