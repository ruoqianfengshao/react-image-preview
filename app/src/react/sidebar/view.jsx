const Menu = require("react/menu/view"),
      Window = require("react/window/view");

let {div, ul, li, img} = React.DOM;

const Sidebar = React.createClass({
  getInitialState (){
    return {
      index: 0,
      direct: {},
      image: {}
    }
  },

  handleKeyDown (e) {
    if(e.keyCode === 38 && this.state.index > 0) {
      this.setState({index: this.state.index - 1})
    } else if (e.keyCode === 40 && this.state.index < this.props.data.images.length - 1) {
      this.setState({index: this.state.index + 1})
    }
  },

  setIndex (index) {
    this.setState({index: index})
  },

  setDirect (direct) {
    let temp = {};
    temp[this.state.index] = direct;
    this.setState({direct: Object.assign(this.state.direct, temp)});

  },

  initImage (image) {
    this.setState({image: Object.assign(this.state.image, image)});
  },

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  },

  renderImages () {
    let _this = this;
    return this.props.data.images.map(function(d, i) {
      d.status = (i === _this.state.index ? true : false);
      d.index = i;
      return Item({data: d, onClick: _this.setIndex, initDirect: _this.setDirect, initImage: _this.initImage});
    })
  },

  render () {
    const {direct, image, index} = this.state,
          {images, operation} = this.props.data;

    return (
      <div className="image-preview-activity">
        {Window({image: images[index], direct: direct[index], info: image[index]})}
        {Menu({operation: operation, image: images[this.state.index], direct: direct[index], initDirect: this.setDirect})}
        <div className="image-preview-sidebar">
          <ul className="images-list">
            {this.renderImages()}
          </ul>
        </div>
      </div>
    )
  }
})


const Item = React.createFactory(React.createClass({
  getInitialState () {
    return {
      direct: 0
    };
  },

  handleClick (e) {
    this.props.onClick(this.props.data.index)
  },

  handleLeftAndRight (e) {
    if (this.props.data.status) {
      if (e.keyCode === 37 && this.state.direct !== 0) {
        this.setState({direct: this.state.direct - 1});
        this.props.initDirect(this.state.direct);
      } else if (e.keyCode === 39 && this.state.direct !== 3) {
        this.setState({direct: this.state.direct + 1});
        this.props.initDirect(this.state.direct);
      }
    }
  },

  setImageInfo () {
    let width = this.refs.image.getDOMNode().width,
        height = this.refs.image.getDOMNode().height,
        temp = {};
    temp[this.props.data.index] = {width, height};
    this.props.initImage(temp);
  },

  componentDidMount() {
    window.addEventListener("keydown", this.handleLeftAndRight);
    this.props.initDirect(this.state.direct);
  },

  render (){
    const {name, url, status} = this.props.data;
    let className = this.state.direct + " image-li" + (status ? " select" : "");

    return (
      <li className={className} title={name} onClick={this.handleClick}>
        <img src={url} ref="image" onLoad={this.setImageInfo}/>
      </li>
    );
  }
}));

module.exports = React.createFactory(Sidebar)
