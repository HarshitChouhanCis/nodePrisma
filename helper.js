import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
//   create single user
//   const user = await prisma.user.create({
//       data: {
//           name: "xyz",
//           email: "xyz@gmail1.com"
//         },
//     })
//     console.log('user:', user);



//  multiple user
    
// const users = await prisma.user.createMany({
//       data:[ {
//           name: "xyz21(1)",
//           email: "xyz21@gmail1.com"
//         },
//         {
//           name: "xyz12(2)",
//           email: "xyz12@gmail1.com"
//         },{
//           name: "xyz1(3)",
//           email: "xyz1@gmail1.com"
//         },{
//           name: "xyz2(4)",
//           email: "xyz2@gmail1.com"
//         },{
//           name: "xyz3(5)",
//           email: "xyz3@gmail1.com"
//         },
//     ]
//     })
//     console.log('users:', users);


// Read all Data

// const allUsers = await prisma.user.findMany();
// console.log('allUsers:', allUsers);



// Read unique Data or get user

// const singleUser = await prisma.user.findUnique({
//     where :{id : 6},
// });
// console.log('singleUser:', singleUser);



// get user with filter and inside the where only id and email is pass only because
//  the email amd id are unique in the schema model(by default id is unique)
// const singleUser = await prisma.user.findUnique({
//     where :{email : "xyz3@gmail1.com"},
// });
// console.log('singleUser:', singleUser);

//  get user with filter with name
// const singleUser = await prisma.user.findMany({
//     where :{name : "xyz12(2)"},
// });
// console.log('singleUser:', singleUser);


// Update
// where -> write the unique attribute
// const updateduser = await prisma.user.update({
//     where: {id:5},
//     data: {name: "BobTheBuilder"},
// });
// console.log('updateduser:', updateduser);

// };


// update using many
// const updateduser = await prisma.user.updateMany({
//     where: {name:"BobTheBuilderKrKeDikhayege"},
//     data: {name: "BobTheBuilderKrKeDikhayege..."},
// });
// console.log('updateduser:', updateduser);


// delete
// const deletedData = await prisma.user.delete({
//     where:{id: 5},
// });

// console.log('deletedData:', deletedData);

// };


// deleteMany
const deletedData = await prisma.user.deleteMany({
 where: {
    id: {
      in: [6, 7, 8],
    },
  },
});

console.log('deletedData:', deletedData);

};



main().catch((e)=>
    console.error(e)).finally(async()=> {await prisma.$disconnect(); });

