import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(
  username: string,
  password: string,
  name: string
) {
  try {
    await client.connect();
    let q = ` INSERT INTO users (username,password,name) VALUES ($1,$2,$3)`;
    let VALUES = [username, password, name];
    const res = await client.query(q, VALUES);
    return res;
  } catch (error) {
    console.log(error);
  }
}

createUser("ankit", "123456", "Ankit kashyap");

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
  try {
    await client.connect();
    let q = "SELECT username,password,name FROM users WHERE id = $1";
    const value = [userId];
    const res = await client.query(q, value);
    return res;
  } catch (error) {
    console.log(error);
  }
}

getUser(1);
