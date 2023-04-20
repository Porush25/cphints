import pool from "../../db.js";
import bcrypt, { hash } from "bcrypt";
import * as queries from "./queries.js";
import jwt from "jsonwebtoken";
export const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
// database schema CREATE TABLE users (ID SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(512), handle VARCHAR(255), color VARCHAR(25),username varchar(255));
export const addUser = async (request, response) => {
  const { name, email, password, handle, color, username } = request.body;
  console.log(request.body);
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //check if user already exists in postgres
  pool.query(
    queries.checkAlreadyExists,
    [email, username],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length > 0) {
        response.status(409).send("User already exists");
      } else {
        pool.query(
          queries.addUser,
          [name, email, hashedPassword, handle, color, username],
          (error, results) => {
            if (error) {
              throw error;
            }
            // console.log(results.rows[0].id);
            const accessToken=jwt.sign(results.rows[0],"secret");
            response.status(201).json({accessToken});
          }
        );
      }
    }
  );
};

// login user by checking by both username and email
export const loginUser = async (request, response) => {
  const { id, password } = request.body;
  // check if id is email or username
  let email = id;
  let username = id;
  if (id?.includes("@")) {
    email = id;
    username = "@";
  } else {
    email = "c@p@";
    username = id;
  }

  pool.query(
    queries.checkAlreadyExists,
    [email, username],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length > 0) {
        const user = results.rows[0];
        bcrypt.compare(password, user.password, function (err, res) {
          if (res) {
            const accessToken=jwt.sign(user,"secret");
            response.status(200).json({accessToken});
          } else {
            response.status(401).send("Invalid credentials");
          }
        });
      } else {
        response.status(401).send("Invalid credentials");
      }
    }
  );
};
