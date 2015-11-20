let {div, span, a} = React.DOM;

const Menu = React.createClass({
  getInitialState() {
    return {
      direct: 0
    };
  },

  handleClick (direct, e) {
    this.props.direct = this.props.direct ? this.props.direct : 0;
    if (direct === "left" && this.props.direct !== 0) {
      this.props.initDirect(this.props.direct - 1);
    } else if (direct === "right" && this.props.direct !== 3) {
      this.props.initDirect(this.props.direct + 1);
    }
  },

  render () {
    let {operation, image} = this.props;

    return (
      <div className="preview-menu">
        <span className="image-name">{image.name}</span>
        <div className="operation">
          <a className="image-operation" href="javscript:;" title={operation.rotateLeft} onClick={this.handleClick.bind(this, "left")}>
            <span className="icon-terminus icon-rotate-left"></span>
          </a>
          <a className="image-operation" href="javscript:;" title={operation.rotateRight} onClick={this.handleClick.bind(this, "right")}>
            <span className="icon-terminus icon-rotate-right"></span>
          </a>
          <a className="image-operation" href={image.url} title={operation.downloadName}>
            <span className="icon-terminus icon-download"></span>
          </a>
          <a className="image-operation" href={image.url} target="_blank" title={operation.newName}>
            <span className="icon-terminus icon-share"></span>
          </a>
        </div>
      </div>
    );
  }
});

module.exports = React.createFactory(Menu)
