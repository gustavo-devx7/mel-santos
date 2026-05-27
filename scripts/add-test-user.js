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

async function addTestUser(email, name = 'Test User', amountCents = 29900) {
    const env = loadEnv()
    const neonUrl = env.NEON_URL

    if (!neonUrl) {
        console.error('❌ NEON_URL não configurada')
        process.exit(1)
    }

    const pool = new Pool({ connectionString: neonUrl })

    try {
        const testUser = {
            email: email.toLowerCase(),
            name,
            transaction_id: 'test_txn_' + Date.now(),
            status: 'paid',
            amount_cents: amountCents,
        }

        const result = await pool.query(
            `INSERT INTO customers (email, name, transaction_id, status, amount_cents)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO UPDATE SET
       name = $2, status = $4, amount_cents = $5
       RETURNING *`,
            [testUser.email, testUser.name, testUser.transaction_id, testUser.status, testUser.amount_cents]
        )

        console.log('✅ Usuário criado:')
        console.log('   Email:', result.rows[0].email)
        console.log('   Nome:', result.rows[0].name)
        console.log('   Valor:', (result.rows[0].amount_cents / 100).toFixed(2), 'R$')
    } catch (error) {
        console.error('❌ Erro:', error.message)
        process.exit(1)
    } finally {
        await pool.end()
    }
}

// Parse argumentos da linha de comando
const [, , email, name, amount] = process.argv
if (!email) {
    console.log('Uso: node scripts/add-test-user.js <email> [nome] [valor_em_centavos]')
    console.log('Exemplo: node scripts/add-test-user.js teste2@example.com "João Silva" 49900')
    process.exit(1)
}

addTestUser(email, name || 'Test User', parseInt(amount) || 29900)
