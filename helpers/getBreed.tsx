const getBreeds = async (): Promise<any> => {
  const url: string = 'https://api.thedogapi.com/v1/images/search'
  const res: Response = await fetch(url)

  if (!res.ok) {
    const { url, status, statusText }: Response = res
    throw Error(`Error: ${status} ${statusText} in fetch ${url}`)
  }

  const breeds: any = await res.json()

  return breeds
}

export default getBreeds
