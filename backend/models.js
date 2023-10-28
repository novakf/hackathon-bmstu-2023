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

 export const postStation = (body,id) => {
     return new Promise(function (resolve, reject) {
      console.log();
      pool.query(
        "UPDATE stations SET v = $1 WHERE id = $2",
        [change, product_id],
        (error, results) => {
          if (error) {
            reject(error);
            console.log(error);
          }
          resolve(`Название изменено на ${change}`);
        }
      );
      /*const { property, change, product_id } = body;
       console.log();
       if (property === "product_name")
         pool.query(
           "UPDATE products SET product_name = $1 WHERE product_id = $2",
           [change, product_id],
           (error, results) => {
             if (error) {
               reject(error);
               console.log(error);
             }
             resolve(`Название изменено на ${change}`);
           }
         );
       if (property === "category")
         pool.query(
           "UPDATE products SET category = $1 WHERE product_id = $2",
           [change, product_id],
           (error, results) => {
             if (error) {
               reject(error);
               console.log(error);
             }
             resolve(`Категория изменена на ${change}`);
           }
         );
       if (property === "price")
         pool.query(
           "UPDATE products SET price = $1 WHERE product_id = $2",
           [change, product_id],
           (error, results) => {
             if (error) {
               reject(error);
               console.log(error);
             }
             resolve(`Цена изменена на ${change}`);
           }
         );
       if (property === "protein")
         pool.query(
           "UPDATE products SET protein = $1 WHERE product_id = $2",
           [change, product_id],
           (error, results) => {
             if (error) {
               reject(error);
               console.log(error);
             }
             resolve(`Белки изменены на ${change}`);
           }
         );
       if (property === "fats")
         pool.query(
           "UPDATE products SET fats = $1 WHERE product_id = $2",
           [change, product_id],
           (error, results) => {
             if (error) {
               reject(error);
               console.log(error);
             }
             resolve(`Жиры изменены на ${change}`);
           }
         );
       if (property === "carbs")
         pool.query(
           "UPDATE products SET carbs = $1 WHERE product_id = $2",
           [change, product_id],
           (error, results) => {
             if (error) {
               reject(error);
               console.log(error);
             }
             resolve(`Углеводы изменены на ${change}`);
           }
         );*/
     });
   };