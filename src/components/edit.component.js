import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.onChangeQty = this.onChangeQty.bind(this);
    this.onChangeItem = this.onChangeItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
        item: '',
        qty: '',
        menu:['Lunch menu','flum luboom', 'por perrian', 'chumfumfumchamfumchum']
      }

  }

  componentDidMount() {
    axios.get('http://localhost:5000/items/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          item: response.data.item,
          qty: response.data.qty
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeQty(e) {
    this.setState({
      qty: e.target.value
    })
  }

  onChangeItem(e) {
    this.setState({
      item: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const orders = {
      item: this.state.item,
      qty: this.state.qty
    }

    console.log(orders);

    axios.post('http://localhost:5000/items/update/' + this.props.match.params.id, orders)
      .then(res => console.log(res.data));

    window.location = '/view';
  }

  render() {
    return (
    <div>
      <h3>Edit Order Log</h3>
         <form onSubmit={this.onSubmit}>
          <div className="form-group"> 


            <select ref="ItemInput"
              required
              className="form-control"
              value={this.state.menu}
              onChange={this.onChangeItem}>
              {
                this.state.menu.map(function(menu) {
                  return <option
                    key={menu}
                    value={menu}>{menu}
                    </option>;
                })
              }
          </select>
            <br></br>
            Qty
            <select onChange={this.onChangeQty}>
              <option value="0">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Create Order It!" className="btn btn-primary" />
          </div>
        </form>
    </div>
    )
  }
}