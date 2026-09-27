# Radar CMED — conferência de cotação

Painel estático para identificar uma apresentação da [lista CMED da Anvisa](https://www.gov.br/anvisa/pt-br/assuntos/medicamentos/cmed/precos), consultar PF/PMVG por alíquota e conferir aritmeticamente uma cotação com a referência escolhida. Uma camada analítica mostra o contexto do PF para registros com a mesma substância e descrição de apresentação.

## Consulta

1. Abra o [painel público](https://lucastastrofe.github.io/radar-cmed/) ou [`docs/index.html`](docs/index.html) localmente.
2. Busque produto, substância, laboratório ou GGREM; confirme apresentação e embalagem.
3. Selecione a alíquota e a referência PF ou PMVG que se aplica à compra. A tela mostra CAP, restrição hospitalar e marcação `*` da planilha, mas não escolhe a regra automaticamente.
4. Informe preço por apresentação e quantidade inteira positiva. O resultado mostra a diferença unitária e total em relação à referência escolhida.
5. Antes de encaminhar, confira embalagem, incidência do ICMS, aplicação da referência e preço praticado em contrato ou no mercado.
6. Leia o grupo estatístico: número de apresentações e laboratórios, mediana, quartis e posição do PF do item. O grupo usa igualdade textual de substância e apresentação. Não comprova equivalência.

O cálculo estatístico usa quartis com interpolação linear (`p × (n−1)`). Para menos de cinco apresentações ou menos de dois laboratórios, a interface evita interpretar a distribuição. Os valores digitados não são enviados nem salvos.

## Limite operacional

O painel apoia triagem de cotação. Não aprova compras, estima economia nem substitui pesquisa de preços praticados. Para uso institucional são necessários cadastro interno, equivalências validadas pela farmácia, contratos, estoque, dados de compra, regras fiscais, permissões e auditoria. O [Banco de Preços em Saúde](https://www.gov.br/saude/pt-br/acesso-a-informacao/banco-de-precos) é uma fonte complementar para pesquisa de compras praticadas; nesta versão há somente um link para ele.

## Dados e reprodução

Fonte: planilha PMVG da Anvisa publicada em 09/09/2026. A execução de 26/09/2026 processou **26.242 GGREM únicos** e **13 pares de alíquotas** PF/PMVG. O relatório está em `dashboard.quality.json`. A planilha bruta `cmed_2026-09-09.xlsx` fica fora do Git.

Requer Python 3.11+ e `openpyxl`:

```bash
python -m pip install openpyxl
python build.py cmed_2026-09-09.xlsx --output dashboard.html
python build.py cmed_2026-09-09.xlsx --output docs/index.html
python -m unittest -v test_build
```

`test_dashboard.cjs` verifica a conferência individual, a exigência de quantidade e a leitura estatística com Node.js. A capa de divulgação pode ser recriada com `scripts/render_cover.py` (Pillow e fonte Segoe UI disponível no Windows).

## Versão pública

`docs/index.html` e `docs/cover.png` formam o pacote estático preparado para GitHub Pages. A página usa apenas dados públicos da CMED e não recebe cotações em servidor. O painel está publicado em [GitHub Pages](https://lucastastrofe.github.io/radar-cmed/). O [contrato de requisitos](REQUIREMENTS.md) registra aceites e limites.
