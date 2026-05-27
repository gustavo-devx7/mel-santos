#!/usr/bin/env node
const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

function loadEnv() {
    const envPath = path.join(__dirname, '..', '.env.local')
    const envContent = fs.readFileSync(envPath, 'utf-8')
    const env = {}
    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=')
        if (key && valueParts.length) {
            env[key.trim()] = valueParts.join('=').trim()
        }
    })
    return env
}

async function createTestUser() {
    const env = loadEnv()
    const neonUrl = env.NEON_URL

    if (!neonUrl) {
        console.error('❌ NEON_URL não configurada em .env.local')
        process.exit(1)
    }

    const pool = new Pool({ connectionString: neonUrl })

    try {
        const testUser = {
            email: 'teste@example.com',
            name: 'Usuário Teste',
            transaction_id: 'test_txn_' + Date.now(),
            status: 'paid',
            amount_cents: 29900,
        }

        console.log('📝 Inserindo usuário de teste...')
        console.log('Email:', testUser.email)
        console.log('Nome:', testUser.name)
        console.log('Valor:', (testUser.amount_cents / 100).toFixed(2), 'R$')

        const result = await pool.query(
            `INSERT INTO customers (email, name, transaction_id, status, amount_cents)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (transaction_id) DO UPDATE SET
       email = $1, name = $2, status = $4, amount_cents = $5
       RETURNING *`,
            [testUser.email, testUser.name, testUser.transaction_id, testUser.status, testUser.amount_cents]
        )

        console.log('✅ Usuário de teste criado com sucesso!')
        console.log('Dados:', result.rows[0])
        console.log('\n🔑 Use este email para fazer login:')
        console.log('   ' + testUser.email)
    } catch (error) {
        console.error('❌ Erro ao inserir usuário:')
        console.error('Mensagem:', error.message)
        console.error('Código:', error.code)
        console.error('Detalhes completos:', error)
        process.exit(1)
    } finally {
        await pool.end()
    }
}

createTestUser()
