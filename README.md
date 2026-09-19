# 📅 Agenda Digital para Eletricistas Autônomos

Automação gratuita que integra **Google Forms**, **Google Apps Script** e **Google Calendar** para digitalizar o processo de agendamento de eletricistas autônomos com baixa inclusão digital.

Desenvolvido como projeto extensionista da disciplina **Atividade Extensionista II — Tecnologia Aplicada à Inclusão Digital** do Centro Universitário Internacional UNINTER.

---

## 💡 Problema resolvido

Eletricistas autônomos geralmente gerenciam seus agendamentos por memória ou caderno, o que gera perda de clientes, conflito de horários e falta de histórico. Esta solução substitui esse processo por uma agenda digital acessível via smartphone, sem custo e sem necessidade de instalar nenhum aplicativo.

---

## 🔧 Como funciona

```
Cliente escaneia QR code
        ↓
Preenche o Google Forms
(nome, telefone, serviço, data, período)
        ↓
Apps Script é acionado automaticamente
        ↓
Evento criado no Google Calendar do eletricista
        ↓
Eletricista recebe notificação no celular
e confirma o horário via WhatsApp
```

---

## 📋 Pré-requisitos

- Conta Google (Gmail) — gratuita
- Acesso ao [Google Forms](https://forms.google.com)
- Acesso ao [Google Apps Script](https://script.google.com)
- Google Calendar instalado no celular do eletricista

Nenhum outro software ou assinatura é necessário.

---

## 🚀 Como instalar

### 1. Criar o formulário no Google Forms

Crie um formulário com as seguintes perguntas (os nomes precisam ser exatamente iguais):

| Pergunta | Tipo | Obrigatório |
|---|---|---|
| Nome e Sobrenome | Resposta curta | Sim |
| Telefone (WhatsApp) | Resposta curta | Sim |
| Tipo de Serviço | Múltipla escolha | Sim |
| Data preferida | Data | Sim |
| Período Preferido | Múltipla escolha (Manhã / Tarde) | Sim |
| Observações | Parágrafo | Não |

### 2. Abrir o editor de script

Dentro do formulário, clique em **⋮ (três pontinhos) → Editor de script**.

### 3. Colar o código

Apague o conteúdo existente e cole o conteúdo do arquivo [`criarEventoCalendar.js`](./criarEventoCalendar.js).

### 4. Configurar o acionador

- No menu esquerdo, clique no ícone de relógio (**Acionadores**)
- Clique em **+ Adicionar acionador**
- Configure conforme abaixo:

| Campo | Valor |
|---|---|
| Função | `criarEventoCalendar` |
| Implantação | Principal |
| Origem do evento | **Do Formulário** |
| Tipo de evento | **Ao enviar o formulário** |

- Clique em **Salvar** e autorize as permissões solicitadas

### 5. Gerar o QR code

- Clique em **Enviar → aba de link → Encurtar URL** e copie o link
- Acesse [qr-code-generator.com](https://www.qr-code-generator.com), cole o link e baixe o QR code em PNG
- Imprima em um cartão de visita ou adesivo para o eletricista distribuir aos clientes

---

## ✅ Como testar

1. Abra o link do formulário no celular
2. Preencha todos os campos e envie
3. Aguarde até 30 segundos
4. Verifique o Google Calendar — deve aparecer um evento com o título no formato:
   > `Tipo de Serviço — Nome do Cliente`

Em caso de erro, acesse **Apps Script → Execuções** para ver o log detalhado.

---

## 📁 Estrutura do repositório

```
/
├── criarEventoCalendar.js   # Script de automação principal
└── README.md                # Este arquivo
```

---

## 🛠️ Adaptações possíveis

- Alterar os horários de manhã/tarde editando as variáveis `hora_inicio` e `hora_fim`
- Adicionar novos campos ao formulário e mapeá-los no script seguindo o mesmo padrão
- Remover a linha `Logger.log` após confirmar o funcionamento em produção

---

## 📎 Alinhamento com ODS

| ODS | Justificativa |
|---|---|
| **08 — Trabalho Decente e Crescimento Econômico** | Apoia a produtividade e organização de trabalhadores autônomos informais |
| **10 — Redução das Desigualdades** | Oferece acesso a ferramentas digitais sem custo para profissionais com baixa inclusão tecnológica |

---

## 📄 Licença

Uso livre para fins educacionais e não comerciais.
