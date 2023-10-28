import dotenv from 'dotenv'
import path from 'path'

const envPath = path.resolve(process.cwd(), '.env')
dotenv.config({ path: envPath })
console.log(`Loading environment variables from: ${envPath}`)

export const config = {
  port: process.env.PORT!,
  baseUrl: process.env.BASE_URL!,
  version: process.env.VERSION!,
  mongoDB: {
    mongo: process.env.MONGODB!,
    db: process.env.MONGODB_DB!,
    dbRaids: process.env.MONGODB_RAIDS!,
    dbAuth: process.env.MONGODB_AUTH!,
  },
  secrets: {
    jwt: process.env.JWT_SECRET!,
    jwtExp: process.env.JWT_EXP!
  },
  roles: {
    officer: process.env.OFFICER_ROLE!,
    raidLead: process.env.RAID_LEAD!,
    user: process.env.USER!
  }
}