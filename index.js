#!/usr/bin/env node

require("dotenv").config({ path: require("find-config")(".env") });

const { execSync } = require("child_process");

const cmd = `curl -s http://checkip.amazonaws.com || printf "0.0.0.0"`;
var pubIp = execSync(cmd).toString().trim();
const axios = require("axios");

const zone = process.env.ZONE_ID;
const dns = process.env.DNS_ID;
const token = process.env.TOKEN;

async function update() {
  const response = await axios.put(
    `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records/${dns}`,
    {
      type: process.env.TYPE,
      name: process.env.NAME,
      content: pubIp,
      proxied: true,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
}
let timer = new Date();

console.log(
  "Program started at " +
    timer.getHours() +
    ":" +
    timer.getMinutes() +
    ":" +
    timer.getSeconds() +
    " " +
    timer.getDate() +
    "-" +
    timer.getMonth() +
    "-" +
    timer.getFullYear()
);
update();
setInterval(() => {
  let current = new Date();
  const cmd = `curl -s http://checkip.amazonaws.com || printf "0.0.0.0"`;
  const tempIp = execSync(cmd).toString().trim();
  if (!pubIp.match(tempIp)) {
    console.log(
      "Doesn't match at " +
        current.getHours() +
        ":" +
        current.getMinutes() +
        ":" +
        current.getSeconds() +
        ". Updating now..."
    );
    update();
    pubIp = tempIp;
  } else {
    console.log(
      "Matches at " +
        current.getHours() +
        ":" +
        current.getMinutes() +
        ":" +
        current.getSeconds() +
        "..."
    );
  }
}, 1800000);
