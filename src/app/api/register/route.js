import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import supabase from "@/db/supabase"

export async function POST(req) {
  // console.log(await req.json());
  // console.log(req.nextUrl.searchParams.get("event_name"))
  const { name, roll_no, email, mobile, queries } = await req.json()
  const event_name = req.nextUrl.searchParams.get("event_name")

  const { data, error } = await supabase.from(event_name).insert({
    name,
    roll_no,
    email,
    mobile,
    queries,
  })

  if (error) {
    console.log("Error inserting data in " + event_name + " table")
    console.log(error)
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    )
  }

  return NextResponse.json(
    {
      msg: "Data inserted successfully",
    },
    {
      status: 201,
    }
  )
}
