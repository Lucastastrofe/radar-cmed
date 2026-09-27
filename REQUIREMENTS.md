# Contrato de requisitos — Radar CMED

Atualizado em 26/09/2026. Demanda explícita: tornar o projeto mais operacional para supply hospitalar, concentrar informações necessárias em uma tela, chamar atenção como tecnologia hospitalar e retirar referências ao processo de criação da interface e documentação.

## Enquadramento do especialista de domínio

Um comprador ou farmacêutico precisa identificar exatamente a apresentação cotada e conferir o valor oferecido contra a referência regulatória pertinente. A decisão incorreta pode usar outro tamanho de embalagem, alíquota ou teto inadequado. A planilha CMED, sozinha, não informa preço praticado, contrato, estoque ou equivalência aprovada pelo hospital.

## Objetivo do incremento

Permitir **triagem de uma cotação por apresentação/GGREM**, com consulta da fonte pública e cálculo transparente, sem afirmar conformidade ou economicidade da compra. A tela desktop deve manter os controles e resultados do modo escolhido visíveis sem rolagem da página; listas podem rolar dentro do seu painel.

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
| O9 | Encaminhar conferência com cautela. | Resultado explicita que embalagem, ICMS, aplicação de PF/PMVG e preço praticado ainda devem ser conferidos antes da decisão. |


## Fontes e dependências

Fonte implementada: lista CMED PF/PMVG da Anvisa, 09/09/2026. BPS é apenas link externo de pesquisa, sem integração de dados. Não há dados institucionais. Uso institucional exigiria validação por suprimentos, farmácia, jurídico/compliance e TI, com cadastro, contratos, preço praticado, fiscalidade, equivalências, permissões, auditoria e atualização de fonte.

## Mudança de escopo em 27/09/2026

Pedido explícito: retirar a análise em lote e manter utilidade para a rotina hospitalar. Especialista de suprimentos: o recorte é a conferência de uma linha de cotação; o risco principal é comparar apresentação, tributo ou referência incorreta. Requisitos: manter identificação por GGREM, PF/PMVG por alíquota, cálculo unitário e total, indicadores CAP/hospitalar, contexto estatístico e lembrete das verificações humanas. Excluir importação, exportação e demonstração em lote. Quantidade positiva passa a ser necessária para concluir a diferença total.

## Validação pelo papel de especialista em supply hospitalar

A tela não toma decisão de compra. Ela permite localizar a apresentação, comparar uma cotação com a referência escolhida e mostrar o que falta conferir. Esse recorte atende a uma conferência preliminar por item. Não atende a uma operação institucional completa, que depende de cadastro interno, contratos, regras fiscais e validação da farmácia e de suprimentos. Teste automatizado verificou cálculo e quantidade obrigatória. Na página publicada, a busca e a seleção por GGREM foram exercitadas; preço de R$ 40,00 frente a PF de R$ 34,52 e quantidade 2 resultou em R$ 10,96 de diferença total. A revisão visual confirmou ausência do modo em lote e largura de 390 px sem excedente horizontal no celular. A captura está em `docs/captura-painel.jpg`.

## Camada analítica e distribuição pública

- A1: para o item selecionado e a alíquota atual, agrupar somente registros com substância e descrição de apresentação textualmente iguais; mostrar n, laboratórios distintos, mediana e Q1–Q3 do PF.
- A2: calcular quartis por interpolação linear sobre preços ordenados; sinalizar grupos com menos de cinco apresentações ou dois laboratórios como amostra pequena; não inferir equivalência ou economia.
- A3: manter análise no mesmo painel de conferência, sem uma lista adicional. Atualizar ao trocar item ou alíquota.
- P1: preparar docs/index.html e capa com dados públicos apenas; não publicar cotações nem dados institucionais.
- P2: publicar link verificável antes de substituir os marcadores do texto do LinkedIn. [Painel](https://lucastastrofe.github.io/radar-cmed/) e [repositório](https://github.com/Lucastastrofe/radar-cmed) foram verificados; o texto em `LINKEDIN_POST.md` contém os links finais.
