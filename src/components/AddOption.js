import React from 'react';

export default class AddOption extends React.Component {
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
      <div>
        {this.state.error && <p className="add-option-error">{this.state.error}</p>}
        <form className="add-option" onSubmit={this.addOption}>
          <input className="add-option__input" type="text" name="option" />
          <button className="button button--add">
            Add option
          </button>
        </form>
      </div>
    );
  }
}