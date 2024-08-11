const { Router } = require("express");
const { Student } = require("../Entity/Student");
const { StudentService } = require("../service/Student-service");

var rolerouters = Router();
var admSvc = new StudentService();

// =================================================    add    ===========================================================

rolerouters.post("/post", async (req, res) => {
    let admin = req.body;
    let Status = new String("Active");
    admin.Status = Status;
    let result = await admSvc
  
      .addStudent(admin)
      .catch((err) =>
        res.status(500).json({ message: "Unable to add new Role" })
      );
  
    if (result) {
      console.log("added");
      res.status(201).json({ message: "Role added successfully" });
    }
  });



  // ==================================================    get all    ========================================================

rolerouters.get("/get", async (req, res) => {
    // let admin = req.body;
    let result = await admSvc
      .getAllStudent()
      .catch((err) =>
        res.status(500).json({ message: "Unable to add new Role" })
      );
  
    if (result) {
      console.log("get all done");
      res.status(200).json(result);
    }
  });


// =============================================    get by id    =====================================================

rolerouters.get("/:id", async (req, res) => {
    // let admin = req.body;
    var StudentId = req.params["id"];
      // console.log("getbyId");
    //   console.log(CustomerCode);
  
    let result = await admSvc
  
      .getStudentById(StudentId)
  
      .catch((err) =>
  
        res.status(500).json({ message: "Unable to add new Role" })
  
      );
  
  
  
    if (result) {
  
    //   console.log("2");
  
      console.log("getbyid done");
  
      res.status(200).json(result);
  
    }
  
  });



// ===================================================    update    ==========================================================

// rolerouters.put('/put', async (req, res) => {
//     let student = req.body
//     console.log('update')
//     let result = await admSvc
//       .updateStudent(student)
//       .catch((err) => res.status(500).json({ message: 'Unable to update' }))
//     if (result) {
//       console.log('Updated successfully')
//       res.status(200).json({ message: 'Updated successfully' })
//     }
//   })



  module.exports = { rolerouters };
