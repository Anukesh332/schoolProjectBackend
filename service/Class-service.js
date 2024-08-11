const {ScanCommand,PutItemCommand,QueryCommand,DeleteItemCommand,UpdateItemCommand,} = require("@aws-sdk/client-dynamodb");
const { ddbClient } = require("./ddbClient");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const { Class } = require("../Entity/Class");

class ClassService {
  constructor() {
    this.TABLENAME = "School";
  }

  // ==================================================    add    ======================================================

  addClass(clas) {
    console.log(clas);
    //   let params = {
    //     TableName: this.TABLENAME,
    //     Item: marshall(customer),
    //   };

    const marshallOptions = {
      // Whether to automatically convert empty strings, blobs, and sets to `null`.

      convertEmptyValues: false, // false, by default.

      // Whether to remove undefined values while marshalling.

      removeUndefinedValues: true, // false, by default.

      // Whether to convert typeof object to map attribute.

      convertClassInstanceToMap: true, // false, by default. <-- HERE IS THE ISSUE
    };

    var cla = new Class(clas);

    let params = {
      TableName: this.TABLENAME,

      Item: marshall(cla, marshallOptions),
    };

    let result = ddbClient.send(new PutItemCommand(params)).catch((err) => {
      console.log("err:" + err);
      return Promise.reject(err);
    });

    console.log("err1:" + result);
    return Promise.resolve(result);
  }

  // =======================================    get all    =================================================

  async getAllClass() {
    let params = {
      TableName: this.TABLENAME,
      FilterExpression: "Entity = :Class",
      ExpressionAttributeValues: { ":Class": { S: "CLASS" } },
    };

    let result = await ddbClient.send(new ScanCommand(params)).catch((err) => {
      console.log("err:" + err);
      return Promise.reject(err);
    });
    console.log(result);
    let admins = [];
    result.Items.forEach((Item) => admins.push(unmarshall(Item)));
    return Promise.resolve(admins);
  }

  // ========================================    get by id    ===========================================

  async getClassById(ClassDesignation) {
    let params = {
      TableName: this.TABLENAME,
      KeyConditionExpression: "ClassDesignation = :desi",
      ExpressionAttributeValues: {
        ":desi": { S: ClassDesignation },
      },
    };

    let result = await ddbClient.send(new QueryCommand(params)).catch((err) => {
      console.log("err:" + err);
      return Promise.reject(err);
    });
    console.log(result);
    return Promise.resolve(result);

    // let admin = [];
    // result.Items.forEach((item) => admin.push(unmarshall(item)));
    // return Promise.resolve(admin);
  }

  // ==========================================    update    ==================================================

  async updateClass(Class) {
    console.log(Class);
    let params = {
      TableName: this.TABLENAME,
      Key: {
        ClassDesignation: { S: Class.ClassDesignation },
        StudentId: { S: "Not Applicable" },
      },
      UpdateExpression:
        "set #engtcher=:et, #mttcher=:mt, #hdtcher=:ht, #cltcher=:ct, #mtitcher=:mit, #dtcher=:dt, #sctcher=:st, #tosdt=:ts  ",
      ExpressionAttributeNames: {
        "#engtcher": "EnglishTeacher",
        "#mttcher": "MathsTeacher",
        "#hdtcher": "HindiTeacher",
        "#cltcher": "ClassTeacher",
        "#mtitcher": "MarathiTeacher",
        "#dtcher": "DrawingTeacher",
        "#sctcher": "ScienceTeacher",
        "#tosdt": "TotalStudents",
      },
      ExpressionAttributeValues: {
        ":et": { S: Class.EnglishTeacher },
        ":mt": { S: Class.MathsTeacher },
        ":ht": { S: Class.HindiTeacher },
        ":ct": { S: Class.ClassTeacher },
        ":mit": { S: Class.MarathiTeacher },
        ":dt": { S: Class.DrawingTeacher },
        ":st": { S: Class.ScienceTeacher },
        ":ts": { S: Class.TotalStudents },
      },
    };
    let result = ddbClient.send(new UpdateItemCommand(params)).catch((err) => {
      if (err) {
        console.error("Unable to Update entry", err);
        // return Promise.error(err);
      } else {
        console.log(`Updated the entry succesfully`);
      }
      return Promise.error(err);
    });
    return Promise.resolve(result);
  }

  // =============================================    delete    =======================================================

  async deleteClass(cladesi) {
    console.log(cladesi);
    let params = {
      TableName: this.TABLENAME,
      Key: {
        ClassDesignation: { S: cladesi },
        StudentId: { S: "Not Applicable" },
      },
    };

    let result = ddbClient.send(new DeleteItemCommand(params)).catch((err) => {
      if (err) {
        console.error("Unable to delete entry", err);
        // return Promise.error(err);
      } else {
        console.log(`Deleted the entry succesfully`);
      }
      return Promise.error(err);
    });
    return Promise.resolve(result);
  }


// ========================================================================================================================


}

module.exports = { ClassService };
