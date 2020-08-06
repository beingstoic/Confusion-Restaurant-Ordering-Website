import React,{Component} from 'react';
import Home from '../home/homeComponent';
import { DISHES } from '../../shared/dishes';
import { COMMENTS } from '../../shared/comments'
import { PROMOTIONS } from '../../shared/promotions';
import { LEADERS } from '../../shared/leaders';
import Menu from '../menu/menuComponent';
import Contact from '../contact/contactComponent'
import DishDetail from '../dishDetail/dishDetail';
import Header from '../header/header';
import Footer from '../footer/footer';
import About from '../about/aboutComponent'
import {Switch, Route, Redirect} from 'react-router-dom'

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS
    };
  }

  render() {

    const HomePage = () => {
      return (
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]} />
      );
    }

    const DishWithId = ( {match} ) => {
      return (
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))} />
      );
    }

    const CallAbout=()=>{
      return(
        <About leaders= {this.state.leaders} />
      )
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          { /* If "exact" is not set, "/menu/xy" will match */ }
          <Route exact path="/menu" component={ () => <Menu dishes={this.state.dishes} /> } />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route exact path="/aboutus" component={CallAbout} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }

}

export default Main;