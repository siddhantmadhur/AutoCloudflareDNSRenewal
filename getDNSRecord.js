#!/usr/bin/env node

require("dotenv").config({ path: require("find-config")(".env") });

const { execSync } = require("child_process");
const token = process.env.TOKEN;
const zone = process.env.ZONE_ID;
const axios = require("axios");

function outputDNSRecord(key, {id, zone_id, zone_name, name, type, content, proxiable, proxied, ttl, locked}) {
  console.log("Record: " + key)
  console.log("ID: " + id)
  console.log("Name: " + name )
  console.log("Type: " + type)
  console.log("Content: " + content)
  console.log("")

}

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

  result.forEach((record, key)=>{
    outputDNSRecord(key+1, record)
  })
}

grabDNSRecordID();
