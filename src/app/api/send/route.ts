import { google } from "googleapis";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'; 

export async function POST(req: Request) {
  if (req.method === "POST") {
    const formData = await req.json();

    try {
      const jwt = new google.auth.JWT(
        process.env.GOOGLE_CLIENT_EMAIL,
        undefined,
        process.env.GOOGLE_PRIVATE_KEY!,
        ["https://www.googleapis.com/auth/spreadsheets"]
      );

      const response = jwt.authorize(async function (err) {
        if (err) {
          return NextResponse.json({ error: err.message }, { status: 500 });
        }

        const gsapi = google.sheets({ version: "v4", auth: jwt });
        console.log(formData)
        const data = await gsapi.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: "Sheet1!A1:D1",
          insertDataOption: "INSERT_ROWS",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            majorDimension: "ROWS",
            range: "Sheet1!A1:D1",
            values: [
              [
                formData.name,
                formData.email,
                formData.response,
                formData.linkedIn,
              ],
            ],
          },
        });
        throw new Error(data.statusText, formData)
        console.log(data, formData)
        return NextResponse.json({ data: data, formInfo: formData });
      });

      return NextResponse.json({ data: response });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
