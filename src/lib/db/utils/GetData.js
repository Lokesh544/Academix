export default async function GetData(req) {
  req.data = await req.json();
}
