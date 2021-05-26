import rootUrl from '../rootUrl';

export default async function (route: string) {
  try {
    const res = await fetch(rootUrl + route)
    const data = await res.json()
    if (res.ok) {
      return data
    }
    return null
  } catch (err) {
    console.log(err)
  }
}