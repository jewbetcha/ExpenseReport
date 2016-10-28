import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import { saveExpense } from '../actions/expense';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', type: '', amount: '' };
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(saveExpense(this.state.name, this.state.type, this.state.amount));
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="container">
        <Messages messages={this.props.messages}/>
        <div className="row">
          <div className="col-sm">
            <h3>Make an Expense entry</h3>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.handleChange.bind(this)} autoFocus/>
              <label htmlFor="">Type</label>
              <select value={this.state.type} onChange={this.handleChange.bind(this)}>
                <option value="A">Apple</option>
                <option value="B">Banana</option>
                <option value="C">Cranberry</option>
              </select>
              <label htmlFor="amount">Amount</label>
              <input type="amount" name="amount" id="amount" placeholder="amount" value={this.state.amount} onChange={this.handleChange.bind(this)}/>
              <button type="submit">Save Expense</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Home);
