import React from 'react';
import Option from './Option';

const Options = props => {
  return (
    <div className="options">
      <div className="widget-header">
      <h3 className="widget-header__title">Your Options</h3>
        <button 
          onClick={props.handleRemoveOptions}
          className="button button--link">
            Remove all
        </button>
      </div>
      {
        props.options.length === 0 && 
        <p className="widget-message">Add an option to start.</p>
      }
      {
        props.options.map((option, index) => (
          <Option 
            key={option} 
            count={index + 1}
            optionText={option} 
            handleRemoveOption={props.handleRemoveOption}
            />)
        )
      }
    </div>
  );
};

export default Options;