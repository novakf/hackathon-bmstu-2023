import pkg from "pg";
//import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";

const { Pool } = pkg;
const pool = new Pool({
user: "postgres",
host: "localhost",
database: "hackaton",
password: "qwerty",
port: 5432,
});
export const getStations = ()=>{
return new Promise(function (resolve, reject) {
pool.query("SELECT * FROM stations", (error, results) => {
if (error) {
reject(error);
}
resolve(results.rows);
});
});
};

export const postStation = (body) => {
return new Promise(function (resolve, reject) {
console.log();
pool.query(
"insert into stations (x,y,v,dir, charge) values($1,$2,$3, $4,$5)",
[body.x, body.y, body.v, body.diraction, body.charge],
(error, results) => {
if (error) {
reject(error);
console.log(error);
}
resolve(results.rows);
}
);
});
};