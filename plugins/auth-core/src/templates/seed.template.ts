/***
 * This file was auto-generated by Amplication and should not be modified by hand.
 * The file will be re-generated with every new build, and all changes will be lost.
 * To add a custom seed script, you can safely edit the content of ./customSeed.ts
 ***/

import * as dotenv from "dotenv";
// @ts-ignore
import { PrismaClient } from "../prisma/generated-prisma-client";
// @ts-ignore
import { Salt, parseSalt } from "../src/auth/password.service";
import { hash } from "bcrypt";
// @ts-ignore
import { customSeed } from "./customSeed";

declare const DATA: { username: string };

if (require.main === module) {
  dotenv.config();

  const { BCRYPT_SALT } = process.env;

  if (!BCRYPT_SALT) {
    throw new Error("BCRYPT_SALT environment variable must be defined");
  }

  const salt = parseSalt(BCRYPT_SALT);

  seed(salt).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

async function seed(bcryptSalt: Salt) {
  console.info("Seeding database...");

  const client = new PrismaClient();
  const data = DATA;
  await client.user.upsert({
    where: { username: data.username },
    update: {},
    create: data,
  });
  void client.$disconnect();

  console.info("Seeding database with custom seed...");
  customSeed();

  console.info("Seeded database successfully");
}
