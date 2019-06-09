
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: 0
    }; 
  }

  componentDidMount() {
    const count = JSON.parse(localStorage.getItem('count'));
    this.setState({ count });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      const count = JSON.stringify(this.state.count);
      localStorage.setItem('count', count);
    }
  }

  handleAddOne() {
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      };
    });
  }
  handleMinusOne() {
    this.setState((prevState) => {
      return {
        count: prevState.count - 1
      };
    });   
  }
  handleReset() {
    this.setState(() => {
      return {
        count: 0
      };
    });   
  }
  render() {
    return (
      <div>
        <h1>Counter: {this.state.count}</h1>
        <button onClick={this.handleAddOne} className="btn btn-outline-success">+1</button>
        <button onClick={this.handleMinusOne} className="btn btn-outline-danger" style={{margin: '1em'}}>-1</button>
        <button onClick={this.handleReset} className="btn btn-outline-dark">reset</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter/>, document.getElementById('app'));








/* let counter = 0;

const addOne = () => {
  counter++;
  renderCounter();
};

const minusOne = () => {
  counter--;
  renderCounter();
};

const reset = () => {
  counter = 0;
  renderCounter();
};

const renderCounter = () => {
  const templateTwo = (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={addOne} className="btn btn-outline-success">+1</button>
      <button onClick={minusOne} className="btn btn-outline-danger" style={{margin: '1em'}}>-1</button>
      <button onClick={reset} className="btn btn-outline-dark">reset</button>

    </div>
  );

  // eslint-disable-next-line no-undef
  ReactDOM.render(templateTwo, appRoot);
};

const appRoot = document.getElementById('app');

renderCounter(); */
    
