import { db } from "../DB/connect.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await db.query('SELECT * FROM "Users"');
    if (users.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found", Users: null, error: true });
    }

    return res.json({
      message: "Users Found",
      Users: users.rows,
      error: false,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching users", Users: null, error: true });
  }
};

export const getUserById = async (req, res) => {
  res.status(200).json({ message: "User found", User: req.user, error: false });
};

export const updateInfo = async (req, res) => {
  const { fname, lname, email, password, phoneNumber } = req.body;
  const { userId } = req.params;

  try {
    const updatedFname = fname || existingUser.rows[0].first_name;
    const updatedLname = lname || existingUser.rows[0].last_name;
    const updatedEmail = email || existingUser.rows[0].email;
    const updatedPassword = password || existingUser.rows[0].password;
    const updatedPhoneNumber = phoneNumber || existingUser.rows[0].phone_number;

    // Update query
    const updateQuery = `
      UPDATE "Users"
      SET 
        first_name = $1,
        last_name = $2,
        email = $3,
        password = $4,
        phone_number = $5
      WHERE u_id = $6
      RETURNING *;
    `;

    // Execute the update query
    const updatedUser = await db.query(updateQuery, [
      updatedFname,
      updatedLname,
      updatedEmail,
      updatedPassword,
      updatedPhoneNumber,
      userId,
    ]);

    return res.status(200).json({
      message: "User information updated successfully",
      User: updatedUser.rows[0],
      error: false,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error updating users", Users: null, error: true });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await db.query('DELETE FROM "Users" WHERE u_id = $1', [userId]);
    return res.status(204).json({
      message: "User deleted successfully",
      Users: null,
      error: false,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error deleting user", Users: null, error: true });
  }
};
