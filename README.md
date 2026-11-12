# Meu portfólio frontend

Sou Rayara Vilar, desenvolvedora frontend de Patos, na Paraíba. Neste portfólio, conto como a comunicação digital, o design e a tecnologia se encontraram na minha trajetória. Também apresento minha formação, minha experiência profissional e alguns dos projetos que desenvolvi.

## O que você encontra no site

- **Minha história em cinco cenas.** A abertura parte de Patos, passa pela UFPB e pelo meu intercâmbio em Portugal, e termina com uma interface ganhando forma. Dá para pausar, rever e escolher um capítulo. A abertura respeita a preferência de movimento reduzido.
- **Projetos com contexto.** Apresento o [Portfólio Python](https://github.com/RayaraVilar/rayara-vilar-portfolio), o [Planner de Concursos](https://github.com/RayaraVilar/Planner_concursos) e o [EduMetrics](https://github.com/RayaraVilar/proj_python_02_edumetrics) com o contexto, a solução e as tecnologias de cada projeto.
- **Currículo e contato.** Reuni minha experiência, formação e habilidades, com um currículo para baixar e canais para conversar comigo.

## Como organizei o projeto

Usei **Next.js e React** para estruturar as seções, **Tailwind CSS e CSS** para o layout responsivo, **Framer Motion** para interações e **Lucide** para os ícones. Na abertura, combinei um mapa em SVG, ilustrações e transições em CSS. O olhar da mascote reage ao cursor com Canvas.

| Arquivo | O que fica nele |
| --- | --- |
| `app/content.js` | Minha trajetória, meus projetos e meus canais de contato |
| `app/chapters.json` | Enredo e duração das cenas da abertura |
| `app/intro.jsx` e `app/cinema.css` | Composição, animações e controles da abertura |
| `public/` | Ilustrações, imagens dos projetos e currículo |

## Como rodar localmente

Com Node.js 20.9 ou superior e npm instalados, execute na raiz do repositório:

```sh
npm ci
npm run dev
```

Abra [localhost:3000](http://localhost:3000). Para gerar a versão estática em `out/`, execute `npm run build`.

O formulário envia mensagens via FormSubmit e abre o aplicativo de e-mail se o envio pelo serviço falhar. Para usar outro endereço em uma cópia local, atualize `contact.email` em `app/content.js`.

## Créditos do mapa

Usei contornos do Natural Earth via World Atlas e o mapa municipal do IBGE como referência para Patos. O comando `node scripts/make-map.mjs` regenera o mapa. [Natural Earth](https://www.naturalearthdata.com/) · [Mapa municipal do IBGE](https://geoftp.ibge.gov.br/cartas_e_mapas/mapas_para_fins_de_levantamentos_estatisticos/censo_demografico_2010/mapas_municipais_estatisticos/pb/patos_v2.pdf)

## Vamos conversar?

Você me encontra no [LinkedIn](https://www.linkedin.com/in/rayara-vilar) e no [GitHub](https://github.com/RayaraVilar).
