import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinning from 'grommet/components/icons/Spinning';
import Select from 'grommet/components/Select';
import Form from 'grommet/components/Form';
import Chart from './top20Chart';
import top20Search from '../../actions/top20SearchActions';
import { categories, cycles } from '../../constants/top20SelectorOptions';


class Top20Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {
        value: 'contribution-total',
        label: 'Total Raised'
      },
      catKey: 'total_contributions',
      cycle: {
        value: '2016',
        label: '2016'
      }
    };
    this.catHandleChange = this.catHandleChange.bind(this);
    this.cycleHandleChange = this.cycleHandleChange.bind(this);
  }

  componentDidMount() {
    this.props.top20Search(this.state.category, this.state.cycle);
  }

  componentDidUpdate(nextProps, nextState) {
    if (JSON.stringify(this.state) === JSON.stringify(nextState)) { return; }
    this.props.top20Search(this.state.category, this.state.cycle);
  }

  catHandleChange(event) {
    const key = categories.find(el => el[0] === event.option.value);
    this.setState({ category: event.option, catKey: key[1] });
  }

  cycleHandleChange(event) {
    this.setState({ cycle: event.option });
  }

  render() {
    const { data } = this.props;

    const catOptions = categories.map((category) => {
      const value = category[0];
      const label = category[3];
      return { value, label };
    });

    const cycleOptions = cycles.map((cycle) => {
      const value = cycle;
      const label = cycle;
      return { value, label };
    });

    if (data && data.results) {
      return (
        <div className="top20-console">
          <Form className="row" >
            <Select
              value={this.state.category}
              onChange={this.catHandleChange}
              options={catOptions}
              placeHolder="Select Category"
              className="top20-category-selector"
            />
            <Select
              value={this.state.cycle}
              onChange={this.cycleHandleChange}
              options={cycleOptions}
              placeHolder="Election Cycle"
              className="top20-cycle-selector"
            />
          </Form>
          <Chart
            data={data.results}
            metric={this.state.catKey}
          />
        </div>
      );
    }

    return (
      <div>
        <Spinning />
        <span>Loading</span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.Propublica.Top20
  };
}

export default connect(mapStateToProps, { top20Search })(Top20Console);
