# Gomes & Cortez Advocacia

Site institucional do escritório **Gomes & Cortez Advocacia**, das advogadas Giovanna Gomes e Natália Cortez, feito para um cliente real. O site apresenta as profissionais e as áreas de atuação (Direito de Família, Sucessões e Tributário) e leva o visitante a agendar um atendimento pelo WhatsApp.

**[Ver o site no ar →](https://gomes-cortez-advocacia.netlify.app/)**

<p align="center">
  <img src="docs/desktop.jpg" alt="Versão desktop do site" width="72%">
  &nbsp;
  <img src="docs/mobile.jpg" alt="Versão mobile do site" width="22%">
</p>

## Identidade visual

A paleta parte do marrom e do dourado da logo do escritório. O "&" do nome Gomes & Cortez virou o elemento gráfico principal do topo da página.

| Token | Cor | Uso |
|---|---|---|
| `--tabaco` | `#2A2019` | Hero e rodapé |
| `--marrom` | `#5A4A3B` | Títulos e seções escuras |
| `--dourado` | `#A6875A` | Botões e ícones |
| `--bege` | `#FBF9F5` | Fundo principal |

A tipografia usa **Libre Caslon** nos títulos, uma serifa clássica que combina com o meio jurídico, e **Source Sans 3** no texto corrido.

## Seções

Início · Conheça as profissionais · Especialidades jurídicas · Como funciona · Diferenciais · Perguntas frequentes · Depoimentos · Contato

## Destaques técnicos

- **HTML, CSS e JavaScript puros**, sem framework e sem etapa de build.
- **Formulário que vira mensagem de WhatsApp**: valida os campos e abre a conversa com os dados já preenchidos. Não precisa de servidor.
- **Menu responsivo**: header transparente sobre o topo, que ganha fundo ao rolar, menu mobile acessível e destaque da seção atual.
- **Métricas**: Google Analytics 4 com eventos nos cliques de WhatsApp e no envio do formulário.
- **SEO**: meta tags, Open Graph e dados estruturados (`schema.org`) do escritório para o Google.
- **Performance**: imagens em WebP com JPG de fallback e carregamento sob demanda.
- **Acessibilidade**: contraste AA, navegação por teclado, textos alternativos, rótulos para leitores de tela e respeito a `prefers-reduced-motion`.
- **Responsivo**, do celular ao desktop.
- **Paleta centralizada** em variáveis CSS: dá para trocar as cores do site inteiro em um só lugar.

## Estrutura

```
├── index.html          # Marcação semântica da página
├── css/style.css       # Estilos: tokens, componentes e responsivo
├── js/main.js          # Menu, formulário → WhatsApp e eventos do Analytics
├── img/                # Fotos (WebP + JPG), favicon e ícone da Apple
├── docs/               # Capturas de tela para este README
├── robots.txt
└── netlify.toml        # Configuração de deploy e cache
```

## Rodando localmente

Basta abrir o `index.html` no navegador. Também dá para usar um servidor local:

```bash
npx serve .
```

## Deploy

Hospedado na **Netlify** como site estático. Cada push na branch `main` publica a nova versão automaticamente.

---

Desenvolvido por **[gomessites.com.br](https://gomessites.com.br)**, criação de sites e landing pages.
