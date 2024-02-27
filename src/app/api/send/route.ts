import { google } from "googleapis";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const formData = await req.json();

    try {
      const jwt = new google.auth.JWT(
        process.env.GOOGLE_CLIENT_EMAIL,
        undefined,
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDxUNtIiJ48qzyR\nZuK3k83wzrhuU8ABjWs6Nr1LDiAB0hrTEVF+3fh882WDmXwxR3k22SdyBJm6yboY\ndeVzpEAt/gWCLh4lHcqrC64GP7ucF8Z4WcAYe2timBjhEph4SiJSxqjI9gR5xuzx\nugnNaug+M9G8/TKXHvcHAUgRvSBawXo2+7z+P6Hqvbshojj0NaurdI31lNyaTXIz\nUFa1A+lEzpDS84J0wtYtkkpZkaaR5XFGuzmOM/ddJnxbmN2iBT8oIux1e57hxl5M\nsDUYlW6FXGyEx/Y9M4EdeuZV3sCvQO4HA1xT7ySt933Z7GKa1lq3263KSDa0v8pl\nAeIc0OCjAgMBAAECggEAGo43U2gVYb/GTonv8RvG0fUtvpZgzsrtPd7APf4z739b\njFafjUKIEdgHF9BQJmwjHrIO8TEoabHBVOfEdFFi7qzBlm3Uy2jX4LLMV8uzrZ3A\nLYZS6V7LlnH+auZM+Q/PbySFdnf8ThpiAMfkREK7g/zX2+BRLOgvbwnpEGqroNDr\nFhNvNO/rsOpiH5Hg1zH68WJSQOmv1c1LemrADDOYaCZE8BfLFM44SAqDd1fZLzK/\ntl6cTpboeX+v2sgyLv1KxKcQXFaHRD4NInP0kAKNBXJmFT8Y1ERa5bBaNicm04Ua\npA6w5xSNIj3kwMDDkIN9v7WCk7dkUcHEipTqbhVrAQKBgQD+ax+uXUyj8idVwfww\naUPZsRubZHaY1x0PNpHhx0ilxeYWt+KwuZaTcl7FQtoLkcWbbVJC6x7EGG7eaUTe\niNNWKWL0ZGtgjrDnq0kaiQVbjb3R4PiEZtP8E6Q1n3tBveX2ws5oJs3hGlPHJg6x\nj2RMilpNFL7h9VzSgGSMuTaYQwKBgQDy0OGw57Bg58JyFT+BVZmSP7vISEgft101\na448dKFmk0JQtD3//0egE9fQjyUzGdN8W8/zL9GBoUk/Azj8JUhIDnH7ozS/bt3B\nlLozRHvgIvIbt6V8OZQ52wKRPqV8AhyzEnbxamqFW9+q0ugv7zlSpKhXuHLBCrT0\nVLtBsEfAIQKBgFHEjhcVJ1edsSSvxuSsQEFL2aqUnEU9Bbro9/PPf7q/otZ0XSgd\nTZav8GOHu9pyDEeK2CBnvqiZjbBvttGqufl8LbCMQbJzycl7VHBxz0YAhRxaKKUt\nAz6F9YXCbvPPG4S2UW5J4mtRcdGUmq5YfozW/nS9kSfAGwgQecB8ml5PAoGBAL5Q\n2ESXJFif7nkKjG7rz+WgTKerd9RcHRNszNw3sfW7ACRPUbUful0OkH4oZEjMOkXj\nlHcQiM5owwc/mF+RPTk1EUPhZMuSsv8yeksKp2lDGq5835khbDt4nGeJSZ2L7kCw\n/Uc1WG5UV1gF3PUNNMnAwy2WJWOG59QFwYu4BlThAoGAGQzr8ZCpb+Y533GbqDU3\nlF1wqrNHjTs3CIpPU3EWoJfmN1zCz3Ea/nV3JB51Y4B9WZRIsPyjzPG/4TFf0YUp\nn+6+WQc3IaJxk/nIen8tCU7iWnKIki9S7NRbdN83KR7Ow03mp1Tcesrt1R2rwFqK\nCuguI4UUkHQzeqIKkK1s8ro=\n-----END PRIVATE KEY-----\n",
        ["https://www.googleapis.com/auth/spreadsheets"]
      );

      const gsapi = google.sheets({ version: "v4", auth: jwt });
      
      const data = await gsapi.spreadsheets.values.append({
        spreadsheetId: `${process.env.GOOGLE_SHEET_ID}`,
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
      return NextResponse.json({ data: data.data, apiKey: process.env.GOOGLE_PRIVATE_KEY });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
