import { supabase } from '../db/sessions.js';


export const sessionsRepo = (supabase) => {

  return {

    findById: async (sessionId) => {
      try {
        const { data, error } = await supabase.from("sessions")
          .select()
          .eq("id", sessionId)

        if (error) throw error
        if (!data) {
          const err = new Error = "not found"
          err.status = 404
          throw err
        }

        return data

      } catch (error) {
        console.error(error)
      }
    },

    register: async (sessionId) => {
      try {

        const { data, error } = await supabase.from("sessions")
          .select()
          .eq("id", sessionId)

        if (error) throw error
        if (!data) {
          const err = new Error = "not found"
          err.status = 404
          throw err
        }

        if (data[0].remainingSpots === 0) return { "remainingSpots": 0 }

        const [result] = await supabase.from("sessions")
          .update({
            remainingSpots: data[0].remainingSpots - 1,
            registeredCount: data[0].registeredCount + 1
          })
          .eq("id", sessionId)
          .select()

        if (result.error) throw result.error

        return { "remainingSpots": result.data[0].remainingSpots }

      }
      catch (error) {
        console.error(error)
      }
    }
  }
}

// console.log(await sessionsRepo(supabase).getById("7aa2c434-e84d-494e-a911-bb3f18ed07a5"))
// console.log(await sessionsRepo(supabase).register("7aa2c434-e84d-494e-a911-bb3f18ed07a5"))