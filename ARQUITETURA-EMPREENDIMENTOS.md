# 🏗️ Arquitetura de Empreendimentos

## 📊 Estrutura de Organização

Este site agora trabalha com a seguinte hierarquia:

```
Empreendimento (Ex: Arven, Green Haus, Condomínio TOM)
  └── Unidades/Apartamentos (Ex: Apto 101, 102, 203...)
```

---

## 📁 Como Adicionar um Novo Empreendimento

### 1. Crie a pasta de imagens

Em `assets/images/empreendimentos/`, crie uma pasta para o empreendimento:

```
assets/images/empreendimentos/
└── nome-do-empreendimento/    ← Use lowercase com hífen
    ├── fachada.jpg
    ├── academia.jpg
    ├── piscina.jpg
    └── salao.jpg
```

### 2. Adicione no JSON de empreendimentos

Edite `src/data/empreendimentos.json` e adicione:

```json
{
  "id": 2,
  "nome": "Green Haus",
  "slug": "green-haus",
  "endereco": {
    "rua": "Rua Exemplo, 123",
    "bairro": "Bairro",
    "cidade": "Cidade",
    "estado": "RS"
  },
  "descricao": "Descrição curta do empreendimento",
  "descricaoCompleta": "Descrição mais completa do empreendimento...",
  "caracteristicas": {
    "unidades": 64,
    "torres": 1,
    "andares": 16,
    "elevadores": 2,
    "status": "em-construcao"
  },
  "lazer": [
    "Piscina",
    "Academia",
    "Churrasqueira",
    "etc..."
  ],
  "diferenciais": [
    "Localização privilegiada",
    "Acabamento premium",
    "etc..."
  ],
  "imagens": [
    "assets/images/empreendimentos/green-haus/fachada.jpg",
    "assets/images/empreendimentos/green-haus/academia.jpg"
  ],
  "destaque": true,
  "disponivel": true
}
```

**Status disponíveis:**
- `lancamento` - Lançamento
- `em-construcao` - Em Construção
- `pronto-para-morar` - Pronto para Morar
- `na-planta` - Na Planta

---

## 🏠 Como Adicionar Unidades (Apartamentos)

### 1. Crie a pasta de imagens da unidade

Em `assets/images/imoveis/`, crie uma pasta para cada unidade:

```
assets/images/imoveis/
└── green-haus-apto-101/    ← Use nome-empreendimento-apto-numero
    ├── sala.jpg
    ├── quarto.jpg
    ├── cozinha.jpg
    └── banheiro.jpg
```

### 2. Adicione no JSON de imóveis

Edite `src/data/imoveis.json` e adicione:

```json
{
  "id": 7,
  "empreendimentoId": 2,              ← ID do empreendimento
  "empreendimento": "Green Haus",     ← Nome do empreendimento
  "unidade": "101",                   ← Número da unidade
  "torre": "A",                       ← Torre (se tiver)
  "titulo": "Apartamento 2 Quartos - Green Haus",
  "tipo": "apartamento",
  "transacao": "venda",
  "preco": 650000,
  "endereco": {
    "rua": "Rua Exemplo, 123",
    "bairro": "Bairro",
    "cidade": "Cidade",
    "estado": "RS"
  },
  "caracteristicas": {
    "quartos": 2,
    "banheiros": 2,
    "vagas": 1,
    "area": 75
  },
  "descricao": "Descrição do apartamento...",
  "imagens": [
    "assets/images/imoveis/green-haus-apto-101/sala.jpg",
    "assets/images/imoveis/green-haus-apto-101/quarto.jpg"
  ],
  "destaque": true,
  "disponivel": true
}
```

---

## 🗑️ Como Remover um Imóvel Vendido

### Opção 1: Marcar como indisponível (Recomendado)

Edite o imóvel em `src/data/imoveis.json`:

```json
{
  "id": 7,
  "disponivel": false    ← Mude para false
}
```

### Opção 2: Deletar completamente

1. Remova o objeto do JSON em `src/data/imoveis.json`
2. Delete a pasta `assets/images/imoveis/nome-do-imovel/`

---

## 🗑️ Como Remover um Empreendimento Completo

**Para remover um empreendimento e todas suas unidades:**

1. Marque o empreendimento como indisponível em `src/data/empreendimentos.json`:
```json
{
  "id": 2,
  "disponivel": false
}
```

2. Marque todas as unidades do empreendimento como indisponíveis em `src/data/imoveis.json`:
```json
{
  "empreendimentoId": 2,
  "disponivel": false
}
```

3. (Opcional) Delete as pastas de imagens:
   - `assets/images/empreendimentos/nome-empreendimento/`
   - `assets/images/imoveis/nome-empreendimento-*/`

---

## 📝 Organização por Construtora (Apenas Pastas)

**As construtoras NÃO aparecem no site**, são só para sua organização interna.

Você pode organizar suas pastas de imagens assim:

```
assets/images/
├── empreendimentos/
│   ├── DIMAK/           ← Pasta de controle (não aparece no site)
│   │   ├── arven/
│   │   └── green-haus/
│   ├── Find/
│   │   └── country-club/
│   └── Melnick/
│       └── essence/
└── imoveis/
    ├── DIMAK/
    │   ├── arven-apto-101/
    │   └── green-haus-apto-201/
    └── Find/
        └── country-club-apto-301/
```

**Mas nos JSONs, referencie sem a pasta da construtora:**

```json
"imagens": [
  "assets/images/empreendimentos/DIMAK/arven/fachada.jpg"
]
```

---

## ✅ Checklist Rápido

**Para adicionar um empreendimento novo:**
- [ ] Criar pasta em `assets/images/empreendimentos/`
- [ ] Adicionar fotos do empreendimento
- [ ] Adicionar no `empreendimentos.json`
- [ ] Criar pastas para cada unidade em `assets/images/imoveis/`
- [ ] Adicionar fotos das unidades
- [ ] Adicionar cada unidade no `imoveis.json` com `empreendimentoId`

**Para remover um imóvel vendido:**
- [ ] Mudar `"disponivel": false` no `imoveis.json`
- [ ] (Opcional) Deletar pasta de imagens

---

## 🔍 Onde os Empreendimentos Aparecem

1. **Home** - Seção "Empreendimentos em Destaque"
2. **Página do Empreendimento** - `/pages/empreendimento.html?id=1`
3. **Unidades aparecem em**:
   - Página do empreendimento
   - Busca geral de imóveis
   - Filtro por empreendimento

---

**Precisa de ajuda?** Qualquer dúvida, me pergunte!
