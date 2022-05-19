


const Student = require("./../Models/StudentSchema");
exports.getAllStudent = (request, response) => {

    Student.find({})//.populate({path:"department"})
        .then(data => {
            response.status(200).json(data)

        })
        .catch(error => {
            next(error);
        })
}

exports.getStudent = (request, response, next) => {

    Student.findOne({ _id:Number(request.params.id) })//.populate({path:"department"})
        .then(data => {
            if (!data) {
                next(new Error("Student id not Found"))
                
                response.status(500).json(data)
            }
            else{
                response.status(200).json(data)
            }
        })
        .catch(error => {
            next(error);
        })
}
exports.createStudent = (request, response, next) => {
    console.log(request.file)
    let object = new Student({
        _id: request.body.id,
        name: request.body.name,
        department: request.body.department,
        image: request.file.filename
    })
    object.save()
        .then(data => {
            response.status(201).json({ message: "added", data })

        })
        .catch(error => next(error))
}

exports.updateStudent = (request, response, next) => {
    Department.findByIdAndUpdate(request.body.id, {
        $set: {
            name: request.body.name,
            department: request.body.department,
            image: request.file.filename
        }
    })
        .then(data => {
            if (data == null) throw new Error("Student Is not Found!")
            response.status(200).json({ message: "updated", data })

        })
        .catch(error => next(error))
}

exports.deleteStudent = (request, response, next) => {
    Department.findByIdAndDelete(request.body.id)
        .then(data => {
            if (data == null) throw new Error("Student Is not Found!")
            response.status(200).json({ message: "deleted" })

        })
        .catch(error => next(error))
}




