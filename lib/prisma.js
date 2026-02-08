require('dotenv/config');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  adapter: {
    provider: 'postgres',
    url: process.env.DATABASE_URL,
  },
});

module.exports = prisma;
