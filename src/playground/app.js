
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveOptions = this.handleRemoveOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
    this.state = {
      options: []
    };
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      console.log("an error has occured with parsing the JSON options object");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const options = JSON.stringify(this.state.options);
      localStorage.setItem('options', options);
    }
  }

  handleRemoveOptions() {
    this.setState(() => ({ options: [] }));
  }

  handleRemoveOption(option) {
    this.setState((prevState) => ({options: prevState.options.filter((item) => item != option)}));
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);  
    alert(this.state.options[randomNum]);
  }

  handleAddOption(option) {
    if (!option) {
      return 'Invalid option';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }
    this.setState((prevState) => ({ options: prevState.options.concat(option) }));
  }

  render() {
    const subtitle = 'let a computer make the decision for you!';

    return (
      <div>
        <Header subtitle={subtitle}/>
        <Action 
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options 
          options={this.state.options} 
          handleRemoveOptions={this.handleRemoveOptions}
          handleRemoveOption={this.handleRemoveOption}
          />
        <AddOption 
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h4>{props.subtitle}</h4>}
    </div>
  );
};

Header.defaultProps = {
  title: 'Indecision App'
};


const Action = props => {
  return (
    <div style={{margin: '3em 0'}}>
      <button onClick={props.handlePick} disabled={!props.hasOptions} className="btn btn-outline-primary">
        What should I do?
      </button>
    </div>
  );
};

const Options = props => {
  return (
    <div style={{margin: '3em 0'}}>
    {props.options.length === 0 ? <h5>Add an option to start.</h5> : <h5>Here are your options:</h5>}
      {
        props.options.map((option) => (
          <Option 
            key={option} 
            optionText={option} 
            handleRemoveOption={props.handleRemoveOption}
            />)
        )
      }
      {props.options.length > 0 &&
      <button 
        onClick={props.handleRemoveOptions} 
        className="btn btn-outline-danger" 
        style={{marginTop: '1em'}}
        >
          Remove all
      </button>}
    </div>
  );
};

const Option = props => {
    return (
      <div>
        <p>{props.optionText}</p>
        <button 
          onClick={() => {
            props.handleRemoveOption(props.optionText);
          }} 
          className="btn btn-dark">
            Remove
        </button>
      </div>
    );
};

class AddOption extends React.Component {
  constructor(props) {
     super(props);
     this.addOption = this.addOption.bind(this);
     this.state = {
      error: undefined
     };
  }
  addOption(e) {
    e.preventDefault();

    let option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    this.setState(() => ({ error }));

    e.target.elements.option.value = '';
  }

  render() {
    return (
      <div style={{margin: '3em 0'}}>
        {this.state.error && <p style={{color: 'red'}}>{this.state.error}</p>}
        <form onSubmit={this.addOption}>
          <input type="text" name="option" className="form-control"></input>
          <button className="btn btn-outline-success" style={{margin: '1em 0'}}>
            click to add an option
          </button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

