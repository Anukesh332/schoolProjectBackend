const {ScanCommand,PutItemCommand,QueryCommand,DeleteItemCommand,UpdateItemCommand,} = require("@aws-sdk/client-dynamodb");
const { ddbClient } = require("./ddbClient");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const { Student } = require("../Entity/Student");

class StudentService {
    constructor() {
      this.TABLENAME = "School";
    }

  // ==================================================    add    ======================================================

  addStudent(student) {
    console.log(student);
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

    var stu = new Student(student);

    let params = {
      TableName: this.TABLENAME,

      Item: marshall(stu, marshallOptions),
    };

    let result = ddbClient.send(new PutItemCommand(params)).catch((err) => {
      console.log("err:" + err);
      return Promise.reject(err);
    });

    console.log("err1:" + result);
    return Promise.resolve(result);
  }


  // =======================================    get all    =================================================

  async getAllStudent() {
    let params = {
      TableName: this.TABLENAME,
      FilterExpression: "Entity = :Student",
      ExpressionAttributeValues: { ":Student": { S: "STUDENT" } },
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

// =======================================    get by id    =============================================
    

async getStudentById(StudentId) {
    let params = {
      TableName: this.TABLENAME,
      KeyConditionExpression: "StudentId = :id",
      ExpressionAttributeValues: {
        ":id": { S: StudentId },
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

// async updateStudent(Student) {
//     console.log(Student);
//     let params = {
//       TableName: this.TABLENAME,
//       Key: {
//         ClassDesignation: { S: Class.ClassDesignation },
//         StudentId: { S: Student.StudentId },
//       },
//       UpdateExpression:
//         "set #stdnm=:sn, #fep=:fp, #rollno=:rn, #cldesi=:cd ",
//       ExpressionAttributeNames: {
//         "#stdnm": "StudentName",
//         "#fep": "FeesPaid",
//         "#rollno": "StudentRollNo",
//         "#cldesi": "ClassDesignation"
//       },
//       ExpressionAttributeValues: {
//         ":sn": { S: Student.StudentName },
//         ":fp": { S: Student.FeesPaid },
//         ":rn": { S: Student.StudentRollNo },
//         ":cd": { S: Student.ClassDesignation }
//       },
//     };
//     let result = ddbClient.send(new UpdateItemCommand(params)).catch((err) => {
//       if (err) {
//         console.error("Unable to Update entry", err);
//         // return Promise.error(err);
//       } else {
//         console.log(`Updated the entry succesfully`);
//       }
//       return Promise.error(err);
//     });
//     return Promise.resolve(result);
//   }




}


module.exports = { StudentService };