import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  /* Reset the database */
  await prisma.player.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  /* Seed the database */

  /* Users */
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

  /* Players */

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

  /* Posts */

  const post1 = await prisma.post.upsert({
    where: { id: '1a751e3a-8884-4f29-98d7-81d3f5cbc717' },
    update: {},
    create: {
      title: 'Mon premier post',
      category: 'Replay',
      image: 'https://i.pravatar.cc/150?u=post1',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a pharetra lacus, et fringilla sem. Morbi pellentesque tortor id vulputate placerat. Aenean ultrices, arcu vel congue eleifend, tortor mauris ultrices sem, quis posuere magna elit vel turpis. Maecenas non ultricies velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper enim nec ultrices vehicula. Phasellus tempor pharetra molestie Aenean id scelerisque risus, a pulvinar enim. Nulla nec maximus magna, ac dignissim justo. Donec maximus lacinia enim, ac volutpat enim. Vivamus vitae quam nec ante dictum elementum non in leo. Etiam ultricies sit amet nisl vulputate dignissim. Fusce vitae varius justo. Aenean quam felis, ornare gravida interdum nec, suscipit quis ipsumNam sollicitudin erat diam, in molestie justo interdum vitae. Phasellus vel enim ut mauris blandit dictum. Duis tincidunt neque vel purus feugiat, id commodo sapien dapibus. Etiam in iaculis eros. Phasellus dignissim eleifend lectus quis auctor. Suspendisse eu arcu vulputate, condimentum purus ut, luctus purus. Donec eleifend a nibh in sodales. Duis a maximus ligula. Aliquam erat volutpat. Aenean cursus lacinia est, eget suscipit ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed condimentum tincidunt nisl non convallis. Nulla ac neque elit. Vestibulum magna odio, tincidunt ac felis nec, accumsan pulvinar est. Ut id quam quis magna maximus fringilla. Donec efficitur fermentum sapien, ut consequat eros semper in',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: alice.id,
    },
  });

  const post2 = await prisma.post.upsert({
    where: { id: '1a751e3a-8884-4f29-98d7-81d3f5cbc718' },
    update: {},
    create: {
      title: 'Mon deuxième post',
      category: 'Build',
      image: 'https://i.pravatar.cc/150?u=post2',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a pharetra lacus, et fringilla sem. Morbi pellentesque tortor id vulputate placerat. Aenean ultrices, arcu vel congue eleifend, tortor mauris ultrices sem, quis posuere magna elit vel turpis. Maecenas non ultricies velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper enim nec ultrices vehicula. Phasellus tempor pharetra molestie Aenean id scelerisque risus, a pulvinar enim. Nulla nec maximus magna, ac dignissim justo. Donec maximus lacinia enim, ac volutpat enim. Vivamus vitae quam nec ante dictum elementum non in leo. Etiam ultricies sit amet nisl vulputate dignissim. Fusce vitae varius justo. Aenean quam felis, ornare gravida interdum nec, suscipit quis ipsumNam sollicitudin erat diam, in molestie justo interdum vitae. Phasellus vel enim ut mauris blandit dictum. Duis tincidunt neque vel purus feugiat, id commodo sapien dapibus. Etiam in iaculis eros. Phasellus dignissim eleifend lectus quis auctor. Suspendisse eu arcu vulputate, condimentum purus ut, luctus purus. Donec eleifend a nibh in sodales. Duis a maximus ligula. Aliquam erat volutpat. Aenean cursus lacinia est, eget suscipit ipsum. Pellentesque habitant morbi tristique sen',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: bob.id,
    },
  });

  console.log({ alice, bob, john, mat, user, admin });

  console.log({ player1, player2 });

  console.log({ post1, post2 });
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
