import React from 'react';
import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';

export default class DeciderApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveOptions = this.handleRemoveOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
    this.exitModal = this.exitModal.bind(this);
    this.state = {
      options: [],
      selectedOption: undefined
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
    this.setState(() => {
      return {
        selectedOption: this.state.options[randomNum]
      };
    });
  }

  exitModal() {
    this.setState(() => ({selectedOption: undefined}));
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
        <Header subtitle={subtitle} />
        <div className="container">
          <Action 
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options 
              options={this.state.options} 
              handleRemoveOptions={this.handleRemoveOptions}
              handleRemoveOption={this.handleRemoveOption}
            />
            <AddOption 
              handleAddOption={this.handleAddOption}
            />
          </div>
          
        </div>
        
        <OptionModal 
          selectedOption={this.state.selectedOption}
          exitModal={this.exitModal}
        />
      </div>
    );
  }
}

