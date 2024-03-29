import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    const res = await prisma.todo.create({
      data: {
        title: title,
        description: description,
        userId: userId,
      },
    });
    return res;
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
    const res = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        done: true,
      },
    });
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
    const res = await prisma.todo.findMany({
      where: {
        userId: userId,
      },
      select: {
        title: true,
        description: true,
        done: true,
        id: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
