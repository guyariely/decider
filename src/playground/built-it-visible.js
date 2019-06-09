
class Visibility extends React.Component {
  constructor(props) {
    super(props);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.state = {
      isVisible: false
    };
  }
  toggleInfo() {
    this.setState((prevState) => {
      return {
        isVisible: !prevState.isVisible
      };
    });
  }
  render() {
    return (
      <div> 
        <h1>Visibility Toggle</h1>
        <button onClick={this.toggleInfo} className="btn btn-info" style={{margin: '2em 0'}}>
          {this.state.isVisible ? 'Hide Info' : 'Show Info'}
        </button>
        {this.state.isVisible && <h4>Some irrelevant information</h4>}
      </div>
     
    );
  }
}

ReactDOM.render(<Visibility />, document.getElementById('app'));

/* const appRoot = document.getElementById('app');

let isVisible = false;
const toggleInfo = () => {
  isVisible = !isVisible;
  renderTemplate();
};

const renderTemplate = () => {
  const template = (
    <div>
      <h1>Visibility Toggle</h1>
      <button onClick={toggleInfo} className="btn btn-info" style={{margin: '2em 0'}}>
        {isVisible ? 'Hide info' : 'Show info'}
      </button>
      {isVisible && <p>Irrelevant information</p>}
    </div>
  );

  // eslint-disable-next-line no-undef
  ReactDOM.render(template, appRoot);
}; */

renderTemplate();


