import express from "express";
import pkg from "./generated/prisma/index.js";
import { body, validationResult } from "express-validator";
import { userValidationRules } from "./middleware/valdation.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany(); // Fetch all users
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Failed to fetch users" });
  }
};

app.get("/users", getAllUsers);

app.get("/ok", async (req, res) => {
  try {
    const users = await prisma.user.findMany(); // Fetch all users
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Failed to fetch users" });
  }
});

app.post("/ok", userValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, lastName, age, mobileNo, address } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        lastName,
        mobileNo,
        age,
        address,
      },
    });
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    // Handle unique constraint error for email
    if (
      error.code === "P2002" &&
      error.meta &&
      error.meta.target.includes("email")
    ) {
      return res.status(409).json({ error: "Email already exists" });
    }
    // Generic server error
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});



//  // update single field name in this code
// app.put("/ok", async (req, res) => {
//   console.log("req", req.body);

//   const { id, name, mobileNo, age} = req.body;
//   // where -> write the unique attribute
//   const updateduser = await prisma.user.update({
//     where: { id },
//     data: { name },
//   });

//   //   console.log("user:", user);
//   return res.send({ message: updateduser, msg: "Hi Everyone." });
// });



app.put("/ok", async (req, res) => {
  const { id, name, mobileNo, age ,address} = req.body;

  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  // Build the update data dynamically
  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (mobileNo !== undefined) updateData.mobileNo = mobileNo;
  if (age !== undefined) updateData.age = age;
  if (address !== undefined) updateData.address = address;
  

  //both are working 
  // if (typeof name === "string" && name.trim() !== "") updateData.name = name.trim();
  // if (typeof mobileNo === "string" && mobileNo.trim() !== "") updateData.mobileNo = mobileNo.trim();
  // if (typeof age === "number") updateData.age = age;
  // if (typeof address === "string" && address.trim() !== "") updateData.address = address.trim();


  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: "At least one field must be provided to update" });
  }

  console.log('updateData:', updateData);
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong while updating the user" });
  }
});




app.delete("/ok", async (req, res) => {
  console.log("req", req.body);

  const { id } = req.body;
  // where -> write the unique attribute
  const updateduser = await prisma.user.delete({
    where: { id },
  });

  //   console.log("user:", user);
  return res.send({ message: updateduser, msg: "delete susscessfully" });
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
