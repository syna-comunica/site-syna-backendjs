# Endpoint Admin - Listar Leads

## Endpoint Protegido
- **GET** `/admin/leads` (requer JWT)

## Como Testar

### 1. Obter Token JWT
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@synacomunica.com.br",
    "password": "LogSyna@26!"
  }'
```

Resposta:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@synacomunica.com.br",
    "name": "Admin User",
    "role": "admin"
  }
}
```

### 2. Listar Leads com Token
```bash
curl -X GET http://localhost:3000/admin/leads \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

Resposta:
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "company": "Empresa X",
    "message": "Tenho interesse nos serviços",
    "createdAt": "2026-01-18T13:45:00.000Z",
    "updatedAt": "2026-01-18T13:45:00.000Z"
  }
]
```

### 3. Teste Sem Token (deve retornar 401)
```bash
curl -X GET http://localhost:3000/admin/leads
```

Resposta esperada: `401 Unauthorized`

## Funcionalidades
- ✅ Protegido por JWT
- ✅ Retorna todos os leads ordenados por `createdAt DESC`
- ✅ Reutiliza `LeadsService.findAll()` existente
- ✅ Validação automática de token

## Setup Inicial
1. Criar usuário admin: `npm run seed:admin`
2. Iniciar aplicação: `npm run start:dev`
3. Seguir passos acima para testar
