const express = require("express");
const router = express.Router();

const profile = require("../data/profile");
const skills = require("../data/skills");
const projects = require("../data/projects");

router.get("/", (req, res) => {
  res.render("pages/home", {
    title: `${profile.name} — Portfolio`,
    page: "home",
    profile,
    skills,
    projects
  });
});

router.get("/about", (req, res) => {
  res.render("pages/about", {
    title: `About — ${profile.name}`,
    page: "about",
    profile
  });
});

router.get("/skills", (req, res) => {
  res.render("pages/skills", {
    title: `Skills — ${profile.name}`,
    page: "skills",
    profile,
    skills
  });
});

router.get("/projects", (req, res) => {
  res.render("pages/projects", {
    title: `Projects — ${profile.name}`,
    page: "projects",
    profile,
    projects
  });
});

router.get("/contact", (req, res) => {
  res.render("pages/contact", {
    title: `Contact — ${profile.name}`,
    page: "contact",
    profile
  });
});

router.post("/contact", (req, res) => {
  // Demo endpoint only: wire this to an email provider or form service before production.
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, message: "Please complete every field." });
  }
  return res.status(501).json({
    ok: false,
    message: "The form UI works, but message delivery is not configured yet. Connect an email service before publishing."
  });
});

module.exports = router;
