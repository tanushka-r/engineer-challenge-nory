import Message from "../../components/message/Message";

const Home = () => {
  return (
    <div className="content-wrapper" data-cy="page-home">
      <Message
        type="info"
        message="This is placeholder, future implementation would allow users to select a location and then login with their credentials"
      />
    </div>
  );
}

export default Home;
