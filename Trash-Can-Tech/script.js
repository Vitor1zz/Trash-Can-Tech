// ===== PRODUTOS (edite aqui para adicionar/alterar) =====
// emoji: troque por "img" com o caminho da foto se quiser usar imagens reais
const produtos = [
  { id: 1,  nome: "Sabão de Querosene", tam: "2 L", cat: "Pisos", preco: 34.90, emoji: "🧴", selo: "Mais vendido" },
  { id: 2,  nome: "Multi Piso Laminado e Vinílico", tam: "1 L", cat: "Pisos", preco: 37.35, emoji: "🪵" },
  { id: 3,  nome: "Lavador com Cera", tam: "2 L", cat: "Pisos", preco: 47.85, emoji: "✨" },
  { id: 4,  nome: "Limpa Porcelanato Pesada", tam: "1 L", cat: "Pisos", preco: 25.40, antigo: 27.60, emoji: "🧽" },
  { id: 5,  nome: "Limpador de Box com Polimento", tam: "1 L", cat: "Banheiro", preco: 23.85, emoji: "🚿", selo: "Lançamento" },
  { id: 6,  nome: "Limpador de Vaso Sanitário", tam: "500 ml", cat: "Banheiro", preco: 28.35, emoji: "🚽" },
  { id: 7,  nome: "Limpador de Rejuntes", tam: "1 L", cat: "Banheiro", preco: 26.85, emoji: "🧼" },
  { id: 8,  nome: "Tira Limo", tam: "1 L", cat: "Banheiro", preco: 16.35, emoji: "🫧" },
  { id: 9,  nome: "Desengordurante com Bicarbonato", tam: "1 L", cat: "Cozinha", preco: 16.95, emoji: "🍳", selo: "Mais vendido" },
  { id: 10, nome: "Limpador de Armários", tam: "500 ml", cat: "Cozinha", preco: 21.90, emoji: "🗄️", selo: "Lançamento" },
  { id: 11, nome: "Limpa Churrasqueira", tam: "1 L", cat: "Cozinha", preco: 23.32, emoji: "🍖" },
  { id: 12, nome: "Álcool Perfumado", tam: "1 L", cat: "Cozinha", preco: 23.85, emoji: "🌸" },
  { id: 13, nome: "Lava Roupas Clareador", tam: "2 L", cat: "Roupas", preco: 44.85, emoji: "👕" },
  { id: 14, nome: "Lava Roupas Anti-Odor", tam: "2 L", cat: "Roupas", preco: 32.25, emoji: "🧺", selo: "Lançamento" },
  { id: 15, nome: "Amaciante Confort", tam: "2 L", cat: "Roupas", preco: 14.85, emoji: "☁️" },
  { id: 16, nome: "Água de Lençol", tam: "500 ml", cat: "Roupas", preco: 45.00, emoji: "🛏️" },
  { id: 17, nome: "Pasta Polidora de Vidros e Inox", tam: "250 g", cat: "Vidros", preco: 23.25, antigo: 25.80, emoji: "🪟" },
  { id: 18, nome: "Pano Mágico Limpa Vidros", tam: "40x40 cm", cat: "Vidros", preco: 19.11, antigo: 27.30, emoji: "🧻" },
  { id: 19, nome: "Rodo para Vidros", tam: "25 cm", cat: "Equipamentos", preco: 90.75, emoji: "🪠" },
  { id: 20, nome: "Esfregão com Fibra", tam: "22 cm", cat: "Equipamentos", preco: 23.10, emoji: "🧹" },
  { id: 21, nome: "Kit Faxina Básico", tam: "3 itens", cat: "Kits", preco: 129.33, antigo: 143.70, emoji: "🎁", selo: "Kit" },
  { id: 22, nome: "Kit Querosene + Spray", tam: "2 L + 500 ml", cat: "Kits", preco: 65.47, antigo: 72.75, emoji: "📦", selo: "Kit" }
];

const categorias = ["Todos", "Kits", "Pisos", "Banheiro", "Cozinha", "Roupas", "Vidros", "Equipamentos"];

let categoriaAtual = "Todos";
let carrinho = [];

const $ = (id) => document.getElementById(id);
const moeda = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// ===== Vitrine =====
function renderCategorias() {
  $("categorias").innerHTML = categorias
    .map((c) => `<button class="${c === categoriaAtual ? "ativa" : ""}" data-cat="${c}">${c}</button>`)
    .join("");
}

