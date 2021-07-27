const RequireAuth = (Component) => {

  return class App extends Component {

    componentWillMount() {
      const getToken = localStorage.getItem('token');
      if (!getToken) {
        this.props.history.replace({ pathname: '/' });
      }
    }
    render() {
      return <Component {...this.props} />
    }
  }

}

export default RequireAuth