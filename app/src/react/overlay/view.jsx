let {div} = React.DOM;

const Overlay = React.createClass({

  render () {
    return (
      <div className="preview-overlay"></div>
    );
  }
});

module.exports = React.createFactory(Overlay)
