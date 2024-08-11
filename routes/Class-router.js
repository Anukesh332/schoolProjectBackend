const { Router } = require("express");
const { ClassService } = require("../service/Class-service");

var rolerouter = Router();
var admSvc = new ClassService();

// =================================================    add    ===========================================================

rolerouter.post("/post", async (req, res) => {
  let admin = req.body;
  let result = await admSvc

    .addClass(admin)
    .catch((err) =>
      res.status(500).json({ message: "Unable to add new Role" })
    );

  if (result) {
    console.log("added");
    res.status(201).json({ message: "Role added successfully" });
  }
});

// ==================================================    get all    ========================================================

rolerouter.get("/get", async (req, res) => {
  // let admin = req.body;
  let result = await admSvc
    .getAllClass()
    .catch((err) =>
      res.status(500).json({ message: "Unable to add new Role" })
    );

  if (result) {
    console.log("get all done");
    res.status(200).json(result);
  }
});

// ==============================================    get by id    ============================================================

rolerouter.get("/:desi", async (req, res) => {
  //let admin = req.body;
  var ClassDesignation = req.params["desi"];
  //   console.log("getbyId");
  //   console.log(CustomerCode);

  let result = await admSvc

    .getClassById(ClassDesignation)

    .catch((err) =>
      res.status(500).json({ message: "Unable to add new Role" })
    );

  if (result) {
    // console.log("2");

    console.log("getbyid done");

    res.status(200).json(result);
  }
});


// ===================================================    update    ==========================================================

rolerouter.put('/put', async (req, res) => {
  let classs = req.body
  console.log('update')
  let result = await admSvc
    .updateClass(classs)
    .catch((err) => res.status(500).json({ message: 'Unable to update' }))
  if (result) {
    console.log('Updated successfully')
    res.status(200).json({ message: 'Updated successfully' })
  }
})


// =============================================    delete    ===========================================================


rolerouter.delete("/delete/:desi", async (req, res) => {
  var cladesi = req.params ["desi"]
  // var id = req.params ["id"]
//  let customer = req.body;
 console.log("deleted");

 let result = await admSvc
.deleteClass(cladesi)
 .catch((err) =>
res.status(500).json({ message: "Unable to delete Role" })
 );

 if (result) {
 console.log("deleted");
 res.status(200).json(result);
 }

});



// =======================================================================================================================



module.exports = { rolerouter };
