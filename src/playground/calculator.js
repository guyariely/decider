
/* 
TODO: 
- replace current mechanism with that of the iphone's calculator
- define state for
    result
    operator
    place holder

FIXME: 
- operators at the beggining / end
- monitor overflow
*/    

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.addValue = this.addValue.bind(this);
    this.DEL = this.DEL.bind(this);
    this.AC = this.AC.bind(this);
    this.solve = this.solve.bind(this);

    this.state = {
      display: 0,
      result: '',
      operator: '',
      placeHolder: ''
    };
  }

  addValue(e) {
    const value = e.target.innerHTML;
    if (['÷', '×', '-', '+'].indexOf(value) > -1) {
      this.setState(() => {
        return {
          operator: value
        };
      });
    } else if (this.state.result == '' || this.state.operator == '') {
        this.setState((prevState) => {
          return {
            result: prevState.result += value,
            display: this.state.result
          };
        });
    } else {
      this.setState((prevState) => {
        return {
          placeHolder: prevState.placeHolder += value,
          display: this.state.placeHolder
        };
      });
    }
  }

  solve() {
    let result;
    switch(this.state.operator) {
      case '×':
        result = parseInt(this.state.result) * parseInt(this.state.placeHolder);
        break;
      case '÷':
        result = parseInt(this.state.result) / parseInt(this.state.placeHolder);
        break;
      case '+':
        result = parseInt(this.state.result) + parseInt(this.state.placeHolder);
        break;
      case '-': 
        result = parseInt(this.state.result) - parseInt(this.state.placeHolder);
        break;
    }
    
    this.setState(() => {
      return {
        result: result,
        display: result
      };
    });
  }

  DEL() {
    let expression = this.state.expression;
    expression = expression.split('');
    expression.pop();
    expression = expression.join('');

    this.setState(() => {
      return { expression };
    });
  }

  AC() {
    this.setState(() => {
      return { 
        expression: ["0"]
      };
    });
  }

  render() {
    return (
      <div>
        <Monitor display={this.state.display}/>
        <Operators addValue={this.addValue} DEL={this.DEL} AC={this.AC}/>
        <Numbers addValue={this.addValue} solve={this.solve}/>
      </div>
    );
  }
}

const Monitor = props => {
  return (
    <div style={{backgroundColor: 'black', padding: '1em', width: '100%', overflow: 'hidden'}}>
      <h1 style={{color: 'white'}}>
        {props.display}
      </h1>
    </div>
  );
};

class Operators extends React.Component {
  render() {
    const operators = ['÷', '×', '-', '+'];

    return (
      <div>
        <div className="container-fluid" style={{textAlign: 'center', fontWeight: 'bolder'}}>
          <div className="row">
            {operators.map((operator) => <Button onClick={this.props.addValue} color="warning" col={4} buttonText={operator} key={operator}/>)}
            <Button onClick={this.props.DEL} color="light" col={4} buttonText="DEL" key="DEL"/>
            <Button onClick={this.props.AC} color="light" col={4} buttonText="AC" key="AC"/>
          </div>
        </div>
      </div>
    );
  }
}

class Numbers extends React.Component {  

  render() {
    const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

    return (
      <div>
        <div className="container-fluid" style={{textAlign: 'center', fontWeight: 'bolder'}}>
          <div className="row">
            {nums.map((num) => <Button onClick={this.props.addValue} color="secondary" col={num == 0 ? 8 : 4} buttonText={num} key={num}/>)}
            <Button onClick={this.props.solve} color="secondary" col={4} buttonText="=" key="="/>
          </div>
        </div>
      </div>
    );
  }
}

const Button = props => {
  return (
    <div className={"col-" + props.col.toString()}>
      <button onClick={props.onClick} className={`btn btn-${props.color} btn-lg btn-block`}>
        {props.buttonText}
      </button>
    </div>
  );
};


ReactDOM.render(<Calculator />, document.getElementById('app'));

