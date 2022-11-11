import { createClient } from "@supabase/supabase-js"

const PROJECT_URL = "https://yeasgzgceihkjwymolcb.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllYXNnemdjZWloa2p3eW1vbGNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTI2NTksImV4cCI6MTk4Mzc2ODY1OX0.VWLlL3djc2u_MV4GFeP_6pRfhJ14oJM8mK61lSW-rlc"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video").select("*")
        }
    }
}