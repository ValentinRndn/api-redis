const redis = require("redis");

let blueGarrison = [];
let weapon = [];


async function main() {
  await blueClient.connect();
}

const blueClient = redis.createClient({
  url: "redis://10.95.133.252:6379",
});

main();

async function getBlueGarrison() {
  const value = await blueClient.lPop("blueGarrison");
  blueGarrison.push(value);
}

async function getSoldierWeapon(soldier) {
  const value = await blueClient.hGet( `soldier:${soldier}`,"weapon");
    weapon.push(value);
}

async function pushJson(name, weapon) {

    const value = await blueClient.rPush("valentin", JSON.stringify({name, weapon}));

}


async function sendCombat() {
    await getBlueGarrison();
    await getSoldierWeapon(blueGarrison[0]);
    await pushJson(blueGarrison[0], weapon[0]);
    weapon = [];
    blueGarrison = [];
}

setInterval(sendCombat, 1000);