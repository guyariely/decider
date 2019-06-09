

console.log("App.js is running");

const app = {
  title: 'indecision app',
  subtitle: 'let a computer make the decision for you!',
  options: []
};

const onFormSubmit = (e) => {
  e.preventDefault();
  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
  }
  e.target.elements.option.value = '';
  renderTemplate();
};

const clearOptions = () => {
  app.options.length = 0;
  renderTemplate();
};

const chooseOption = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);  
  alert(app.options[randomNum]);
};

const renderTemplate = () => {

  const template = (
    <div>
      <h1>{app.title}</h1>  
      {app.subtitle && <h4>{app.subtitle}</h4>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <button disabled={app.options.length == 0} onClick={chooseOption} className="btn btn-primary">Choose option</button>
      <ol>
        {
          app.options.map((option) => <li key={option}>{option}</li>)
        }
      </ol>
      <button onClick={clearOptions} className="btn btn-danger" style={{margin: '1em 0'}}>Clear options</button>
  
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option"></input>
        <button className="btn btn-dark" style={{margin: '0 1em'}}>Add an option</button>
      </form>
    </div>
  );

  // eslint-disable-next-line no-undef
  ReactDOM.render(template, appRoot);
};


const appRoot = document.getElementById('app');

renderTemplate();


