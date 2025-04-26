const URL = 'https://api-contato-dot-api-samples-423102.uc.r.appspot.com/api/contatos'

export async function findAll() {
  console.log('Executando findAll()')

  const requestInfo = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer 12119355'
    },
  }
    
  const responseHttp = await fetch(URL, requestInfo)

  if(responseHttp.ok) {
    return await responseHttp.json()
  } else {
    console.log('Falha ao tentar buscar os contatos.')
    throw new Error('Falha ao tentar buscar os contatos.')
  }
  
}

export async function deleteById(id) {
  console.log(`Executando deleteById(${id})`)

  const requestInfo = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer 12119355'
    },
  }

  const responseHttp = await fetch(`${URL}/${id}`, requestInfo)

  if(responseHttp.ok) {
    return await responseHttp.json()
  } else {
    console.log('Falha ao tentar buscar os contatos.')
    throw new Error('Falha ao tentar buscar os contatos.')
  }
}

export async function insert(tipo, nome, telefone) {
  console.log(`Executando insert(${tipo}, ${nome}, ${telefone})`)

  const requestInfo = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer 12119355',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({tipo, nome, telefone })
  }

  const responseHttp = await fetch(URL, requestInfo)

  if(responseHttp.ok) {
    return await responseHttp.json()
  } else {
    console.log('Falha ao tentar buscar os contatos.')
    throw new Error('Falha ao tentar buscar os contatos.')
  }

  
}