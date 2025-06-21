import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()
app.use(cors())
app.use(express.json())

app.post('/log', async (req, res) => {
  try {
    const log = await prisma.loginLog.create({ data: req.body })
    res.status(201).json(log)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error saving log' })
  }
})

app.listen(4000, () => console.log('📝 Log Service running on :4000'))