function renderProdutos() {
  const termo = $("busca").value.trim().toLowerCase();
  const lista = produtos.filter(
    (p) =>
      (categoriaAtual === "Todos" || p.cat === categoriaAtual) &&
      (p.nome + " " + p.cat).toLowerCase().includes(termo)
  );

  $("titulo").textContent = categoriaAtual === "Todos" ? "Todos os produtos" : categoriaAtual;
  $("vazio").hidden = lista.length > 0;

  $("grade").innerHTML = lista
    .map((p) => {
      const desc = p.antigo ? Math.round((1 - p.preco / p.antigo) * 100) : 0;
      const selo = desc ? `<span class="selo off">${desc}% OFF</span>` : p.selo ? `<span class="selo">${p.selo}</span>` : "";
      return `
      <article class="card">
        ${selo}
        <div class="imagem">${p.emoji}</div>
        <h3>${p.nome}</h3>
        <div class="tam">${p.tam}</div>
        ${p.antigo ? `<div class="preco-antigo">${moeda(p.antigo)}</div>` : ""}
        <div class="preco">${moeda(p.preco)}</div>
        <div class="parcela">Em até 3x de ${moeda(p.preco / 3)} sem juros</div>
        <button class="comprar" data-add="${p.id}">Adicionar ao carrinho</button>
      </article>`;
    })
    .join("");
}

// ===== Carrinho =====
function salvar() {
  try { localStorage.setItem("expoclean_carrinho", JSON.stringify(carrinho)); } catch (e) {}
}
function carregar() {
  try { carrinho = JSON.parse(localStorage.getItem("expoclean_carrinho")) || []; } catch (e) { carrinho = []; }
}

function adicionar(id) {
  const item = carrinho.find((i) => i.id === id);
  if (item) item.qtd++;
  else carrinho.push({ id, qtd: 1 });
  atualizar();
  toast("Adicionado ao carrinho ✔");
}

function alterarQtd(id, delta) {
  const item = carrinho.find((i) => i.id === id);
  if (!item) return;
  item.qtd += delta;
  if (item.qtd <= 0) carrinho = carrinho.filter((i) => i.id !== id);
  atualizar();
}

function remover(id) {
  carrinho = carrinho.filter((i) => i.id !== id);
  atualizar();
}

function atualizar() {
  const qtdTotal = carrinho.reduce((s, i) => s + i.qtd, 0);
  const total = carrinho.reduce((s, i) => s + i.qtd * produtos.find((p) => p.id === i.id).preco, 0);

  $("contador").textContent = qtdTotal;
  $("total").textContent = moeda(total);

  $("itens").innerHTML = carrinho.length
    ? carrinho
        .map((i) => {
          const p = produtos.find((x) => x.id === i.id);
          return `
        <div class="item">
          <div class="emoji">${p.emoji}</div>
          <div class="info">
            <strong>${p.nome}</strong><br><small>${p.tam} · ${moeda(p.preco)}</small>
            <div class="qtd">
              <button data-menos="${p.id}">−</button><span>${i.qtd}</span><button data-mais="${p.id}">+</button>
            </div>
          </div>
          <button class="remover" data-rem="${p.id}" aria-label="Remover">🗑</button>
        </div>`;
        })
        .join("")
    : `<p class="carrinho-vazio">Seu carrinho está vazio.</p>`;

  salvar();
}

function abrir(abrirIt) {
  $("carrinho").classList.toggle("aberto", abrirIt);
  $("fundo").classList.toggle("aberto", abrirIt);
  $("carrinho").setAttribute("aria-hidden", String(!abrirIt));
}

let tempoToast;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("mostrar");
  clearTimeout(tempoToast);
  tempoToast = setTimeout(() => t.classList.remove("mostrar"), 1600);
}

// ===== Eventos =====
$("categorias").addEventListener("click", (e) => {
  const c = e.target.dataset.cat;
  if (!c) return;
  categoriaAtual = c;
  renderCategorias();
  renderProdutos();
});
$("busca").addEventListener("input", renderProdutos);
$("grade").addEventListener("click", (e) => {
  const id = e.target.dataset.add;
  if (id) adicionar(Number(id));
});
$("itens").addEventListener("click", (e) => {
  const d = e.target.dataset;
  if (d.mais) alterarQtd(Number(d.mais), 1);
  if (d.menos) alterarQtd(Number(d.menos), -1);
  if (d.rem) remover(Number(d.rem));
});
$("abrirCarrinho").addEventListener("click", () => abrir(true));
$("fechar").addEventListener("click", () => abrir(false));
$("fundo").addEventListener("click", () => abrir(false));
$("limpar").addEventListener("click", () => { carrinho = []; atualizar(); });

// ===== Início =====
carregar();
renderCategorias();
renderProdutos();
atualizar();
