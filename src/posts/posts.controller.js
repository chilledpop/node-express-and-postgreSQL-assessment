const service = require("./posts.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function postExists(req, res, next) {
  const { postId } = req.params;

  const post = await service.read(postId);
  if (post) {
    res.locals.post = post;
    return next();
  }
  return next({ status: 404, message: `Post cannot be found.` });
}

async function create(req, res) {
  // my solution
  res.json({ data: await service.create(req.body.data) });
}

async function update(req, res) {
  // my solution
  const updatedPost = {
    ...req.body.data,
    post_id: req.params.postId,
  };
  await service.update(updatedPost).then((data) => res.json({ data }));
}

async function destroy(req, res) {
  // my solution
  await service.delete(res.locals.post.post_id).then(() => res.sendStatus(204));
}

module.exports = {
  create: asyncErrorBoundary(create),
  update: [asyncErrorBoundary(postExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(postExists), asyncErrorBoundary(destroy)],
};