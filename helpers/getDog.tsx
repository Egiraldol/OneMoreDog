const getDog = async (id: any, doBreed: boolean): Promise<any> => {
  let url
  console.log('doBreed', doBreed, id)
  if (doBreed) {
    console.log('entró :3')
    url = 'https://api.thedogapi.com/v1/images/search?breed_ids=' + id
  } else {
    console.log('id', id)
    url = id == null ? 'https://api.thedogapi.com/v1/images/search' : `https://api.thedogapi.com/v1/images/${id}`
  }
  const res: Response = await fetch(url)
  if (!res.ok) {
    const { url, status, statusText }: Response = res
    throw Error(`Error: ${status} ${statusText} in fetch ${url}`)
  }

  const breeds: any = await res.json()
  console.log('esto es breeds:', breeds, 'url:', url)
  return breeds
}

export default getDog
