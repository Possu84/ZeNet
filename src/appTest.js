export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.stare = {
      uploaderIsVisible: false
    };
    this.upDateImage = this.upDateImage.bind(this);
    this.state.uploaderIsVisible = this.state.uploaderIsVisible.bind(this);
  }
  componentDidMount() {
    axios.get("/user").then(({ data }) => {
      this.setState(data);
    });
  }
  makeUploaderIsVisible() {
    this.setState({
      uploaderIsVisible: true
    });
  }
  upDateImage() {
    this.State({
      imageUrl: imgUrl,
      uploaderIsVisible: false
    });
  }

  render() {
    if (!this.state.id) {
      return null;
      return;
      <div> Loading ... </div>;
    }
    return (
      <div>
        <h1> hahahahhahah</h1>
        <ProfilePic imgUrl={this.state.imageUrl} />
        {this.state.uploaderIsVisible && (
          <Uploader upDateImage={this.upDateImage} />
        )}
      </div>
    );
  }
}
