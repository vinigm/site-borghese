/* ========================================
   PÁGINA EMPREENDIMENTO - Detalhes completos
   ======================================== */

import carregadorDados from '../utils/carregador-dados.js';
import renderizadorImoveis from '../components/renderizador-imoveis.js';
import { formatarEndereco, gerarLinkWhatsApp } from '../utils/helpers.js';

const container = document.querySelector('#empreendimento .empreendimento__container');
const tituloEl = document.querySelector('[data-titulo-empreendimento]');
const breadcrumbEl = document.querySelector('[data-breadcrumb-empreendimento]');

function renderizarErro(titulo, mensagem) {
  if (!container) return;
  container.innerHTML = `
    <div class="empreendimento__erro">
      <h2>${titulo}</h2>
      <p>${mensagem}</p>
      <a href="empreendimentos.html" class="botao botao--primario">Ver Todos os Empreendimentos</a>
    </div>
  `;
}

function criarGaleriaEmpreendimento(imagens, nome) {
  if (!imagens || imagens.length === 0) {
    return '<p>Nenhuma imagem disponível</p>';
  }

  const resolverCaminhoImagem = (src) => {
    if (!src) return 'assets/images/placeholder.jpg';
    if (src.startsWith('http') || src.startsWith('/') || src.startsWith('../') || src.startsWith('./')) {
      return src;
    }
    return `../${src}`;
  };

  const imagemPrincipal = resolverCaminhoImagem(imagens[0]);
  
  return `
    <div class="empreendimento__galeria">
      <div class="empreendimento__imagem-principal" id="imagem-principal-emp">
        <img src="${imagemPrincipal}" alt="${nome}" data-index="0">
      </div>
      ${imagens.length > 1 ? `
        <div class="empreendimento__miniaturas" id="miniaturas-emp">
          ${imagens.map((img, index) => `
            <div class="empreendimento__miniatura${index === 0 ? ' ativo' : ''}" data-index="${index}">
              <img src="${resolverCaminhoImagem(img)}" alt="${nome} - ${index + 1}">
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

async function carregarEmpreendimento() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const slug = params.get('slug');

  if (!id && !slug) {
    renderizarErro('Empreendimento não encontrado', 'Nenhum ID ou slug foi informado na URL.');
    return;
  }

  try {
    const empreendimento = await carregadorDados.carregarEmpreendimentoPorId(id || slug);

    if (!empreendimento) {
      renderizarErro('Empreendimento não encontrado', 'Não encontramos um empreendimento com esse ID.');
      return;
    }

    if (!container) return;

    // Atualiza título e breadcrumb
    if (tituloEl) tituloEl.textContent = empreendimento.nome;
    if (breadcrumbEl) breadcrumbEl.textContent = empreendimento.nome;
    document.title = `Borghese - ${empreendimento.nome}`;

    const enderecoFormatado = formatarEndereco(empreendimento.endereco);
    const mensagemWhatsApp = `Olá! Quero saber mais sobre o empreendimento ${empreendimento.nome}. Podemos conversar?`;
    const linkWhatsApp = gerarLinkWhatsApp('51993016930', mensagemWhatsApp);

    // Renderiza informações do empreendimento
    container.innerHTML = `
      <div class="empreendimento__conteudo">
        <div class="empreendimento__principal">
          ${criarGaleriaEmpreendimento(empreendimento.imagens, empreendimento.nome)}

          <div class="empreendimento__info">
            <div class="empreendimento__header">
              <h2>${empreendimento.nome}</h2>
              <div class="empreendimento__endereco">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>${enderecoFormatado}</span>
              </div>
            </div>

            <div class="empreendimento__descricao">
              <p>${empreendimento.descricaoCompleta || empreendimento.descricao}</p>
            </div>

            <div class="empreendimento__caracteristicas-gerais">
              <div class="caracteristica-item">
                <span class="caracteristica-label">Unidades:</span>
                <span class="caracteristica-valor">${empreendimento.caracteristicas.unidades || 'N/A'}</span>
              </div>
              <div class="caracteristica-item">
                <span class="caracteristica-label">Torres:</span>
                <span class="caracteristica-valor">${empreendimento.caracteristicas.torres || 'N/A'}</span>
              </div>
              <div class="caracteristica-item">
                <span class="caracteristica-label">Andares:</span>
                <span class="caracteristica-valor">${empreendimento.caracteristicas.andares || 'N/A'}</span>
              </div>
              <div class="caracteristica-item">
                <span class="caracteristica-label">Status:</span>
                <span class="caracteristica-valor badge badge--info">${formatarStatus(empreendimento.caracteristicas.status)}</span>
              </div>
            </div>

            ${empreendimento.lazer && empreendimento.lazer.length > 0 ? `
              <div class="empreendimento__lazer">
                <h3>Áreas de Lazer</h3>
                <ul class="lazer-lista">
                  ${empreendimento.lazer.map(item => `<li>✓ ${item}</li>`).join('')}
                </ul>
              </div>
            ` : ''}

            ${empreendimento.diferenciais && empreendimento.diferenciais.length > 0 ? `
              <div class="empreendimento__diferenciais">
                <h3>Diferenciais</h3>
                <ul class="diferenciais-lista">
                  ${empreendimento.diferenciais.map(item => `<li>⭐ ${item}</li>`).join('')}
                </ul>
              </div>
            ` : ''}

            <div class="empreendimento__acoes">
              <a href="${linkWhatsApp}" target="_blank" rel="noopener" class="botao botao--whatsapp botao--grande">
                WhatsApp
              </a>
              <a href="contato.html" class="botao botao--primario botao--grande">
                Solicitar Informações
              </a>
            </div>
          </div>
        </div>

        <div class="empreendimento__unidades">
          <h3>Unidades Disponíveis</h3>
          <div class="unidades-grid" id="unidades-grid">
            <div class="loading-container">
              <div class="loading-spinner"></div>
              <p>Carregando unidades...</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Adiciona funcionalidade de troca de imagens na galeria
    setTimeout(() => {
      const imagemPrincipal = document.getElementById('imagem-principal-emp');
      const miniaturas = document.querySelectorAll('.empreendimento__miniatura');
      
      if (imagemPrincipal && miniaturas.length > 0) {
        const resolverCaminhoImagem = (src) => {
          if (!src) return 'assets/images/placeholder.jpg';
          if (src.startsWith('http') || src.startsWith('/') || src.startsWith('../') || src.startsWith('./')) {
            return src;
          }
          return `../${src}`;
        };

        miniaturas.forEach((miniatura, index) => {
          miniatura.addEventListener('click', () => {
            const imgElement = imagemPrincipal.querySelector('img');
            if (imgElement && empreendimento.imagens[index]) {
              imgElement.src = resolverCaminhoImagem(empreendimento.imagens[index]);
              imgElement.setAttribute('data-index', index);
              
              // Remove classe ativo de todas e adiciona na clicada
              miniaturas.forEach(m => m.classList.remove('ativo'));
              miniatura.classList.add('ativo');
            }
          });
        });
      }
    }, 100);

    // Carrega unidades do empreendimento
    await carregarUnidades(empreendimento.id);

  } catch (erro) {
    console.error('Erro ao carregar empreendimento:', erro);
    renderizarErro('Erro ao carregar', 'Ocorreu um erro ao carregar o empreendimento.');
  }
}

async function carregarUnidades(empreendimentoId) {
  try {
    const unidades = await carregadorDados.buscarImoveis({
      empreendimentoId: empreendimentoId
    });

    const gridUnidades = document.getElementById('unidades-grid');
    if (!gridUnidades) return;

    if (unidades.length === 0) {
      gridUnidades.innerHTML = `
        <div class="empreendimento__sem-unidades">
          <p>Não há unidades disponíveis no momento. Entre em contato para mais informações.</p>
        </div>
      `;
      return;
    }

    renderizadorImoveis.renderizarLista(unidades, '#unidades-grid');
  } catch (erro) {
    console.error('Erro ao carregar unidades:', erro);
  }
}

function formatarStatus(status) {
  const statusMap = {
    'em-construcao': 'Em Construção',
    'lancamento': 'Lançamento',
    'pronto-para-morar': 'Pronto para Morar',
    'na-planta': 'Na Planta'
  };
  return statusMap[status] || status;
}

// Inicia carregamento
carregarEmpreendimento();
