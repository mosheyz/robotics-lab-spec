
import { students } from '../db/students.js';
import { ObjectId } from 'mongodb';


const studentsRepo = {
  create: async (student) => {
    try {

      const result = await students.insertOne(student)
      return result.insertedId.toString()
    } catch (error) {
      console.error(error)
    }
  },

  findById: async (id) => {
    const student = await students.findOne({ _id: new ObjectId(id) })
    return student
  },

  update: async (studentId, labId) => {
    const result = await students.updateOne(
      { _id: new ObjectId(studentId) },
      { $addToSet: {labSessionsIds: labId} })
      return result.modifiedCount;
  }
}