import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'grommet/components/Form';
import SearchInput from 'grommet/components/SearchInput';
import meetupSearch from '../../actions/meetupSearchActions';

class EventsSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { UserData, meetupSearch } = this.props;
    if (UserData) {
      meetupSearch(UserData.location);
    }
  }

  onInputChange(event) {
    this.setState({ input: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.meetupSearch(this.state.input);
  }

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        pad={{
          vertical: 'small',
          horizontal: 'small'
        }}
        plain={true}
      >
        <SearchInput
          className="meetup-searchbar"
          placeHolder="Enter Address"
          onDOMChange={this.onInputChange}
          value={this.state.input}
        />
      </Form>
    );
  }
}

function mapStateToProps(state) { // Used to pull user address if already provided
  return {
    UserData: state.LoggedIn.userData
  };
}

export default connect(mapStateToProps, { meetupSearch })(EventsSearchBar);
