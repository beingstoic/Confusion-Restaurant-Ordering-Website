import React,{Component} from 'react';
import Home from '../home/homeComponent';
import Menu from '../menu/menuComponent';
import Contact from '../contact/contactComponent'
import DishDetail from '../dishDetail/dishDetail';
import Header from '../header/header';
import Footer from '../footer/footer';
import About from '../about/aboutComponent'
import {Switch, Route, Redirect,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {addComment} from '../../redux/actionCreators'

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))

});

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {

    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]} />
      );
    }

    const DishWithId = ( {match} ) => {
      return (
        <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    addComment={this.props.addComment} />
      );
    }

    const CallAbout=()=>{
      return(
        <About leaders= {this.props.leaders} />
      )
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          { /* If "exact" is not set, "/menu/xy" will match */ }
          <Route exact path="/menu" component={ () => <Menu dishes={this.props.dishes} /> } />
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps())(Main));