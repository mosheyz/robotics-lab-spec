import { supabase } from './sessions.js';


export const sessionsRepo = {
  findById: async (sessionId) => {
      const { data, error } = await supabase.from("sessions")
        .select()
        .eq("id", sessionId)

      if (error) throw error
      if (!data) {
        const err = new Error ("not found")
        err.status = 404
        throw err
      }

      return data
  },

  register: async (sessionId) => {
      const { data, error } = await supabase.from("sessions")
        .select()
        .eq("id", sessionId)

      if (error) throw error
      if (!data || data.length === 0) {
        const err = new Error ("not found")
        err.status = 404
        throw err
      }

    if (data[0].remainingSpots === 0) {
      const err = new Error (JSON.stringify({"error": "session is full", "remainingSpots": 0 }))
      err.status = 400
      throw err
    }

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
}