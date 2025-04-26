import {useState, useRef, useEffect} from 'react'
import {findAll, deleteById, insert} from './ContatosApi'

export function ContatosView() {
  const [contatos, setContatos] = useState([])

  const inputTipo = useRef()
  const inputNome = useRef()
  const inputTelefone = useRef()

  useEffect(() => {
    consultar()

    inputTipo.current.focus()
  }, [])
  
   
  const consultar = async () => {
    console.log('Consultando contatos...')
    const dados = await findAll()
    setContatos(dados)
  }

  

  const salvar = async () => {
    console.log('Salvando contato...', inputTipo.current.value, inputNome.current.value, inputTelefone.current.value)

    await insert(
      inputTipo.current.value, 
      inputNome.current.value, 
      inputTelefone.current.value
    )

    alert('Contato salvo com sucesso!')
    await consultar()

    inputTipo.current.value = '-'
    inputNome.current.value = ''
    inputTelefone.current.value = ''
  }

  const excluir = async (id) => {
    await deleteById(id)
    alert('Contato excluído com sucesso!')

    await consultar()
  }
  
  return (
    <main onKeyDown={(event) => {
      if(event.key === 'Enter')
      salvar()
    }} >
      <h1>Listagem de contatos</h1>

      <label>Tipo</label>
      <select ref={inputTipo}>
        <option>-</option>
        <option>Filho(a)</option>
        <option>Amigo(a)</option>
        <option>Neto(a)</option>
      </select>

      <label>Nome</label>
      <input type='text' ref={inputNome}/>

      <label>Telefone</label>
      <input type='tel' ref={inputTelefone}/>

      <button onClick={salvar}>SALVAR</button>
      <button onClick={consultar}>CONSULTAR</button>

      <table>
        <tr>
          <th></th>
          <th>TIPO</th>
          <th>NOME</th>
          <th>TEL</th>
          <th></th>
        </tr>

        {
          contatos.map(c => 
            <tr>
              <td>
                <img src={c.urlFoto} alt='foto'/>
              </td>
              <td>{c.tipo}</td>
              <td>{c.nome}</td>
              <td>{c.telefone}</td>
              <td>
                <button onClick={() => excluir(c.id)}>Excluir</button>
              </td>
            </tr> 
          )
        }
        
      </table>
    </main>
  )
}
