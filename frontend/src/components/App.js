import React, { Component } from "react";
import { render } from "react-dom";
import "@babel/polyfill";
import axios from 'axios';
import qs from 'qs';
import ReactPaginate from 'react-paginate';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      placeholder: "Cargando...",
      "pageCount": 100,
      "page": 1,
      "pagesize": 15,
      "fromdate": "",
      "todate": "",
      "min": "",
      "max": "",
      "order": "",
      "sort": "",
      "q": "",
      "accepted": "",
      "answers": "",
      "body": "",
      "closed": "",
      "migrated": "",
      "notice": "",
      "nottagged": "",
      "tagged": "",
      "title": "",
      "user": "",
      "url": "",
      "views": "",
      "wiki": "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [`${name}`] : event.target.value});
  }

  
async handleSubmit(event) {
  event.preventDefault();
  await axios({
    method: 'POST',
    url: "api/stack",
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
    "page": this.state.page,
    "pagesize": this.state.pagesize,
    "fromdate": this.state.fromdate,
    "todate": this.state.todate,
    "min": this.state.min,
    "max": this.state.max,
    "order": this.state.order,
    "sort": this.state.sort,
    "q": this.state.q,
    "accepted": this.state.accepted,
    "answers": this.state.answers,
    "body": this.state.body,
    "closed": this.state.closed,
    "migrated": this.state.migrated,
    "notice": this.state.notice,
    "nottagged": this.state.nottagged,
    "tagged": this.state.tagged,
    "title": this.state.title,
    "user": this.state.user,
    "url": this.state.url,
    "views": this.state.views,
    "wiki": this.state.wiki,
    "pageno": this.state.pageno
    })
  }).then(response => {
    if (response.status > 400 || response.data.success === false) {
      alert("Something went wrong!");
      return 0;
    }
    console.log(response.data);
    this.setState({data: response.data.items});
  });
}
  
  render() {
    return (
      <div>
        <form method="POST" onSubmit={this.handleSubmit} style={{float:'left', padding: '5%'}}> 
          <label>Página</label><br/>
          <input type="number" name="page" value={this.state.page} onChange={this.handleChange}/><br/>

          <label>Nº de páginas</label><br/>
          <input type="number" name="pagesize" value={this.state.pagesize} onChange={this.handleChange}/><br/>

          <label>Fecha desde</label><br/>
          <input type="date" name="fromdate" value={this.state.fromdate} onChange={this.handleChange}/><br/>
          
          <label>Fecha hasta</label><br/>
          <input type="date" name="todate" value={this.state.todate} onChange={this.handleChange}/><br/>
          
          <label>Ordenar</label><br/>
          <select name="order" value={this.state.order} onChange={this.handleChange}>
            <option value="desc">Descendente</option>
            <option value="asc">Ascendente</option>
          </select><br/>
          
          <label>Mínimo</label><br/>
          <input type="date" name="min" value={this.state.min} onChange={this.handleChange}/><br/>
          
          <label>Máximo</label><br/>
          <input type="date" name="max" value={this.state.max} onChange={this.handleChange}/><br/>
          
          <label>Clasificar por</label><br/>
          <select name="sort" value={this.state.sort} onChange={this.handleChange}>
            <option value="activity">Actividad</option>
            <option value="votes">Votos</option>
            <option value="creation">Creación</option>
            <option value="relevance">Relevancia</option>
          </select><br/>

          <label>q</label><br/>
          <input type="text" name="q" value={this.state.q} onChange={this.handleChange}/><br/>

          <label>Aceptado</label><br/>
          <select name="accepted" value={this.state.accepted} onChange={this.handleChange}>
            <option value="True">Si</option>
            <option value="False">No</option>
          </select><br/>
          
          <label>Respuestas</label><br/>
          <input type="number" name="answers" value={this.state.answers} onChange={this.handleChange}/><br/>

          <label>Cuerpo</label><br/>
          <input type="text" name="body" value={this.state.body} onChange={this.handleChange}/><br/>

          <label>Cerrado</label><br/>
          <select name="closed" value={this.state.closed} onChange={this.handleChange}>
            <option value="True">Sí</option>
            <option value="False">No</option>
          </select><br/>

          <label>migrated</label><br/>
          <select name="migrated" value={this.state.migrated} onChange={this.handleChange}>
            <option value="True">True</option>
            <option value="False">False</option>
          </select><br/>

          <label>notice</label><br/>
          <select name="notice" value={this.state.notice} onChange={this.handleChange}>
            <option value="True">True</option>
            <option value="False">False</option>
          </select><br/>

          <label>nottagged</label><br/>
          <input type="text" name="nottagged" value={this.state.nottagged} onChange={this.handleChange}/><br/>          
          
          <label>tagged</label><br/>
          <input type="text" name="tagged" value={this.state.tagged} onChange={this.handleChange}/><br/>
          
          <label>title</label><br/>
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/><br/>
          
          <label>user</label><br/>
          <input type="number" name="user" value={this.state.user} onChange={this.handleChange}/><br/>

          <label>url</label><br/>
          <input type="text" name="url" value={this.state.url} onChange={this.handleChange}/><br/>

          <label>views</label><br/>
          <input type="number" name="views" value={this.state.views} onChange={this.handleChange}/><br/>

          <label>wiki</label><br/>
          <select name="wiki" value={this.state.wiki} onChange={this.handleChange}>
            <option value="True">True</option>
            <option value="False">False</option>
          </select><br/>

          <input type="submit" value="Submit"/>
        </form>

        <table style={{padding: '5%'}}>
          <thead>
            <tr>
              <th>Resultados de la busqueda</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((items, index) => (
              <tr key={index}>
                <td>{index + 1}.  <a href={items.link} target="_blank">{items.title}</a></td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />*/}
        </div> 
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);