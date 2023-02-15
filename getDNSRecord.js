#!/usr/bin/env node

require("dotenv").config({ path: require("find-config")(".env") });

const { execSync } = require("child_process");
const token = process.env.TOKEN;
const zone = process.env.ZONE_ID;
const axios = require("axios");

async function grabDNSRecordID() {
  const {
    data: { result },
  } = await axios.get(
    "https://api.cloudflare.com/client/v4/zones/" + zone + "/dns_records",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  console.log(result);
}

grabDNSRecordID();
