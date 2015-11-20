let {div, img} = React.DOM;

const Window = React.createClass({
  getInitialState() {
      return {
          styles: {}
      };
  },

  calculateSize () {
    if (this.props.direct === 1 || this.props.direct === 3) {
      let containerWidth = this.refs.window.getDOMNode().offsetWidth,
          containerHeight = this.refs.window.getDOMNode().offsetHeight,
          imageWidth = this.props.info.width,
          imageHeight = this.props.info.height,
          normalHeight = containerWidth / imageWidth * imageHeight,
          scaleHeight = containerHeight / imageWidth * imageHeight,
          scaleWidth = containerWidth / imageHeight * imageWidth;

      if (containerWidth > scaleHeight) {
        let marginTop = (containerHeight - scaleHeight) / 2;
        return {width: containerHeight, height: scaleHeight, marginTop}
      } else {
        let marginTop = (containerHeight - scaleHeight) / 2;
        return {height: containerWidth, width: scaleWidth, marginTop}
      }
    } else {
      return {}
    }
  },

  componentDidMount() {
    window.addEventListener("resize", React.forceUpdate);
  },

  render () {
    let className = "window-image direct-" + ["left", "up", "right", "down"][this.props.direct],
        styles = this.props.direct ? this.calculateSize() : {};

    return (
      <div className="image-preview-window" ref="window">
        <img src={this.props.image.url} className={className} alt={this.props.image.name} style={styles} ref="image"/>
      </div>
    );
  }
});

module.exports = React.createFactory(Window)
