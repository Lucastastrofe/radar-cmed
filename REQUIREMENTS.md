# Contrato de requisitos — Radar CMED

Atualizado em 26/09/2026. Demanda explícita: tornar o projeto mais operacional para supply hospitalar, concentrar informações necessárias em uma tela, chamar atenção como tecnologia hospitalar e retirar referências ao processo de criação da interface e documentação.

## Enquadramento do especialista de domínio

Um comprador ou farmacêutico precisa identificar exatamente a apresentação cotada e conferir o valor oferecido contra a referência regulatória pertinente. A decisão incorreta pode usar outro tamanho de embalagem, alíquota ou teto inadequado. A planilha CMED, sozinha, não informa preço praticado, contrato, estoque ou equivalência aprovada pelo hospital.

## Objetivo do incremento

Permitir **triagem de uma cotação por apresentação/GGREM ou de um arquivo com várias cotações**, com consulta da fonte pública e cálculo transparente, sem afirmar conformidade ou economicidade da compra. A tela desktop deve manter os controles e resultados do modo escolhido visíveis sem rolagem da página; listas podem rolar dentro do seu painel.

## Requisitos e aceite

| ID | Requisito | Critério de aceite |
|---|---|---|
| O1 | Identificar apresentação. | Busca por produto, substância, laboratório ou GGREM; resultado mostra apresentação, laboratório e GGREM; seleção atualiza a conferência. |
| O2 | Mostrar tetos corretamente. | PF e PMVG vêm da mesma alíquota selecionada dentre pares existentes na planilha; a seleção é manual e visível. |
| O3 | Contextualizar regra. | Marcações CAP, restrição hospitalar e nota `*` aparecem; PF ou PMVG exige escolha explícita; a marcação CAP aparece como contexto, com aviso de validação. |
| O4 | Conferir cotação. | Entrada local de preço por apresentação e quantidade inteira positiva; cálculo exibe diferença unitária e total aritmético, e compara com a referência escolhida. Não chama o resultado de economia ou aprovação. |
| O5 | Dar acesso às fontes. | Link para lista CMED e para BPS; data da planilha visível. |
| O6 | Caber em uma tela. | Em desktop comum, cabeçalho, busca, seleção, preços, cotação, resultado e verificações cabem na altura sem rolagem do documento; resultados podem ter rolagem interna. Em celular, duas seções alternáveis preservam a tarefa. |
| O7 | Proteger interpretação. | Interface diz que teto não é preço praticado; requer validação de ICMS, regra aplicável e correspondência de apresentação. |
| O8 | Preservar privacidade. | Cotação digitada permanece no navegador da sessão e não é enviada nem salva. Nenhum dado de paciente é requerido. |
| O9 | Importar cotações em lote. | CSV com GGREM, preço unitário, quantidade, PF/PMVG e ICMS; `id_cotacao` e `fornecedor` opcionais. Cada linha recebe situação ou motivo para revisão, sem descartar erros silenciosamente. |
| O10 | Exportar triagem. | CSV inclui todas as linhas importadas, inclusive inválidas, com identificação, teto, diferença, CAP, restrição hospitalar e motivo. A tabela mostra até 100 linhas; o arquivo aceita até 5.000. |

## Fontes e dependências

Fonte implementada: lista CMED PF/PMVG da Anvisa, 09/09/2026. BPS é apenas link externo de pesquisa, sem integração de dados. Não há dados institucionais. Uso institucional exigiria validação por suprimentos, farmácia, jurídico/compliance e TI, com cadastro, contratos, preço praticado, fiscalidade, equivalências, permissões, auditoria e atualização de fonte.

## Validação pelo papel de especialista em supply hospitalar

- **Aderência à tarefa:** uma linha de cotação é vinculada a um GGREM, alíquota e referência escolhida. O painel não equipara apresentações por nome nem escolhe a regra por conta própria. Atende à triagem proposta.
- **Rastreio do lote:** número da linha, ID de cotação e fornecedor opcionais acompanham o resultado; linhas sem GGREM, preço, quantidade, referência ou teto válidos ficam marcadas para revisão. Atende ao requisito de não perder falhas silenciosamente.
- **Interpretação:** a diferença total é aritmética; CAP e restrição hospitalar são contexto, não aprovação automática. Atende ao limite de domínio para um protótipo público.
- **Pendência de aceite de UX:** falta inspeção renderizada da versão revisada em desktop e celular e teste de importação/exportação no navegador. Os testes automatizados verificam a lógica, não a legibilidade. Não declarar a experiência visual validada até essa revisão.

## Estado

O1–O5, O7–O10 implementados. Testes de parser, pareamento de alíquotas, escolha explícita da referência, cálculo com item real e lote com GGREM inexistente passaram. O usuário confirmou em 26/09/2026 que o fluxo proposto de lote atende à sua expectativa, mas esclareceu que a validação de domínio é responsabilidade do especialista da equipe virtual. O6 foi projetado no CSS para viewport desktop sem rolagem do documento e painéis com rolagem interna, mas a revisão visual da nova versão ficou não verificada: a política do navegador bloqueou recarregar a URL local `file:`. Este protótipo não deve ser promovido como sistema de compras implantado.



## Camada analítica e distribuição pública

- A1: para o item selecionado e a alíquota atual, agrupar somente registros com substância e descrição de apresentação textualmente iguais; mostrar n, laboratórios distintos, mediana e Q1–Q3 do PF.
- A2: calcular quartis por interpolação linear sobre preços ordenados; sinalizar grupos com menos de cinco apresentações ou dois laboratórios como amostra pequena; não inferir equivalência ou economia.
- A3: manter análise no mesmo painel de conferência, sem uma lista adicional. Atualizar ao trocar item ou alíquota.
- P1: preparar docs/index.html e capa com dados públicos apenas; não publicar cotações nem dados institucionais.
- P2: publicar link verificável antes de substituir os marcadores do texto do LinkedIn. O repositório público foi criado; envio dos arquivos, Pages e revisão final ainda pendem.
