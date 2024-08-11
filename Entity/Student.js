const { v4: uuidv4 } = require('uuid');


class Student{

    constructor (Student) {

    
        var SK,PK


        //PK = uuidv4()

        //SK=PK

        //this.PK = PK

        //this.SK =   SK;

        this.StudentId = uuidv4()
        console.log(this.StudentId)

       // this.CustId= SK

       this.ClassDesignation = Student.ClassDesignation,

        this.Entity = "STUDENT"

        this.StudentName = Student.StudentName

        this.DateOfAdmission = new Date().toString("%d/%m/%Y, %H:%M:%S"),

        this.FeesPaid = Student.FeesPaid

        this.Status = Student.Status

        this.StudentRollNo = Student.StudentRollNo

        // this.BookingId = Booking.TravellerCode + "_" + new Date().toISOString();

    }


}



module.exports = {Student}