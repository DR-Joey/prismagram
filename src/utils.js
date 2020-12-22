import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const auth = {
  auth: {
    domain: process.env.MAILGUN_DOMAIN,
    api_key: process.env.MAILGUN_KEY,
  },
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "joey@prismagram.com",
    to: "jegal07@naver.com",
    subject: "🔒Login Secret for Prismagram🔒",
    html: `Hello! Your login secret is <strong>${secret}</strong0> <br/>Copy paste on the app/website to log in`,
  };
  // sendSecretMail은 sendMail을 리턴
  // sendMail은 Promise함수를 리턴
  return nodemailerMailgun.sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
