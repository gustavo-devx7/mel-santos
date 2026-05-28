# Scripts de Banco de Dados

## Setup Inicial

Para preparar o banco de dados Neon pela primeira vez:

```bash
node scripts/setup-db.js
```

Isso cria a tabela `customers` com a estrutura necessária.

## Criar Usuário de Teste

### Usuário padrão

Cria um usuário com email e valores padrão:

```bash
node scripts/create-test-user.js
```

Resultado:

- Email: `teste@examplo.com`
- Nome: `Usuário Teste`
- Valor: R$ 299,00
- Status: Pago

### Usuário customizado

Cria um usuário com dados específicos:

```bash
node scripts/add-test-user.js <email> [nome] [valor_em_centavos]
```

Exemplos:

```bash
# Usuário simples
node scripts/add-test-user.js joao@example.com

# Com nome e valor customizado
node scripts/add-test-user.js maria@example.com "Maria Silva" 99900

# Apenas com nome
node scripts/add-test-user.js pedro@example.com "Pedro Santos"

node scripts/add-test-user.js teste@teste.com
```

## Usuários Padrão para Testes

| Email             | Nome          | Status | Valor     |
| ----------------- | ------------- | ------ | --------- |
| teste@example.com | Usuário Teste | Pago   | R$ 299,00 |

---

**Nota**: O acesso expira automaticamente após 7 dias da data de criação.
