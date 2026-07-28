export function studentService(repo) {
  return {
    createStudent: (student) => {
      student.labSessionsIds = []
      return repo.create(student)
    },

    getById: (id) => {
      return repo.findById(id)
    },

    update: (studentId, labId) => {
     
    }
  }
}

