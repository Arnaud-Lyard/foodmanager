import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  /* Reset the database */
  await prisma.player.deleteMany();
  await prisma.user.deleteMany();

  /* Seed the database */
  const alice = await prisma.user.upsert({
    where: { id: '1a751e3a-8884-4f29-98d7-81d3f5cbc712' },
    update: {},
    create: {
      pseudo: 'alice',
      email: 'alice@prisma.io',
      avatar: 'https://i.pravatar.cc/150?u=alice',
      verified: true,
      esl: 'http://www.esl.com/alice',
      twitter: 'http://www.twitter.com/alice',
      grade: 'manager',
      password: 'alicepassword',
      role: 'admin',
      verificationCode: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordResetToken: null,
      passwordResetAt: null,
    },
  });

  const bob = await prisma.user.upsert({
    where: { id: '486eb3da-ffb3-40f0-91a3-11f7b19a6a39' },
    update: {},
    create: {
      pseudo: 'bob',
      email: 'bob@prisma.io',
      avatar: 'https://i.pravatar.cc/150?u=bob',
      verified: true,
      esl: 'http://www.esl.com/bob',
      twitter: 'http://www.twitter.com/bob',
      grade: 'user',
      password: 'bobpassword',
      role: 'user',
      verificationCode: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordResetToken: null,
      passwordResetAt: null,
    },
  });

  const john = await prisma.user.upsert({
    where: { id: 'e3386a0b-703a-49bd-a600-532ddd2221e1' },
    update: {},
    create: {
      pseudo: 'john',
      email: 'john@prisma.io',
      avatar: 'https://i.pravatar.cc/150?u=john',
      verified: true,
      esl: 'http://www.esl.com/john',
      twitter: 'http://www.twitter.com/john',
      grade: 'player',
      password: 'johnpassword',
      role: 'user',
      verificationCode: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordResetToken: null,
      passwordResetAt: null,
    },
  });

  const mat = await prisma.user.upsert({
    where: { id: '9035c9e7-9c88-4595-96a0-b2e5064a36f5' },
    update: {},
    create: {
      pseudo: 'mat',
      email: 'mat@prisma.io',
      avatar: 'https://i.pravatar.cc/150?u=mat',
      verified: true,
      esl: 'http://www.esl.com/mat',
      twitter: 'http://www.twitter.com/mat',
      grade: 'player',
      password: 'matpassword',
      role: 'user',
      verificationCode: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordResetToken: null,
      passwordResetAt: null,
    },
  });

  const user = await prisma.user.upsert({
    where: { id: '1a751e3a-8884-4f29-98d7-81d3f5cbc713' },
    update: {},
    create: {
      pseudo: 'user',
      email: 'user@prisma.io',
      avatar: 'https://i.pravatar.cc/150?u=user',
      verified: true,
      esl: 'http://www.esl.com/user',
      twitter: 'http://www.twitter.com/user',
      grade: 'player',
      password: 'userpassword',
      role: 'user',
      verificationCode: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordResetToken: null,
      passwordResetAt: null,
    },
  });

  const admin = await prisma.user.upsert({
    where: { id: 'b3aca0e8-0be4-4ad0-bc3f-c3ca72c1f5b3' },
    update: {},
    create: {
      pseudo: 'admin',
      email: 'admin@prisma.io',
      avatar: 'https://i.pravatar.cc/150?u=admin',
      verified: true,
      esl: 'http://www.esl.com/admin',
      twitter: 'http://www.twitter.com/admin',
      grade: 'manager',
      password: 'adminpassword',
      role: 'admin',
      verificationCode: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordResetToken: null,
      passwordResetAt: null,
    },
  });

  const player1 = await prisma.player.upsert({
    where: { id: '1a751e3a-8884-4f29-98d7-81d3f5cbc715' },
    update: {},
    create: {
      userId: alice.id,
      nickname: 'alicename',
      rank: 10,
      race: 'vanguard',
      league: 'master',
      winrate: 80.5,
      mmr: 1500,
      points: 1600,
      wins: 80,
      losses: 20,
      ties: 0,
      matches: 100,
      progress: 'up',
    },
  });

  const player2 = await prisma.player.upsert({
    where: { id: '1a751e3a-8884-4f29-98d7-81d3f5cbc716' },
    update: {},
    create: {
      userId: bob.id,
      nickname: 'bobname',
      rank: 11,
      race: 'infernal',
      league: 'diamond',
      winrate: 70.5,
      mmr: 1400,
      points: 1500,
      wins: 70,
      losses: 30,
      ties: 0,
      matches: 100,
      progress: 'down',
    },
  });

  console.log({ alice, bob, john, mat, user, admin });

  console.log({ player1, player2 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
