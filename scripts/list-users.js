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

async function listUsers() {
    const env = loadEnv()
    const neonUrl = env.NEON_URL

    if (!neonUrl) {
        console.error('❌ NEON_URL não configurada')
        process.exit(1)
    }

    const pool = new Pool({ connectionString: neonUrl })

    try {
        const result = await pool.query(
            `SELECT id, email, name, status, amount_cents, created_at 
       FROM customers 
       ORDER BY created_at DESC`
        )

        if (result.rows.length === 0) {
            console.log('📭 Nenhum usuário encontrado')
            return
        }

        console.log('\n📋 Usuários no banco de dados:\n')
        console.log('ID | Email | Nome | Status | Valor | Data')
        console.log('---|-------|------|--------|-------|-----')

        result.rows.forEach(user => {
            const valor = (user.amount_cents / 100).toFixed(2)
            const data = new Date(user.created_at).toLocaleDateString('pt-BR')
            console.log(`${user.id} | ${user.email} | ${user.name || '-'} | ${user.status} | R$ ${valor} | ${data}`)
        })

        console.log('\n')
    } catch (error) {
        console.error('❌ Erro ao listar usuários:', error.message)
        process.exit(1)
    } finally {
        await pool.end()
    }
}

listUsers()
