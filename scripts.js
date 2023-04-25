/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET pela Rota /obras.
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/obras';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.obras.forEach(item => insertList(item.nome, item.artista, item.estilo, item.tipo, item.link))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST na rota /obra.
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputNome, inputArtista, inputEstilo, inputTipo, inputLink) => {
  const formData = new FormData();
  formData.append('nome', inputNome);
  formData.append('artista', inputArtista);
  formData.append('estilo', inputEstilo);
  formData.append('tipo', inputTipo);
  formData.append('link', inputLink);

  let url = 'http://127.0.0.1:5000/obra';
  
  fetch(url, {
    method: 'post',
    body: formData
  })
 
  .then(response => {
      if (response.ok) {
        insertList(inputNome, inputArtista, inputEstilo, inputTipo, inputLink);
        alert("Obra inserida com sucesso!");
      }
      else {
        alert("Erro: Obra de mesmo nome já salva na base para este artista!");
      }
  })
  
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/

function insertButton(parent) {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------

*/

function removeElement() {
  let close = document.getElementsByClassName("close");
  var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const obraItem = div.getElementsByTagName('td')[0].innerHTML;
      const artistaItem = div.getElementsByTagName('td')[1].innerHTML;
  
      /* Construção do cenário para envio do comando de deleção do registro 
         de obra e artista, pela função "deleteItem" */
      const nomeItem = 'nome=' + obraItem + '&' + 'artista=' + artistaItem
  
      if (confirm("Você tem certeza?")) {
        div.remove();
        deleteItem(nomeItem);
        alert("Removido!");
      }
    };
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE na Rota /obra
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/obra?' + item; 
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com obra, artista, estilo tipo e link 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputNome = document.getElementById("newNome").value;
  let inputArtista = document.getElementById("newArtista").value;
  let inputEstilo = document.getElementById("newEstilo").value;
  let inputTipo = document.getElementById("newTipo").value;
  let inputLink = document.getElementById("newLink").value;

  /* Verifica se há algum campo vazio */
  if (inputNome === '' || inputArtista === ''|| inputEstilo === '' || inputTipo === '') {
    alert("A exceção do campo Link que é opcional, todos os demais campos devem estar preenchidos!");
  } 
  /* Não havendo campos vazios, segue para o post na tabela obra */
  else {
    postItem(inputNome, inputArtista, inputEstilo, inputTipo, inputLink)
    
  }  
}



/*
  --------------------------------------------------------------------------------------
  Função para inserir itens na lista apresentada
  --------------------------------------------------------------------------------------
*/
function insertList(nome, artista, estilo, tipo, link) {
  var item = [nome, artista, estilo, tipo, link];
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1));
  document.getElementById("newNome").value = "";
  document.getElementById("newArtista").value = "";
  document.getElementById("newEstilo").value = "";
  document.getElementById("newTipo").value = "";
  document.getElementById("newLink").value = "";

  removeElement();
}