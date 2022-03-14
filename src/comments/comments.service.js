const knex = require("../db/connection");
const table = "comments";

function list() {
  // my solution
  return knex(table).select("*");
}

function listCommenterCount() {
  // my solution
  return knex("comments as c")
    .join("users as u", "c.commenter_id", "u.user_id")
    .count("c.comment_id")
    .select("u.user_email as commenter_email")
    .groupBy("commenter_email")
    .orderBy("commenter_email");
}

function read(commentId) {
  // my solution
  return knex("comments as c")
    .join("users as u", "c.commenter_id", "u.user_id")
    .join("posts as p", "c.post_id", "p.post_id")
    .select(
      "comment_id",
      "comment",
      "u.user_email as commenter_email",
      "p.post_body as commented_post"
    )
    .where({ comment_id: commentId })
    .first();
}

module.exports = {
  list,
  listCommenterCount,
  read,
};