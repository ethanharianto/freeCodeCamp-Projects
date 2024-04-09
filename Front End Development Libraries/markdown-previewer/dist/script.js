// clear the console
console.clear();

// heading component
let Heading = React.createClass({ displayName: "Heading",
  render: function () {
    let headingClass = 'heading';
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", { className: headingClass }, this.props.headingName)));


  } });

ReactDOM.render( /*#__PURE__*/
React.createElement(Heading, { headingName: "Markdown Previewer" }),
document.getElementById('heading'));


// tip component
let Tips = React.createClass({ displayName: "Tips",
  propTypes: {
    tipArr: React.PropTypes.array },

  getInitialState: function () {
    return {
      counter: 0 };

  },
  _incrementCounter: function () {
    if (this.state.counter >= this.props.tipArr.length - 1) {
      this.setState({ counter: 0 });
    } else {
      this.setState({ counter: this.state.counter + 1 });
    }
  },
  componentDidMount: function () {
    let myInterval = setInterval(this._incrementCounter, 5000);
    this.setState({ myInterval: myInterval });
  },
  render: function () {
    let classes = 'tip-text';
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h5", { className: classes, dangerouslySetInnerHTML: { __html: "Tip: " + this.props.tipArr[this.state.counter] } })));


  } });


// markdown and output
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false });

let MarkdownOutput = React.createClass({ displayName: "MarkdownOutput",
  render: function () {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h4", null, "Preview"), /*#__PURE__*/
      React.createElement("hr", null), /*#__PURE__*/
      React.createElement("div", { id: "preview", style: { overflowY: 'scroll', maxHeight: '75vh' }, dangerouslySetInnerHTML: { __html: marked(this.props.value) } })));
  } });

let MarkdownContainer = React.createClass({ displayName: "MarkdownContainer",
  getInitialState: function () {
    return {
      value: '# Use a singular # for H1\n## Use two for H2\nWrite code by wrapping it in backticks: `x = 3`\nMake a code block by indenting \n ``` \n if x = 3: \n     y = 2 \n ```\n#### Make text with two stars on either side **bold** or make it *italic* with one\n \n> The best way to predict the future is to create it. \n -Peter Drucker \n ![](https://www.bl.uk/britishlibrary/~/media/bl/global/business-and-management/images/p/e/t/peter-drucker.jpg) \n \n#### Create links [Github](https://github.com/andydlindsay) \n Make a list using "-" \n  - FCC \n' };

  },
  handleChange(event) {
    this.setState({ value: event.target.value });
  },
  render: function () {
    console.log(marked(this.state.value));
    let containerClass = 'rounded-corners container-class col-xs-12 col-md-6';
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: containerClass }, /*#__PURE__*/
      React.createElement("h4", null, "Editor"), /*#__PURE__*/
      React.createElement("hr", null), /*#__PURE__*/
      React.createElement("textarea", { id: "editor", className: "markdown-text", onChange: this.handleChange, value: this.state.value }), /*#__PURE__*/
      React.createElement("hr", null), /*#__PURE__*/
      React.createElement(Tips, { className: "text-center", tipArr: [
        "Use # before text to create an h1.",
        "Use ** ** or __ __ to make text <b>bold</b>.",
        "Use ## before text to create an h2.",
        "Use * * or _ _ to make text <i>italic</i>.",
        "Denote sections of code with ``` ```."] })), /*#__PURE__*/


      React.createElement("div", { className: containerClass }, /*#__PURE__*/
      React.createElement(MarkdownOutput, { value: this.state.value }))));



  } });

ReactDOM.render( /*#__PURE__*/
React.createElement(MarkdownContainer, null),
document.getElementById('markdown-container'));