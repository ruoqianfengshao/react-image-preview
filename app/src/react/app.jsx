const Overlay = require("react/overlay/view"),
      Menu = require("react/menu/view"),
      Sidebar = require("react/sidebar/view"),
      Window = require("react/window/view");

module.exports = function () {

  let operation = {rotateLeft:"左转", rotateRight:"右转", newName: "新开窗口展示", downloadName: "下载"};
  let images = [
    {name: 'image_1.png', url: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3548524552,2380564594&fm=80'},
    {name: 'image_2.png', url: 'https://attachments.tower.im/tower/4f6a97ad16bf4303ae002b24ff41e662?version=medium&filename=RD_11+Favorite+Industry_07-01-02.jpg'},
    {name: 'image_3.png', url: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1849719102,768436127&fm=80'}
  ];

  const ImagePreview = React.createFactory(React.createClass({
    handleKeyDown (e) {
      if (e.keyCode === 27) {
        React.unmountComponentAtNode(document.body);
      }
    },

    componentDidMount() {
      window.addEventListener("keydown", this.handleKeyDown);
    },

    render () {

      return (
        <div className="image-preview" ref="container">
          <Overlay />
          <Sidebar data={this.props} />
        </div>
      )
    }
  }));

  return React.render(ImagePreview({operation, images}), document.body);
}
