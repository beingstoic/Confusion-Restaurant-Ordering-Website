import React from 'react';
import Home from '../home/homeComponent';
import { DISHES } from '../../shared/dishes';
import { COMMENTS } from '../../shared/comments';
import { PROMOTIONS } from '../../shared/promotions';
import { LEADERS } from '../../shared/leaders';
import Menu from '../menu/menuComponent';
import Contact from '../contact/contactComponent'
import DishDetail from '../dishDetail/dishDetail';
import Header from '../header/header';
import Footer from '../footer/footer';
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      SelectedDish:null
    };
  }

  render(){
    const HomePage = () => {
      return (
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]} />
      );
    }
    return (
      <div >
          
          <BrowserRouter>
           <Header/>
            <Switch>
              <Route path = "/home" component={HomePage}/>
              <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes}/>}/>
              <Route path="/contactus" component={Contact}/>
              <Redirect to ="/home" />
            </Switch>
            <Footer />
          </BrowserRouter>
          
        </div>
    );
  }
}

export default Main;
