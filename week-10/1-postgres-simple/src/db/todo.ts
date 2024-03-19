import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(
  userId: number,
  title: string,
  description: string
) {
  try {
    await client.connect();
    let q = "INSERT INTO todos (userId,title,description) VALUES ($1,$2,$3)";
    const values = [userId, title, description];
    const todo = await client.query(q, values);
    console.log(todo);
    return todo;
  } catch (error) {
    console.log(error);
  }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
  try {
    await client.connect();
    let q = `
        UPDATE todos
        SET done = true,
        WHERE id = $1
        `;

    let value = [todoId];
    const res = await client.query(q, value);
    return res;
  } catch (error) {
    console.log(error);
  }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
  try {
    await client.connect();
    let q = "SELECT * FROM todos WHERE userId = $1";
    let value = [userId];
    const res = await client.query(q, value);
    return res;
  } catch (error) {
    console.log(error);
  }
}
