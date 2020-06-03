const express = require("express");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const connection = require("./lib/db");

const app = express();

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  let sql = `select * from posts`;
  let query = connection.query(sql, (err, rows) => {
    if (err) throw err;
    res.render("index", {
      title: `drawing container using nodejs`,
      posts: rows,
    });
  });
});

app.get("/view/:id", (req, res) => {
  let sql = `select * from posts where id = ${req.params.id}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    res.render("view", {
      title: `drawing container using nodejs`,
      post: result[0],
    });
  });
});

app.get("/create", (req, res) => {
  res.render("create", {
    title: `drawing container using nodejs`,
  });
});

app.post("/save", (req, res) => {
  let data = {
    title: req.body.title,
    image: req.body.image,
    text: req.body.text,
  };
  let sql = `insert into posts set ?`;
  let query = connection.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/edit/:id", (req, res) => {
  let sql = `select * from posts where id = ${req.params.id}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    res.render("edit", {
      title: `drawing container using nodejs`,
      post: result[0],
    });
  });
});

app.post("/update", (req, res) => {
  const postId = req.body.id;
  const postTitle = req.body.title;
  const postImage = req.body.image;
  const postText = req.body.text;
  let sql = `update posts set title = '${postTitle}', image = '${postImage}', text = '${postText}' where id = ${postId}`;
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/delete/:Id", (req, res) => {
  const postId = req.params.Id;
  let sql = `delete from posts where id = ${postId}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(4000, () => {
  console.log(`server is running at port 4000`);
});
