import pool from "../../db.js";
import * as queries from "./queries.js";
import got from "got";
export const addTemporaryHint = (request, response) => {
  const { qlink, hints } = request.body;
  // console.log(request.user);
  // padd hints array with undefined if length is less than 5
  if (hints.length < 5) {
    for (let i = hints.length; i < 5; i++) {
      hints.push(null);
    }
  }

  // console.log(qlink,hints,userId);
  // add hints array to table temphints postgresql
  pool.query(
    queries.addTemporaryHint,
    [...hints, qlink, request.user.id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows[0]);
    }
  );
};
export const addPermanentHint = (request, response) => {};
export const updateHandle = (request, response) => {
  const { handle } = request.body;
  console.log(request.user,handle);
  pool.query(
    queries.updateHandle,
    [handle, request.user.id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows[0]);
    }
  );
}
export const VerifyCodeforcesHandle = async (request, response) => {
  try {
    const { handle } = request.body;
    // convert handle to all lowercase
    // handle = handle.toLowerCase();

    // extract the html body of `https://codeforces.com/submissions/${handle}`
    const pageUrl = `https://codeforces.com/submissions/${handle}`;
    let res = "";
    try {
      res = await got(pageUrl);
    } catch (err) {
      console.log(err);
    }
    const htmlBody = res?.body;
    const questionName = "Cactus Lady and her Cing";
    // find the first occurence of questionName in htmlBody
    const questionIndex = htmlBody.indexOf(questionName);
    // if questionIndex is -1, then questionName is not found in htmlBody then return false
    if (questionIndex === -1) {
      console.log('Question not found');
      response.status(400).json({ verified: false });
      return;
    }
    // find the first occurence of `handle` after questionIndex
    const handleIndex = htmlBody.indexOf(handle, questionIndex);
    if(handleIndex === -1){
      console.log('Handle not found');
      response.status(400).json({ verified: false });
      return;
    }
    // check if "Compilation error" exists between questionIndex and handleIndex
    const compilationError = htmlBody.includes(
      "Compilation error",
      questionIndex,
      handleIndex
    );
    console.log(
      handle,
      questionName,
      questionIndex,
      handleIndex,
      compilationError
    );
    if (compilationError) {
      updateHandle(request.user, handle);
      response.status(200).json({ verified: true });
    } else {
      response.status(400).json({ verified: false });
    }
  } catch (err) {
    console.log(err);
  }
  // response.status(200).json(res.body);
  // console.log(res);
};
