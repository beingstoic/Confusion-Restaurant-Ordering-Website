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
import { actions } from 'react-redux-form';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, submitFeedback } from '../../redux/actionCreators'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  submitFeedback:(feedbackValues)=>
      dispatch(submitFeedback((feedbackValues))),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders:()=>dispatch(fetchLeaders())
});


class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  render() {

    const HomePage = () => {
      return(
        <Home 
        dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishErrMess={this.props.dishes.errMess}
        promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promoLoading={this.props.promotions.isLoading}
        promoErrMess={this.props.promotions.errMess}
        leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
        leaderLoading={this.props.leaders.isLoading}
        leaderErrMess={this.props.leaders.errMess}
    />
      );
    }


    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
      />
      );
    };

    const CallAbout=()=>{
      return(
        <About leaders={this.props.leaders.leaders}
        leaderLoading={this.props.leaders.isLoading}
        leaderErrMess={this.props.leaders.errMess} />
      )
    }

    const callContact=()=>{
      return <Contact
                resetFeedbackForm={this.props.resetFeedbackForm} 
                submitFeedback={this.props.submitFeedback} />
    }

    return (
      <div>
        <Header />
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch>
                <Route path="/home" component={HomePage} />
                { /* If "exact" is not set, "/menu/xy" will match */ }
                <Route exact path="/menu" component={ () => <Menu dishes={this.props.dishes} /> } />
                <Route path="/menu/:dishId" component={DishWithId} />
                <Route exact path='/contactus' component={callContact} />
                <Route exact path="/aboutus" component={CallAbout} />
                <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        <Footer />
      </div>
    );
  }

}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));