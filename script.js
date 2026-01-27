const prisma = require("./lib/prisma.js");

async function main() {
  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      files: true,
    },
  });
  console.log("All users:", allUsers);
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
