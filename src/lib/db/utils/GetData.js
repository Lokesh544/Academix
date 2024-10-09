/**
 *
 * @output Will add the data object to the req object as Output
 *
 * @param {Request} req
 */
export default async function getData(req) {
  req.data = await req.json();
}
