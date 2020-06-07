import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  constructor() {
    super()
    this.state = {
      pizzas: [],
      pizzaId: 0,
      newTopping: "",
      size: "",
      vegetarian: false
    }
  }

  componentDidMount () {
    fetch('http://localhost:3000/pizzas')
    .then(resp => resp.json())
    .then(pizzas => {
      
      this.setState({
        pizzas: pizzas
      })
    })
  }

  onEditClick = (id) => {
    const thePizza = this.state.pizzas.filter(pie => pie.id === id)
    this.setState({
      pizzaId: id,
      newTopping: thePizza[0].topping,
      size: thePizza[0].size,
      vegetarian: thePizza[0].vegetarian,
      needUpdate: false
    })
  }

  onChangeTopping = (event) => {
    if (event.target.value !== ""){
    this.setState({
      newTopping: event.target.value
    })
  }
  }

  onSubmit = (event) => {
    event.preventDefault()
    let pList = this.state.pizzas.map(pizza => {
      if (pizza.id === this.state.pizzaId){
        return {...pizza, topping: this.state.newTopping, size: this.state.size, vegetarian: this.state.vegetarian}
      } else {
        return pizza
      }
    })
    this.setState({
      pizzas: pList
    })
  }

  selectSize = (event) => {
    this.setState({
      size: event.target.value
    })
  }

  selectVeg = (event) => {
    const vegNotVeg = event.target.value === "Vegetarian" ? true : false
    this.setState({
      vegetarian: vegNotVeg
    })
  }
  render() {
    
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
        onChangeTopping={this.onChangeTopping} 
        onSubmit={this.onSubmit}
        selectSize={this.selectSize}
        selectVeg={this.selectVeg}
        topping={this.state.newTopping}
        size={this.state.size}
        vegetarian={this.state.vegetarian}/>
        <PizzaList pizzas={this.state.pizzas} onEditClick={this.onEditClick}/>
      </Fragment>
    );
  }
}

export default App;
