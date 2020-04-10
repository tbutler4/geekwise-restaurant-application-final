import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Orders = props => (
  <tr>
    <div class='float'>
    <td id='tdItem'>{props.orders.item}<br></br><p style={{fontSize: 10}}>Ordered by: Unknown!</p></td>
    <td id='tdTime'>Order placed at {props.orders.createdAt.substring(11,19)}</td>
    <td id='tdQty'>Quantity: {props.orders.qty}</td>
    <td>
      <Link id='edit' to={"/edit/"+props.orders._id}>edit</Link>  <a id='delete' href="#" onClick={() => { props.deleteOrders(props.orders._id) }}>delete</a>
    </td>
    </div>
  </tr>
)


export default class Order extends Component {
  constructor(props) {
    super(props);

    this.deleteOrders = this.deleteOrders.bind(this)

    this.state = {
      orders: []
    }
  }

  deleteOrders(id) {
    axios.delete('http://localhost:5000/items/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      orders: this.state.orders.filter(el => el._id !== id)
    })
  }

    componentDidMount() {
      axios.get('http://localhost:5000/items/')
        .then(response => {
          console.log('databse is returning', response.data)
          if (response.data.length > 0) {
            this.setState({
              orders: response.data,
            })
          }

        })
        .catch((error) => {
          console.log(error)
        })
  
    }
    orderList(){
        return this.state.orders.map(currentOrders => {
          return <Orders orders={currentOrders} deleteOrders={this.deleteOrders} keys=
          {currentOrders._id}/>;
        })
    }

  render() {
    return (
      <div class="contain">
          <div id="brucecont">
            <div id="bruce">
              Bruce's Diner
            </div>
          </div>
            <div id="nav" style={{color: 'white'}}>
              <ul>
              <li id="left"><a style={{color: 'white'}} href="/order">Order Form</a></li>
                <li id="mid"><a style={{color: 'white'}} href="/view">View Orders</a></li>
                <li id="right"><a style={{color: 'white'}} href="/landing">Log Out</a></li>
              </ul>
            </div>
            <div id='vieworders'>
              {this.orderList()}
            </div>
      </div>
    );
  }
}