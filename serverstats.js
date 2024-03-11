const redis = require("redis");

let blueGarrison = [];
let weapon = [];


async function main() {
  await blueClient.connect();
}

const blueClient = redis.createClient({
  url: "redis://10.95.133.252:6381",
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

// async function pushJson(name, weapon) {

//     const value = await blueClient.rPush("valentin", JSON.stringify({name, weapon}));

// }

async function getSoldierLost() {
    const value = await blueClient.zRange("soldierLost", 0, -1);
    console.log("Soldats tombés au combat:", value);
}

async function getSoldierRetired() {
    const value = await blueClient.zRange("soldierRetired", 0, -1);
    console.log("Soldats retirés:", value);
}

async function getSoldierOnBatteleField() {
    const value = await blueClient.zRange("soldierOnBattleField", 0, -1);
    console.log("Soldats sur champs de batailles:", value);
}

async function soldierSentSucces() {
    const value = await blueClient.zRange("soldierSentSuccess", 0, -1);
    console.log("Soldats envoyés avec succès:", value);

}

async function soldierSentFailed() {
    const value = await blueClient.zRange("soldierSentFailed", 0, -1);
    console.log("Soldats envoyés avec échec:", value);
}




async function sendCombat() {
    await getBlueGarrison();
    await getSoldierWeapon(blueGarrison[0]);
    // await pushJson(blueGarrison[0], weapon[0]);
    await getSoldierLost();
    await getSoldierRetired();
    await getSoldierOnBatteleField();
    await soldierSentSucces();
    await soldierSentFailed();
    weapon = [];
    blueGarrison = [];
}

setInterval(sendCombat, 1000);