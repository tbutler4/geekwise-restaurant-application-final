import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../order.css'

export default class Order extends Component {
  constructor(props) {
    super(props);

    this.onChangeQty = this.onChangeQty.bind(this);
    this.onChangeItem = this.onChangeItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.onOrder = this.onOrder.bind(this);
    // this.onView = this.onView.bind(this);
    // this.onLogOut = this.onLogOut.bind(this);

    this.state = {
      item: '',
      qty: '',
      menu:['Lunch menu','flum luboom', 'Licorice', 'por perrian', 'chumfumfumchamfumchum']
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/items/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.email),
            email: response.data[0].email
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }


  onChangeQty(e) {
    this.setState({
      qty: e.target.value
    })
    console.log('here', this.state.qty)
  }
  onChangeItem(e) {
    this.setState({
      item: e.target.value
    })
    console.log('this', this.state.item)
  }
  onSubmit(e) {
    e.preventDefault();
    const order = {
      qty: this.state.qty,
      item: this.state.item
    }

    console.log(order);

    axios.post('http://localhost:5000/items/add', order)
      .then(res => console.log(res.data));

    this.setState({
      item: ''
    })

    this.setState({
      qty: ''
    })
    window.location = '/view';
  }

  // onOrder(e) {
  //   e.preventDefault();
  //   window.location = '/order';
  // }
  // onView(e) {
  //   e.preventDefault();
  //   window.location = '/view';
  // }
  // onLogOut(e) {
  //   // e.preventDefault();
  //   window.location = '/landing';
  // }
  render() {
    return (

      
      <div class="contain">
          <div id="brucecont">
            <div id="bruce">
              Bruce's Diner
            </div>
          </div>
            <div id="nav">
              <ul>
                <li id="left"><a style={{color: 'white'}} href="/order" onOrder={this.onOrder}>Order Form</a></li>
                <li id="mid"><a style={{color: 'white'}} href="/view" onView={this.onView}>View Orders</a></li>
                <li id="right"><a style={{color: 'white'}} href="/landing" onLogOut={this.onLogOut}>Log Out</a></li>
              </ul>
            </div>
            <div id="create"> 
              Id Like To order
            </div>
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
    );
  }
}